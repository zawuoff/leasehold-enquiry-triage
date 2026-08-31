# Todo — Stepper redesign (Paper "Variant A") + narrowing funnel

Branch: `harden-verify-document`. No commits by assistant.
Design source: Paper frame K-0 (navy/cyan, DM Sans, horizontal stepper).

## Backend
- [x] `views.scenarios` — per-scenario `topic` + `topics` list; updated test

## Frontend — theme + shell
- [x] `index.html` DM Sans; `theme.ts`; `main.tsx` ThemeProvider
- [x] `AppBar`, `JourneyStepper`, `StepCard`, `icons`, `OptionRow`

## Frontend — wizard (narrowing funnel + free-text tab)
- [x] `DescribeStep` (tab toggle: Pick a topic / Describe in your own words)
- [x] `SituationStep` (guided: narrowed to the topic's scenarios, up-to-2)
- [x] Free-text tab submits straight to result (stepper drops "Details")
- [x] `ResultStep`, `NextStepsStep`, `FeedbackStep` (interactive/instant ack)
- [x] `App` phase machine + dynamic stepper (guided 5-node / free 4-node)

## Tests + verify
- [x] rewrote frontend tests for the funnel + axe → 21 pass
- [x] backend 45 + check; frontend build clean; live browser walk-through

## Review

- **What shipped:** the guided journey is a 5-step **narrowing funnel** styled to
  Paper "Variant A" — navy app bar, horizontal stepper (Topic → Details → Result →
  Next steps → Feedback), a white card per step, DM Sans + the exact palette.
  Topic step picks a broad area (or "Something else" → free text); Details narrows
  to that topic's scenarios (up to 2); then result, optional contact, and an
  interactive/less-pushy feedback step.
- **Verified:** backend 45 tests + check; frontend 21 tests (incl. axe on topic +
  result); build clean; walked the funnel in the browser (Topic → narrowed
  Situation → Result → Next steps → Feedback → instant ack).
- **Notes:** all new UI chrome is `// DRAFT` (logged in running-notes); triage/
  result copy stays verbatim from content.md; classifier unchanged. Automation
  clicks were flaky under the scaled preview, but the flow is proven by tests +
  JS-driven walkthrough.
- **Follow-ups:** promote DRAFT copy into content.md once confirmed; Part 3
  reflective notes still outstanding.
