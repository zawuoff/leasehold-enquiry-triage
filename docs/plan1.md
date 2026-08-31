# Leasehold enquiry triage — V1 planning pack

**Author:** Fouwaz Parkar · **Date:** 2026-08-31

## 1. Problem, users, and what "useful" means

The Leasehold Advisory Service (LEASE) helps leaseholders in England and Wales,
who often arrive stressed, unsure of the legal name for their problem, and
unsure what to do next. They need a clear next step, not a wall of legal text.

V1 lets a leaseholder describe a problem — by picking a common scenario **or**
typing in their own words — and returns a broad topic with a plain-English next
step and a way to reach LEASE. It signposts to verified LEASE guidance; it does
**not** give personalised legal advice.

A useful first version lets a user:

- describe their situation without knowing any legal terminology;
- reach a broad topic and a cautious, plain-English next step;
- always get a way forward (guidance link + direct contact routes), even when
  we can't categorise them;
- optionally ask an adviser to contact them, and tell us whether the result
  helped — without being asked for unnecessary personal data.

Categorisation is the mechanism, not the goal. The goal is reaching trustworthy
information or a safe next action.

## 2. Confirmed V1 scope

- **Leasehold only.** Three topics: **costs & charges**, **repairs & building
  management**, **lease extension**, with ~5 plain-language scenarios across them.
- **Two input modes:** guided scenario selection, and a separate free-text route.
- **Deterministic triage.** Guided selections map directly to topics; free text
  is matched with explicit keyword/phrase rules. No weighting model, no LLM.
- **Up to two topics** may be returned, each explained separately — never merged
  into a single combined conclusion.
- **No-match / weak match → safe fallback:** an honest "we couldn't confidently
  match this" plus the direct LEASE contact routes. We never guess on a legal
  matter.
- **Result content:** plain-English explanation, cautious next step, a link to
  the relevant verified LEASE guidance page, and contact routes (phone / email /
  service link).
- **Optional adviser callback:** name + email + topic. Validated and
  acknowledged, then **discarded — not persisted**.
- **Feedback:** "Was this helpful?" Yes/No + optional comment. Not persisted.
- **Stack:** plain Django (JSON endpoints) + React SPA (Vite). No database, no
  auth, no persistence, no external processing.
- **Data:** dummy data only. No real personal data invented or stored.

### Explicitly out of scope (and why)

- **Park homes.** Different legal framework; keeping to leaseholders keeps the
  content small and well-understood. Noted as a natural future extension.
- Persistence / accounts, a full advice engine, weighted or AI classification,
  Wagtail, DRF, production deployment, and pixel-perfect / full GOV.UK Design
  System implementation.
- **Semantic search upgrade (future).** Replace pure keyword/synonym matching with
  a **vector DB + LLM hybrid** — embed the enquiry, retrieve the nearest knowledge
  articles, optionally an LLM re-rank. It would improve paraphrase and misspelling
  handling, but adds cost, latency, and a new accuracy-vs-safety review burden —
  hence out of scope for the V1 slice.

## 3. Assumptions and honest unknowns

**Product & advice**
- A leaseholder can recognise a broadly relevant scenario or describe their
  issue well enough for keyword matching to place it in one of three topics.
- Three topics with ~5 scenarios give useful depth despite incomplete coverage.
- Verified LEASE guidance can support cautious signposting without us deciding
  rights, liability, eligibility, urgency, or strategy.

**Technical, accessibility, privacy**
- Explicit phrase/synonym rules are sufficient for three topics, provided weak,
  conflicting and unsupported input falls back safely. **Negation is not
  detected** — a negated sentence containing a keyword still matches its topic
  (a known limitation, not a safe fallback).
- Plain language, focus management, and accessible announcements make the
  journey usable — but real assistive-technology and usability testing is still
  needed; unverified until done.
- "We don't persist" is true at the application layer; a no-storage claim at the
  infrastructure layer (server/proxy/diagnostic logs) is unproven until checked.

**Unknowns to resolve during build**
- Exact scenario wording, approved copy, warnings, and the real LEASE URLs must
  be drafted and **verified against the live site** — not invented here.
- Free-text matching quality on real paraphrases and misspellings is empirical
  until representative tests pass.

## 4. User flow (V1)

1. **Start** — choose "pick a common problem" or "describe it in your own words".
2. **Guided** — select one or two scenarios (two-selection limit) → submit.
   **Free text** — type a description (non-blank, max 1,000 chars) → submit.
3. **Result** — one or two topics, each with a plain-English explanation, next
   step, verified LEASE link, and contact routes. Or, on no/weak match, the safe
   fallback with contact routes.
4. **Optional actions** — "Ask an adviser to contact me" (name + email + topic),
   and "Was this helpful?" (Yes/No + optional comment).

