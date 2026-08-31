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
    def test_lists_all_scenarios_with_id_and_label(self):
        response = self.client.get('/api/scenarios')
        self.assertEqual(response.status_code, 200)
        items = response.json()['scenarios']
        self.assertEqual(len(items), len(content.SCENARIOS))
        self.assertEqual({i['id'] for i in items}, set(content.SCENARIOS_BY_ID))
        self.assertTrue(all(i['label'] for i in items))


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

    def test_get_is_method_not_allowed(self):
        response = self.client.get('/api/triage')
        self.assertEqual(response.status_code, 405)
