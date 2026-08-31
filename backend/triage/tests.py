from django.test import SimpleTestCase


class HealthEndpointTests(SimpleTestCase):
    """SimpleTestCase: no database is touched (stateless API)."""

    def test_health_returns_ok_json(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/json')
        self.assertEqual(response.json(), {"status": "ok"})
