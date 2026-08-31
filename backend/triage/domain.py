"""Pure-Python triage domain — no Django imports, so it is unit-testable alone.

Validation error codes match docs/content.md (the frontend maps them to the
approved user-facing messages).
"""

from . import content


class TriageError(Exception):
    """A validation failure carrying a stable code and optional field."""

    def __init__(self, code, field=None):
        super().__init__(code)
        self.code = code
        self.field = field


def validate_guided(payload):
    """Validate a guided request and return its 1–2 unique, known scenario ids.

    Raises TriageError(code, field) on any problem.
    """
    if not isinstance(payload, dict):
        raise TriageError("invalid_request")

    if payload.get("mode") != "guided":
        raise TriageError("invalid_mode", "mode")

    # Free text belongs to a different route; it cannot accompany scenarios.
    if payload.get("free_text"):
        raise TriageError("conflicting_fields", "free_text")

    ids = payload.get("scenario_ids")
    if not isinstance(ids, list) or not all(isinstance(i, str) for i in ids):
        raise TriageError("invalid_request", "scenario_ids")

    # Deduplicate defensively while preserving selection order.
    unique = list(dict.fromkeys(ids))
    if not 1 <= len(unique) <= 2:
        raise TriageError("invalid_scenario_count", "scenario_ids")

    if any(i not in content.SCENARIOS_BY_ID for i in unique):
        raise TriageError("invalid_scenario_ids", "scenario_ids")

    return unique


def classify_guided(scenario_ids):
    """Assemble the result, grouping cards by topic (dedup) in selection order.

    Scenarios sharing a topic share one heading and one conditional warning, but
    keep their own explanation, next step and link.
    """
    groups = {}
    order = []

    for sid in scenario_ids:
        scenario = content.SCENARIOS_BY_ID[sid]
        topic = scenario["topic"]

        if topic not in groups:
            topic_meta = content.TOPICS[topic]
            warning = content.WARNINGS.get(scenario["warning"])
            groups[topic] = {
                "topic": topic,
                "label": topic_meta["label"],
                "heading": topic_meta["heading"],
                "warning": dict(warning) if warning else None,
                "cards": [],
            }
            order.append(topic)

        groups[topic]["cards"].append(
            {
                "scenario_id": scenario["id"],
                "scenario": scenario["scenario"],
                "why": scenario["why"],
                "next_step": scenario["next_step"],
                "link": {
                    "label": content.TOPICS[topic]["link_label"],
                    "url": scenario["url"],
                },
                "verified": scenario["verified"],
            }
        )

    return {"outcome": "matched", "topics": [groups[t] for t in order]}
