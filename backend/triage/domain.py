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


MAX_FREE_TEXT_LENGTH = 1000

# Explicit phrase/synonym rules per topic (lowercase, substring match).
# ponytail: naive substring matching — no stemming, spell-check or negation
# handling. Misspellings and negated phrases fall through to the safe fallback
# rather than mis-signposting. Upgrade to a proper matcher if coverage matters.
KEYWORDS = {
    "COSTS_AND_CHARGES": [
        "service charge", "ground rent", "major works", "sinking fund",
        "reserve fund", "administration charge", "estimate", "bill", "invoice",
        "demand", "overcharged", "charges", "fees", "how much",
    ],
    "REPAIRS_AND_BUILDING_MANAGEMENT": [
        "repair", "maintenance", "leak", "roof", "damp", "mould", "broken",
        "communal", "managing agent", "management", "manager", "freeholder",
        "landlord", "not fixed", "disrepair", "cladding", "lift",
    ],
    "LEASE_EXTENSION": [
        "lease extension", "extend my lease", "extend the lease", "extend lease",
        "extending", "short lease", "years left", "years remaining",
        "lease length", "renew my lease", "statutory lease",
    ],
}


def validate_free_text(payload):
    """Validate a free-text request and return the stripped description."""
    if not isinstance(payload, dict):
        raise TriageError("invalid_request")

    if payload.get("scenario_ids"):
        raise TriageError("conflicting_fields", "scenario_ids")

    text = payload.get("free_text")
    if not isinstance(text, str):
        raise TriageError("invalid_request", "free_text")

    if len(text) > MAX_FREE_TEXT_LENGTH:
        raise TriageError("text_too_long", "free_text")

    stripped = text.strip()
    if not stripped:
        raise TriageError("blank_text", "free_text")

    return stripped


def classify_free_text(text):
    """Match up to two topics by keyword, else return the safe fallback."""
    lowered = text.lower()

    scored = []
    for topic in content.TOPIC_ORDER:
        hits = sum(1 for phrase in KEYWORDS[topic] if phrase in lowered)
        if hits:
            scored.append((topic, hits))

    # Stable sort by hits desc keeps TOPIC_ORDER for ties.
    scored.sort(key=lambda item: -item[1])
    top_topics = [topic for topic, _ in scored[:2]]

    if not top_topics:
        return {
            "outcome": "fallback",
            "fallback": {
                "heading": content.FALLBACK["heading"],
                "body": content.FALLBACK["body"],
                "next_step": content.FALLBACK["next_step"],
                "contact_url": content.FALLBACK["contact_url"],
                "verified": content.FALLBACK["verified"],
            },
        }

    topics = []
    for topic in top_topics:
        meta = content.TOPICS[topic]
        card = content.FREE_TEXT_CARDS[topic]
        topics.append(
            {
                "topic": topic,
                "label": meta["label"],
                "heading": meta["heading"],
                "warning": None,
                "cards": [
                    {
                        "why": card["why"],
                        "next_step": card["next_step"],
                        "link": {"label": card["link_label"], "url": card["url"]},
                        "verified": card["verified"],
                    }
                ],
            }
        )

    return {"outcome": "matched", "topics": topics}
