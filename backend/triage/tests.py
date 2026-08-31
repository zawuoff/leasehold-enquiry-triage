import json

from django.test import SimpleTestCase

from . import content, domain


class HealthEndpointTests(SimpleTestCase):
    """SimpleTestCase: no database is touched (stateless API)."""

    def test_health_returns_ok_json(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/json')
        self.assertEqual(response.json(), {"status": "ok"})


class ScenariosEndpointTests(SimpleTestCase):
    def test_lists_scenarios_with_topic_and_topics(self):
        response = self.client.get('/api/scenarios')
        self.assertEqual(response.status_code, 200)
        body = response.json()

        items = body['scenarios']
        self.assertEqual(len(items), len(content.SCENARIOS))
        self.assertEqual({i['id'] for i in items}, set(content.SCENARIOS_BY_ID))
        self.assertTrue(all(i['label'] and i['topic'] for i in items))

        topics = body['topics']
        self.assertEqual([t['key'] for t in topics], content.TOPIC_ORDER)
        self.assertTrue(all(t['label'] for t in topics))


class ValidateGuidedTests(SimpleTestCase):
    def test_rejects_non_dict(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_guided(["nope"])
        self.assertEqual(ctx.exception.code, "invalid_request")

    def test_rejects_wrong_mode(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_guided({"mode": "free_text", "scenario_ids": ["lease-extension"]})
        self.assertEqual(ctx.exception.code, "invalid_mode")

    def test_rejects_free_text_alongside_scenarios(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_guided(
                {"mode": "guided", "scenario_ids": ["lease-extension"], "free_text": "hi"}
            )
        self.assertEqual(ctx.exception.code, "conflicting_fields")

    def test_rejects_zero_scenarios(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_guided({"mode": "guided", "scenario_ids": []})
        self.assertEqual(ctx.exception.code, "invalid_scenario_count")

    def test_rejects_three_scenarios(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_guided(
                {
                    "mode": "guided",
                    "scenario_ids": [
                        "service-charge-major-works",
                        "repairs-responsibility",
                        "lease-extension",
                    ],
                }
            )
        self.assertEqual(ctx.exception.code, "invalid_scenario_count")

    def test_rejects_unknown_id(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_guided({"mode": "guided", "scenario_ids": ["nope"]})
        self.assertEqual(ctx.exception.code, "invalid_scenario_ids")

    def test_deduplicates_repeated_ids(self):
        ids = domain.validate_guided(
            {"mode": "guided", "scenario_ids": ["lease-extension", "lease-extension"]}
        )
        self.assertEqual(ids, ["lease-extension"])


class ClassifyGuidedTests(SimpleTestCase):
    def test_single_scenario_returns_one_topic_one_card(self):
        result = domain.classify_guided(["lease-extension"])
        self.assertEqual(result["outcome"], "matched")
        self.assertEqual(len(result["topics"]), 1)
        topic = result["topics"][0]
        self.assertEqual(topic["topic"], "LEASE_EXTENSION")
        self.assertEqual(topic["heading"], "This may relate to lease extension.")
        self.assertEqual(len(topic["cards"]), 1)
        self.assertEqual(topic["cards"][0]["scenario_id"], "lease-extension")
        self.assertEqual(
            topic["cards"][0]["link"]["url"],
            "https://www.lease-advice.org/lease-extension/",
        )
        self.assertIsNotNone(topic["warning"])

    def test_two_same_topic_scenarios_dedupe_into_one_group(self):
        result = domain.classify_guided(
            ["service-charge-major-works", "ground-rent-demand"]
        )
        self.assertEqual(len(result["topics"]), 1)
        group = result["topics"][0]
        self.assertEqual(group["topic"], "COSTS_AND_CHARGES")
        self.assertEqual(len(group["cards"]), 2)
        # One shared warning for the topic, not one per card.
        self.assertIn("court papers", group["warning"]["text"])

    def test_two_different_topics_return_two_groups_in_order(self):
        result = domain.classify_guided(
            ["lease-extension", "repairs-responsibility"]
        )
        self.assertEqual(
            [t["topic"] for t in result["topics"]],
            ["LEASE_EXTENSION", "REPAIRS_AND_BUILDING_MANAGEMENT"],
        )

    def test_every_scenario_maps_to_its_declared_topic(self):
        for scenario in content.SCENARIOS:
            result = domain.classify_guided([scenario["id"]])
            self.assertEqual(result["topics"][0]["topic"], scenario["topic"])


class TriageEndpointTests(SimpleTestCase):
    def _post(self, payload, raw=None):
        return self.client.post(
            '/api/triage',
            data=raw if raw is not None else json.dumps(payload),
            content_type='application/json',
        )

    def test_valid_guided_request_returns_matched_result(self):
        response = self._post(
            {"mode": "guided", "scenario_ids": ["service-charge-major-works"]}
        )
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["outcome"], "matched")
        self.assertEqual(body["topics"][0]["topic"], "COSTS_AND_CHARGES")

    def test_invalid_count_returns_400_with_code(self):
        response = self._post({"mode": "guided", "scenario_ids": []})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_scenario_count")

    def test_unknown_id_returns_400_with_code(self):
        response = self._post({"mode": "guided", "scenario_ids": ["nope"]})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_scenario_ids")

    def test_malformed_json_returns_400_invalid_request(self):
        response = self._post(None, raw='not json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_request")

    def test_non_utf8_body_returns_400_not_500(self):
        response = self._post(None, raw=b"\xff\xfe\xff")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_request")

    def test_get_is_method_not_allowed(self):
        response = self.client.get('/api/triage')
        self.assertEqual(response.status_code, 405)

    def test_free_text_match_returns_topic_without_scenario_id(self):
        response = self._post(
            {"mode": "free_text", "free_text": "my service charge is too high"}
        )
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["outcome"], "matched")
        self.assertEqual(body["topics"][0]["topic"], "COSTS_AND_CHARGES")
        self.assertNotIn("scenario_id", body["topics"][0]["cards"][0])

    def test_free_text_unmatched_returns_fallback_200(self):
        response = self._post({"mode": "free_text", "free_text": "xyzzy nonsense"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["outcome"], "fallback")

    def test_free_text_blank_returns_400(self):
        response = self._post({"mode": "free_text", "free_text": "   "})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "blank_text")

    def test_unknown_mode_returns_invalid_mode(self):
        response = self._post({"mode": "sideways", "free_text": "hi"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_mode")


class ValidateFreeTextTests(SimpleTestCase):
    def test_rejects_scenario_ids_alongside_text(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_free_text(
                {"mode": "free_text", "free_text": "hi", "scenario_ids": ["lease-extension"]}
            )
        self.assertEqual(ctx.exception.code, "conflicting_fields")

    def test_rejects_blank_and_whitespace(self):
        for value in ("", "   \n\t"):
            with self.assertRaises(domain.TriageError) as ctx:
                domain.validate_free_text({"mode": "free_text", "free_text": value})
            self.assertEqual(ctx.exception.code, "blank_text")

    def test_rejects_non_string(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_free_text({"mode": "free_text", "free_text": 5})
        self.assertEqual(ctx.exception.code, "invalid_request")

    def test_rejects_over_1000_chars(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_free_text(
                {"mode": "free_text", "free_text": "a" * 1001}
            )
        self.assertEqual(ctx.exception.code, "text_too_long")

    def test_accepts_and_strips_at_limit(self):
        text = "service charge " + "x" * (1000 - len("service charge "))
        self.assertEqual(len(text), 1000)
        self.assertEqual(domain.validate_free_text({"free_text": text}), text.strip())


class ClassifyFreeTextTests(SimpleTestCase):
    def test_costs_wording(self):
        result = domain.classify_free_text("I think my service charge is too high")
        self.assertEqual(result["outcome"], "matched")
        self.assertEqual([t["topic"] for t in result["topics"]], ["COSTS_AND_CHARGES"])

    def test_repairs_wording(self):
        result = domain.classify_free_text("the roof has a leak and it is not fixed")
        self.assertEqual(result["topics"][0]["topic"], "REPAIRS_AND_BUILDING_MANAGEMENT")

    def test_lease_extension_wording(self):
        result = domain.classify_free_text("I want to extend my lease")
        self.assertEqual(result["topics"][0]["topic"], "LEASE_EXTENSION")

    def test_overlap_returns_up_to_two_topics(self):
        result = domain.classify_free_text(
            "my service charge is high and the roof needs repair and maintenance"
        )
        topics = [t["topic"] for t in result["topics"]]
        self.assertEqual(len(topics), 2)
        self.assertIn("COSTS_AND_CHARGES", topics)
        self.assertIn("REPAIRS_AND_BUILDING_MANAGEMENT", topics)

    def test_unsupported_text_returns_fallback(self):
        self.assertEqual(
            domain.classify_free_text("the weather is lovely today")["outcome"],
            "fallback",
        )

    def test_misspelling_falls_back(self):
        # Documented limitation: naive matching does not correct spelling.
        self.assertEqual(
            domain.classify_free_text("my servce charg is to high")["outcome"],
            "fallback",
        )

    def test_negation_still_matches_keyword(self):
        # Documented limitation: negation is not detected.
        self.assertEqual(
            domain.classify_free_text("I have no problem with my service charge")[
                "outcome"
            ],
            "matched",
        )


class ValidateCallbackTests(SimpleTestCase):
    def test_accepts_and_normalises(self):
        data = domain.validate_callback(
            {"name": "  Sam  ", "email": " sam@example.com ", "topic": "COSTS"}
        )
        self.assertEqual(data, {"name": "Sam", "email": "sam@example.com", "topic": "COSTS"})

    def test_requires_name(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_callback({"name": "  ", "email": "sam@example.com"})
        self.assertEqual(ctx.exception.code, "name_required")

    def test_rejects_bad_email(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_callback({"name": "Sam", "email": "not-an-email"})
        self.assertEqual(ctx.exception.code, "email_invalid")

    def test_rejects_over_long_topic(self):
        with self.assertRaises(domain.TriageError) as ctx:
            domain.validate_callback(
                {"name": "Sam", "email": "sam@example.com", "topic": "x" * 101}
            )
        self.assertEqual(ctx.exception.code, "invalid_request")


class ValidateFeedbackTests(SimpleTestCase):
    def test_accepts_bool_and_optional_comment(self):
        self.assertEqual(
            domain.validate_feedback({"helpful": True}),
            {"helpful": True, "comment": None},
        )
        self.assertEqual(
            domain.validate_feedback({"helpful": False, "comment": " ok "}),
            {"helpful": False, "comment": "ok"},
        )

    def test_requires_helpful_bool(self):
        for value in ({}, {"helpful": "yes"}):
            with self.assertRaises(domain.TriageError) as ctx:
                domain.validate_feedback(value)
            self.assertEqual(ctx.exception.code, "helpful_required")


class CallbackEndpointTests(SimpleTestCase):
    def _post(self, payload, raw=None):
        return self.client.post(
            '/api/callback',
            data=raw if raw is not None else json.dumps(payload),
            content_type='application/json',
        )

    def test_valid_is_acknowledged(self):
        response = self._post({"name": "Sam", "email": "sam@example.com"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "received"})

    def test_bad_email_returns_400(self):
        response = self._post({"name": "Sam", "email": "nope"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "email_invalid")

    def test_malformed_json_returns_400(self):
        response = self._post(None, raw="not json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_request")

    def test_non_utf8_body_returns_400(self):
        response = self._post(None, raw=b"\xff\xfe\xff")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "invalid_request")

    def test_get_is_405(self):
        self.assertEqual(self.client.get('/api/callback').status_code, 405)


class FeedbackEndpointTests(SimpleTestCase):
    def _post(self, payload):
        return self.client.post(
            '/api/feedback', data=json.dumps(payload), content_type='application/json'
        )

    def test_valid_is_acknowledged(self):
        response = self._post({"helpful": True, "comment": "clear"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "received"})

    def test_missing_helpful_returns_400(self):
        response = self._post({"comment": "clear"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "helpful_required")

    def test_get_is_405(self):
        self.assertEqual(self.client.get('/api/feedback').status_code, 405)
