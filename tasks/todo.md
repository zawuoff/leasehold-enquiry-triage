# Todo — Guided-scenario triage (tickets 4 + 5)

Branch: `connecting-frontend-to-backend`. No commits by assistant.
Content source: docs/content.md (verbatim).

## Backend (ticket 4)
- [x] `content.py` — mirror content.md (TOPICS, WARNINGS, SCENARIOS)
- [x] `domain.py` — `validate_guided`, `classify_guided` (dedup by topic)
- [x] `views.py` — guided triage + `GET /api/scenarios`; `urls.py`
- [x] backend tests (scenarios, 1/2 ids, dedup, all validation codes, 405) — 18 pass

## Frontend (ticket 5)
- [x] `src/content.ts` — mirror content.md static chrome (2 strings marked DRAFT)
- [x] `src/api/triage.ts` — `getScenarios`, `postGuidedTriage`, typed 400
- [x] `ScenarioPicker`, `TriageResults`, `ServiceError` + App step machine
- [x] a11y (focus mgmt, error summary, aria) + frontend tests — 12 pass (incl. axe)

## Verify
- [x] backend tests + check; frontend tests + build; live e2e click-through
- [ ] User commits + opens PR (assistant provides PR description only)

## Review

- **What shipped:** the first real feature — guided-scenario triage, front to
  back. Backend mirrors `content.md` into pure-Python data + logic
  (`validate_guided`/`classify_guided`), exposed via `POST /api/triage` (guided)
  and `GET /api/scenarios`. Results group/dedupe by topic with a shared warning.
  Frontend renders the picker from the API (two-selection limit), submits, and
  shows topic-grouped guidance cards, with validation + service-error handling,
  focus management and an error summary.
- **Verified:** backend `test triage` → 18 passed (no DB); frontend `npm test` →
  12 passed (incl. axe on picker + results); `npm run build` → clean; live proxy
  e2e — scenarios list, two-same-topic dedup, and 400 on empty selection.
- **Notes / process:** two picker strings are `// DRAFT` (not in content.md yet);
  logged in running-notes for confirmation → promotion. Card link labels reuse
  approved topic-level labels. Free-text (ticket 6), Back/"this doesn't match"
  recovery (ticket 7), callback + feedback remain out of scope.
