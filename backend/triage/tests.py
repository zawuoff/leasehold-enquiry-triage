import json

from django.test import SimpleTestCase


class HealthEndpointTests(SimpleTestCase):
    """SimpleTestCase: no database is touched (stateless API)."""

    def test_health_returns_ok_json(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/json')
        self.assertEqual(response.json(), {"status": "ok"})


class TriageEndpointTests(SimpleTestCase):
    def test_post_returns_stub_json(self):
        response = self.client.post(
            '/api/triage',
            data=json.dumps({"description": "my service charge went up"}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/json')
        body = response.json()
        self.assertEqual(body['status'], 'ok')
        self.assertIn('message', body)

    def test_get_is_method_not_allowed(self):
        response = self.client.get('/api/triage')
        self.assertEqual(response.status_code, 405)

    def test_invalid_json_returns_400(self):
        response = self.client.post(
            '/api/triage',
            data='not json',
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "invalid_json"})
