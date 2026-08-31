import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


def health(request):
    """Liveness check — proves the API serves JSON. No DB or auth involved."""
    return JsonResponse({"status": "ok"})


@csrf_exempt
@require_POST
def triage(request):
    """Stub triage endpoint that proves the front/back boundary.

    Real classification arrives in a later ticket. For now it validates that a
    JSON body was sent and returns a stub result. POST only (require_POST → 405
    otherwise); csrf_exempt because this API is stateless with no sessions or
    cookies.
    """
    try:
        json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "invalid_json"}, status=400)

    return JsonResponse(
        {
            "status": "ok",
            "result": None,
            "message": "Triage endpoint stub — classification not implemented yet.",
        }
    )
