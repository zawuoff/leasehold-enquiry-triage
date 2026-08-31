import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from . import content, domain


def health(request):
    """Liveness check — proves the API serves JSON. No DB or auth involved."""
    return JsonResponse({"status": "ok"})


@require_GET
def scenarios(request):
    """List the guided scenarios so the frontend renders the picker from the
    backend (single source of copy)."""
    return JsonResponse(
        {"scenarios": [{"id": s["id"], "label": s["scenario"]} for s in content.SCENARIOS]}
    )


@csrf_exempt
@require_POST
def triage(request):
    """Guided triage: 1–2 scenario ids -> topic-grouped guidance cards.

    POST only (require_POST -> 405 otherwise); csrf_exempt because the API is
    stateless with no sessions or cookies. Free-text mode is a later ticket.
    """
    try:
        payload = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": {"code": "invalid_request", "field": None}}, status=400
        )

    try:
        scenario_ids = domain.validate_guided(payload)
    except domain.TriageError as error:
        return JsonResponse(
            {"error": {"code": error.code, "field": error.field}}, status=400
        )

    return JsonResponse(domain.classify_guided(scenario_ids))