### Use-case scenarios

- **Best case** — the user clearly expresses their issue (a chosen scenario, or
  free text with unambiguous wording) and is matched to a **single topic** on
  first input, with its explanation, next step, and verified LEASE link.
- **Ambiguous case** — the input maps to **more than one topic**, or is partially
  unclear. We return **up to two topics, each explained separately** (our existing
  behaviour), or fall back if nothing is confident. This is **deterministic
  disambiguation via multiple results — not** a conversational clarifying-question
  flow, which is deliberately left as future work.
- **Fallback case** — **no confident match.** We surface the honest "we couldn't
  confidently match this" plus the direct LEASE contact routes. We **never guess
  on a legal matter.**

## 5. Architecture

- **Frontend:** React (Vite) SPA, using **MUI** (`@mui/material` + `@mui/system`)
  as the only UI/styling library — no other component or CSS framework. Journey
  held in local step state + conditional rendering — no router. Enquiry data
  stays in memory and out of the URL. Back preserves answers; refresh restarts.
  Accessibility (labels, focus management, error summary, live-region
  announcements) is built on MUI's accessible primitives.
- **Backend:** plain Django, thin JSON views. Pure-Python domain owns validation,
  classification, deduplication, and approved-result assembly — kept separate
  from the view layer so it's unit-testable without HTTP.
- **Endpoints (all stateless):**
  - `POST /api/triage` — scenario IDs or free text → topic result(s) or fallback.
  - `POST /api/callback` — validate name/email/topic, acknowledge, discard.
  - `POST /api/feedback` — validate Yes/No + optional comment, acknowledge, discard.
- **Validation rules:** guided requests carry 1–2 known scenario IDs; free text
  is non-blank ≤ 1,000 chars and cannot accompany scenario IDs; unknown modes and
  fields are rejected. Valid outcomes (match or fallback) = 200; invalid input =
  400 with a stable code; unexpected failure = 500. Responses never echo enquiry
  text or expose rules/scores/conclusions.
- **Dev:** Vite dev-proxy to Django. Documented single-command-ish local setup.

### API examples

Concise request/response shapes; all requests are `Content-Type: application/json`.

**`POST /api/triage`** — guided or free-text.

```json
// request (guided)
{ "mode": "guided", "scenario_ids": ["service-charge-major-works"] }
// request (free text)
{ "mode": "free_text", "free_text": "my service charge went up sharply" }
```

```json
// 200 — matched (free-text cards omit scenario_id/scenario; warning may be null)
{
  "outcome": "matched",
  "topics": [{
    "topic": "COSTS_AND_CHARGES",
    "label": "Costs and charges",
    "heading": "This may relate to costs and charges.",
    "warning": { "text": "…", "source": "https://…", "verified": "30 August 2026" },
    "cards": [{
      "scenario_id": "service-charge-major-works",
      "scenario": "…", "why": "…", "next_step": "…",
      "link": { "label": "Read costs and charges guidance", "url": "https://…" },
      "verified": "30 August 2026"
    }]
  }]
}
```

```json
// 200 — no/weak match → fallback
{ "outcome": "fallback", "fallback": {
  "heading": "We could not match your question",
  "body": "…", "next_step": "…",
  "contact_url": "https://…", "verified": "30 August 2026"
} }
// 400 — invalid input (stable code + field)
{ "error": { "code": "invalid_scenario_count", "field": "scenario_ids" } }
```

**`POST /api/callback`** — validated + acknowledged, never stored.

```json
// request
{ "name": "Sam Lee", "email": "sam@example.com", "topic": "Costs and charges" }
// 200
{ "status": "received" }
// 400
{ "error": { "code": "email_invalid", "field": "email" } }
```

**`POST /api/feedback`** — validated + acknowledged, never stored.

```json
// request  (comment optional)
{ "helpful": true, "comment": "Clear and quick." }
// 200
{ "status": "received" }
// 400
{ "error": { "code": "helpful_required", "field": "helpful" } }
```

### Proposed data models

V1 is **deliberately stateless with no database** — nothing below is stored. These
are the entity *shapes* we'd propose **if** a later version persisted anything; the
exercise invites proposing data models, so this documents the thinking without
adding storage to V1.

**Query / intent** — what the user submits. **Transient in V1: processed
in-memory and never stored.**

| Field | Type | Notes |
| --- | --- | --- |
| `input_mode` | enum `guided` \| `free_text` | which route was used |
| `scenario_ids` | list[string] | guided only; 1–2 known scenario IDs |
| `free_text` | string | free-text only; ≤ 1,000 chars |
| `matched_topics` | list[topic key] | 0–2 resulting topics |
| `outcome` | enum `matched` \| `fallback` | whether it fell back |
| `created_at` | timestamp | when submitted |

