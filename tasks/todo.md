# Todo — Free-text triage (ticket 6)

Branch: `setup-freetext-triage`. No commits by assistant.
Content source: docs/content.md (verbatim).

## Backend
- [x] `content.py` — FREE_TEXT_CARDS + FALLBACK + TOPIC_ORDER (from content.md)
- [x] `domain.py` — KEYWORDS, `validate_free_text`, `classify_free_text` (≤2 topics / fallback)
- [x] `views.py` — dispatch guided vs free_text by mode
- [x] backend tests — validation, classifier (incl. misspelling/negation edge cases), endpoints → 34 pass

## Frontend
- [x] `content.ts` — free-text screen copy, fallback actions, `blank_text`/`text_too_long`
- [x] `api/triage.ts` — `postFreeTextTriage`, fallback + optional-card types
- [x] `FreeTextEntry`, `Fallback`; picker "I’m not sure" route; TriageResults handles free-text cards
- [x] App step machine picker→freetext→results/fallback + recovery actions
- [x] frontend tests (guided + free-text + fallback + a11y) → 21 pass

## Verify
- [x] backend tests + check; frontend tests + build; live e2e (match / overlap / fallback / blank)
- [ ] User commits + opens PR (assistant provides PR description only)

## Review

- **What shipped:** free-text triage. A deterministic keyword classifier
  (`domain.KEYWORDS`) maps a description to up to two topics, or the approved
  safe fallback. Reached via the picker's "I'm not sure / something else" route
  (mutually exclusive with scenarios). Free-text results reuse the topic-card UI
  (no scenario_id); the fallback offers Edit description / Choose from common
  scenarios / Contact LEASE. Privacy notice + 1,000-char cap on entry.
- **Verified:** backend 34 tests (no DB); frontend 21 tests (incl. axe on
  picker/results/free-text); build clean; live e2e — match, two-topic overlap,
  fallback, blank→400.
- **Deliberate limitations (documented + `ponytail:` comment):** naive substring
  matching — misspellings and negated phrases fall to the safe fallback rather
  than mis-signposting. All free-text copy is verbatim from content.md (no new
  draft strings; the two picker DRAFT strings from ticket 5 remain).
- **Out of scope:** Back/retry/"this doesn't match" polish (ticket 7), adviser
  callback + feedback, park homes.
