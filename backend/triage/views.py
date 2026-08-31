from django.http import JsonResponse


def health(request):
    """Liveness check — proves the API serves JSON. No DB or auth involved.

    The real triage endpoint (POST /api/triage) arrives in the next chunk; it
    will be @csrf_exempt, since this API is stateless with no sessions/cookies.
    """
    return JsonResponse({"status": "ok"})
