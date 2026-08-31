# AI usage note

Process note — kept a `running-notes` decision log + a `content.md` accept/reject
record, used plan mode and subagent challenges, and deliberately kept AI inside
each ticket rather than one-shotting the app (which the brief warns against). And
where the AI's tests said "fine" but the thing wasn't (contrast), I trusted
measurement over the tooling.

## What AI helped with

- **Planning / exploration:** generating and comparing options with trade-offs —
  topic/scenario sets, tenure scope, architecture (React + Django vs the
  alternatives; Django vs FastAPI), the `/api/triage` contract, free-text
  classification approaches, and navigation — including AI-run adversarial
  subagent challenges to pressure-test the React/Django boundary.
- **Build:** scaffolding (Vite + React + MUI, Django), the deterministic triage
  domain, the wizard UI, the test suites, and translating the Paper
  "Variant A" design into MUI.
- **Harden:** accessibility (axe) coverage, backend robustness, dead-code
  cleanup, and honest-wording fixes.

## What I rejected or changed

- Rejected an LLM / weighted classifier for V1 in favour of deterministic keyword
  rules (predictable, testable, safe); logged LLM + vector search as future work.
- Rejected govuk-frontend / other UI libraries in favour of MUI only; rejected
  covering park homes / both tenures in favour of leaseholders only; rejected
  using a placeholder to carry the free-text examples in favour of visible hint
  text below the field.
- Changed the flow twice — flat picker → the "Variant A" stepper → a topic-first
  narrowing funnel; and free text from its own step to a tab that goes straight
  to the result. I changed the adviser callback into an honest client-side stub.
- Corrected overclaims the AI (and my own plan) had made, rather than trusting
  them: negation "falls back safely" (false — negation isn't detected), the
  "one real React→Django journey test" (the integration tests mock `fetch`), and
  "unknown fields are rejected" (the backend ignores them). I also relabelled a
  misleading "Start again" button to "Finish".
- Accessibility contrast fix. The AI's `vitest-axe` checks were green on every
  screen, but I did not treat that as "accessible". I hand-measured the palette
  and found a real WCAG 2.2 AA contrast failure (`#7FA1B0` muted grey — 2.75:1 on
  white, 4.18:1 on navy) that axe cannot detect under jsdom. I changed the code:
  split the token (`#54737F` for light backgrounds, `#93B2C0` for the navy
  strapline), audited every colour pair, and added a contrast unit test so it
  cannot silently regress.

## What I verified myself

- Ran the test suites (49 backend, 42 frontend including axe on every screen and
  the new contrast test), the production build, and `manage.py check`.
- Live browser checks against the accessibility tree / DOM: stepper progress, the
  narrowing funnel, free-text going straight to the result, focus management, and
  the "cleaner" free-text layout against the Paper frame.
- End-to-end through the Vite dev proxy with `curl` (200 / 400 / 405, topic
  deduplication, and the safe fallback).
- Privacy by hand: no `console.log`, no `localStorage`, no personal data in URLs
  or server logs, and no models (nothing is stored).
- Contrast measured by hand where the automated tooling (axe under jsdom) could
  not — the clearest case of verifying beyond the AI's own green checks, which
  then drove a code change.
- Confirmed the LEASE URLs and approved copy came from `content.md` (with
  verification dates), not invented, and kept unconfirmed copy marked as DRAFT.

## In short

AI accelerated the exploration, scaffolding and tests, but I kept it scoped to
one task at a time and treated its output as a draft to check, not an answer to
trust. The clearest example is the contrast bug: the AI's tests said the screens
were fine, measurement said otherwise, and I trusted the measurement and changed
the code.