**Knowledge article** — the stored answer content. This model **effectively
already exists** as our hardcoded topic → copy → LEASE-link data (`content.ts` and
the backend approved-result data in `content.py`); persisting it would just move
it into a table or CMS (e.g. Wagtail).

| Field | Type | Notes |
| --- | --- | --- |
| `topic_key` | string (enum) | e.g. `COSTS_AND_CHARGES` |
| `explanation` | text | plain-English "why this may be relevant" |
| `next_step` | text | cautious, non-advisory next step |
| `lease_url` | string (URL) | verified LEASE guidance link |
| `verified_on` | date | source-verification date |
| `contact_routes` | list / object | link (+ phone / email if added) |

**User info** — only the adviser-callback fields. **V1 validates then discards
these;** if ever persisted, this needs a lawful basis and a retention/access/
deletion policy.

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | for a human reply |
| `email` | string | reply address |
| `topic` | string | topic the callback relates to |
| `created_at` | timestamp | when requested |

## 6. Task breakdown (ordered — plan → build)

Each ticket is a thin, shippable step. Commit per ticket so history shows
incremental progress.

1. **Scaffold React frontend** — Vite app boots, renders a start page, first test
   passes. *Done:* `npm run dev` serves a page; initial test green.
2. **Scaffold Django backend** — project + app structure, no DB features, system
   checks pass. *Done:* Django starts; initial test green without migrations.
3. **Wire the boundary** — `POST /api/triage` stub + relative React API client +
   dev proxy. *Done:* React sends a request and handles a real Django JSON reply,
   with success + failure tests.
4. **Guided triage (domain)** — scenario IDs, topic mappings, approved result
   data, request validation, up-to-two dedup. *Done:* 1–2 valid IDs return the
   expected cards; invalid requests rejected. Tests cover each scenario, same/
   different topics, duplicates, unknown IDs, >2 selections.
5. **Guided journey (UI)** — scenario screen, two-selection limit, submit/loading,
   matched + validation + service-error states. *Done:* a user completes the
   guided journey and recovers from an invalid/failed request.
6. **Free-text triage** — exclusive free-text screen, privacy note, length
   validation, phrase/synonym classifier, 1–2 topic results, safe fallback.
   *Done:* supported wording returns relevant topics; unclear/conflicting/
   unsupported returns the fallback. Tests cover overlaps, misspellings, negation,
   conflicts, blank, and the 1,000-char limit.
7. **Result, contact & feedback** — approved cards + LEASE links + contact routes;
   adviser-callback form (validate/acknowledge/discard); Yes/No + optional-comment
   feedback (validate/acknowledge/discard); Back, retry, preserved input, focus
   management, accessible announcements. *Done:* every matched/fallback/failure
   path is keyboard-usable with a clear action; callback + feedback validate and
   acknowledge without persisting.
8. **Verify integrated slice** — domain, endpoint, component, and one real
   React→Django journey test; record link, browser-storage, and
   accidental-logging checks. *Done:* supported/invalid/fallback/service-error
   paths pass; the whole slice runs from documented commands.
9. **README & docs** — setup, architecture, supported behaviour, testing,
   privacy boundary, and deliberate omissions. *Done:* a fresh checkout runs from
   the README and the described behaviour matches reality.

## 7. Risks & what a reviewer should scrutinise

| Risk | Scrutinise |
| --- | --- |
| Testing gaps | Real paraphrases, overlaps, misspellings, fallback and retry paths, malformed responses — not just happy paths. |
| Accessibility | Native controls, keyboard order, error summaries, focus moves, live-region announcements, preserved answers, 1–2 card results with assistive tech. |
| Personal data | Callback name/email and feedback comment: confirm they are never persisted or logged (Django/proxy logs, error output, tests, browser storage, URLs). |
| Security | Method / content-type / JSON-shape / field / body-size limits; output escaping; safe error messages; dependency and DEBUG hygiene. |
| Content / legal safety | No accidental statements about liability, urgency, eligibility, or strategy; approved copy, warnings, and LEASE links current and verified. |
| Maintainability | Duplicate validation/content, hidden coupling, needless dependencies; the no-DB stateless setup stays reproducible. |

## 8. Part 3 (harden & review) — planned focus

A small number of meaningful improvements plus honest notes: strengthen a
free-text edge case or failure-path test; an accessibility pass; confirm the
no-persistence claim end to end (including logs); tighten any confusing copy.
Notes will cover personal data & security (what we collect, why, what we chose
not to, retention/access/deletion thinking, main risks), accessibility (checks
run, improvements, next steps), and a candid self code-review.

## 9. Supporting records

- `docs/records/content.md` — approved copy, warnings, LEASE URLs, and verification dates
  (to be drafted/verified during build).
- `docs/records/running-notes.md` — chronological exploration, decisions, and alternatives.
