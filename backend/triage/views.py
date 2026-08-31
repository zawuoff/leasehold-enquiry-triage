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
    """List topics and guided scenarios so the frontend renders the picker (with
    topic tags) from the backend — a single source of copy."""
    return JsonResponse(
        {
            "topics": [
                {"key": key, "label": content.TOPICS[key]["label"]}
                for key in content.TOPIC_ORDER
            ],
            "scenarios": [
                {"id": s["id"], "label": s["scenario"], "topic": s["topic"]}
                for s in content.SCENARIOS
            ],
        }
    )


@csrf_exempt
@require_POST
def triage(request):
    """Triage a guided or free-text enquiry -> topic cards or the safe fallback.

    POST only (require_POST -> 405 otherwise); csrf_exempt because the API is
    stateless with no sessions or cookies.
    """
    try:
        payload = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": {"code": "invalid_request", "field": None}}, status=400
        )

    mode = payload.get("mode") if isinstance(payload, dict) else None
    try:
        if mode == "guided":
            result = domain.classify_guided(domain.validate_guided(payload))
        elif mode == "free_text":
            result = domain.classify_free_text(domain.validate_free_text(payload))
        else:
            raise domain.TriageError("invalid_mode", "mode")
    except domain.TriageError as error:
        return JsonResponse(
            {"error": {"code": error.code, "field": error.field}}, status=400
        )

    return JsonResponse(result)


def _acknowledge(request, validator):
    """Shared POST-JSON-validate-acknowledge flow for callback/feedback.

    The validated data is deliberately discarded — nothing is persisted.
    """
    try:
        payload = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": {"code": "invalid_request", "field": None}}, status=400
        )

    try:
        validator(payload)
    except domain.TriageError as error:
        return JsonResponse(
            {"error": {"code": error.code, "field": error.field}}, status=400
        )

    return JsonResponse({"status": "received"})


@csrf_exempt
@require_POST
def callback(request):
    """Accept an adviser-callback request and acknowledge it. Never stored."""
    return _acknowledge(request, domain.validate_callback)


@csrf_exempt
@require_POST
def feedback(request):
    """Accept 'was this helpful?' feedback and acknowledge it. Never stored."""
    return _acknowledge(request, domain.validate_feedback)
