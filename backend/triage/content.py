"""Machine-readable mirror of docs/content.md — keep the two in sync.

content.md is the human source of truth for approved copy, LEASE URLs and
verification dates. This module transcribes it verbatim for the domain logic;
do not invent or edit copy here without updating content.md first.
"""

# Internal topic -> user-facing label, suggested-topic heading, and the approved
# topic-level link label reused on guided result cards.
TOPICS = {
    "COSTS_AND_CHARGES": {
        "label": "Costs and charges",
        "heading": "This may relate to costs and charges.",
        "link_label": "Read costs and charges guidance",
    },
    "REPAIRS_AND_BUILDING_MANAGEMENT": {
        "label": "Repairs and building management",
        "heading": "This may relate to repairs and building management.",
        "link_label": "Read building management guidance",
    },
    "LEASE_EXTENSION": {
        "label": "Lease extension",
        "heading": "This may relate to lease extension.",
        "link_label": "Read lease extension guidance",
    },
}

# Shared conditional warnings (general statements — never inferred to apply).
WARNINGS = {
    "charges-urgent-warning": {
        "text": (
            "If you have received court papers or a formal forfeiture notice "
            "relating to unpaid charges, get urgent legal advice rather than "
            "relying on this result."
        ),
        "source": "https://www.lease-advice.org/disputes/breaching-your-lease-and-forfeiture/",
        "verified": "30 August 2026",
    },
    "unresolved-landlord-or-agent-route": {
        "text": (
            "If you have already raised the issue with your landlord or managing "
            "agent and it remains unresolved, read LEASE’s guide for general "
            "information about routes for resolving the issue."
        ),
        "source": "https://www.lease-advice.org/disputes/resolving-leasehold-disputes/landlord-managing-agent-disputes/",
        "verified": "30 August 2026",
    },
    "lease-extension-deadline-warning": {
        "text": (
            "If you have already served or received a formal lease-extension "
            "notice, or a document states a deadline, request advice from LEASE or "
            "a relevant professional rather than relying on this result."
        ),
        "source": "https://www.lease-advice.org/about-us/get-in-touch/",
        "verified": "30 August 2026",
    },
}

# The five V1 guided scenarios. `warning` keys into WARNINGS.
SCENARIOS = [
    {
        "id": "service-charge-major-works",
        "scenario": "I have received a service charge or major works bill that I do not understand or think is fair.",
        "topic": "COSTS_AND_CHARGES",
        "why": (
            "This may relate to costs and charges because service charges and "
            "major-works bills concern amounts requested for managing, "
            "maintaining, or repairing a building. The relevant guidance depends "
            "on the demand, the work, and the lease; this result does not decide "
            "whether a charge is payable or reasonable."
        ),
        "next_step": (
            "Read LEASE’s service-charges section to understand what service "
            "charges may cover, how demands are presented, and where to find "
            "guidance about high charges or major works."
        ),
        "url": "https://www.lease-advice.org/costs-and-charges/service-charges/",
        "verified": "30 August 2026",
        "warning": "charges-urgent-warning",
    },
    {
        "id": "ground-rent-demand",
        "scenario": "I have received a ground rent demand and want to understand what to check.",
        "topic": "COSTS_AND_CHARGES",
        "why": (
            "This may relate to costs and charges because LEASE provides separate "
            "guidance for ground-rent demand notices. This result can help you "
            "find what to check, but it does not decide whether an amount is owed."
        ),
        "next_step": (
            "Read LEASE’s ground-rent demand-notices guide to understand the "
            "information a demand should contain, when payment can be requested, "
            "and the time limit covered by the guide."
        ),
        "url": "https://www.lease-advice.org/costs-and-charges/ground-rent/demand-notices/",
        "verified": "30 August 2026",
        "warning": "charges-urgent-warning",
    },
    {
        "id": "repairs-responsibility",
        "scenario": "My building needs repairs, and I am unsure who is responsible for arranging them.",
        "topic": "REPAIRS_AND_BUILDING_MANAGEMENT",
        "why": (
            "This may relate to repairs and building management because "
            "responsibility can depend on which part of the property is affected "
            "and what the lease says. This result does not decide who is "
            "responsible in your circumstances."
        ),
        "next_step": (
            "Read LEASE’s repairs and maintenance guide to understand the "
            "usual areas of responsibility and the steps for requesting a repair."
        ),
        "url": "https://www.lease-advice.org/building-management/repairs/repairs-and-maintenance-in-leasehold-properties/",
        "verified": "30 August 2026",
        "warning": "unresolved-landlord-or-agent-route",
    },
    {
        "id": "building-management-problem",
        "scenario": "I am unhappy with how my building is being managed and want to know what I can do next.",
        "topic": "REPAIRS_AND_BUILDING_MANAGEMENT",
        "why": (
            "This may relate to repairs and building management because LEASE’s "
            "management guidance covers problems involving landlords, freeholders, "
            "or property managers. This result does not determine which complaint "
            "or legal route applies."
        ),
        "next_step": (
            "Read LEASE’s leasehold-management-problems guide, starting with "
            "its steps for raising the issue and checking the relevant complaints "
            "process."
        ),
        "url": "https://www.lease-advice.org/building-management/management/leasehold-management-problems/",
        "verified": "30 August 2026",
        "warning": "unresolved-landlord-or-agent-route",
    },
    {
        "id": "lease-extension",
        "scenario": "I want to extend my lease and understand how the process works.",
        "topic": "LEASE_EXTENSION",
        "why": (
            "This may relate to lease extension. LEASE provides different guidance "
            "for flats and leasehold houses, and this result does not determine "
            "eligibility, cost, or which route is suitable."
        ),
        "next_step": (
            "Open LEASE’s lease-extension section, choose the guidance for a "
            "flat or leasehold house, and read the relevant getting-started "
            "information before taking action."
        ),
        "url": "https://www.lease-advice.org/lease-extension/",
        "verified": "30 August 2026",
        "warning": "lease-extension-deadline-warning",
    },
]

SCENARIOS_BY_ID = {s["id"]: s for s in SCENARIOS}
