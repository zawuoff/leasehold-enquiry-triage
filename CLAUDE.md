# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Leasehold enquiry triage** — a small prototype (take-home exercise for the
Leasehold Advisory Service). A leaseholder in England & Wales describes a
problem (guided scenarios **or** free text), it's triaged with deterministic
rules, and they get a plain-English next step + a verified LEASE link + contact
routes. Signposting, **not** legal advice.

- **Full plan and scope:** [docs/plan1.md](docs/plan1.md). Read it before building.
- **Stack:** plain Django (JSON endpoints) + React SPA (Vite). No database, no
  auth, no persistence — stateless. Dummy data only; never invent or store real
  personal data.
- **Triage:** deterministic (scenario map + keyword/phrase matching). No LLM.
- **Scope:** leasehold only (park homes out of scope). Three topics: costs &
  charges, repairs & building management, lease extension.

## Documentation

- **`docs/records/running-notes.md`**: chronological working log. Record explorations,
  alternatives, critiques, trade-offs, assumptions, rejected approaches and
  confirmed decisions. Update it after meaningful discussions, including ideas
  that are not selected.
- **`docs/records/content.md`**: source of truth for approved user-facing wording,
  warnings, validation/error messages, action behaviour, official URLs and
  verification dates. Do not add proposed or invented copy. Discuss drafts in
  `running-notes.md` first and move them into `content.md` only after
  confirmation.

## Frontend library

- Use **[MUI](https://mui.com/)** (`@mui/material` + `@mui/system`) for the
  frontend. **Do not use any other UI / component / styling library.**
- This is the standing decision and supersedes any earlier discussion of
  `govuk-frontend` or other GOV.UK component libraries.

## Git & pull requests

- **Do not commit, and do not create PRs, on the user's behalf.** The user runs
  all `git commit` and PR creation themselves.
- When work is ready, provide a **ready-to-paste PR description** (and suggested
  commit messages if useful) instead of running `git commit` or `gh pr create`.
- Staging/branching is fine to prepare, but stop before committing or opening PRs.


## Accessibility

- **Standing target: WCAG 2.2 AA.** Keep it in mind from scaffold onward, not as
  a late add-on.
- In practice: semantic landmarks and a single `<h1>` per screen, labelled form
  controls, visible keyboard focus, full keyboard operability, clear error
  identification (error summary + inline messages), sufficient colour contrast,
  and live-region announcements for dynamic changes.
- Every screen ships with an automated accessibility test (`vitest-axe`) plus
  role/label assertions. MUI's accessible primitives help, but correct usage is
  on us and must be tested.

## Working agreement

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps).
- If something goes sideways, STOP and re-plan immediately.
- Write detailed specs upfront to reduce ambiguity.

### 2. Subagent Strategy
- Use subagents liberally to keep the main context window clean.
- One task per subagent for focused execution.
- For complex problems, throw more compute at it.

### 3. Self-Improvement Loop
- After ANY correction: update `tasks/lessons.md`.
- Write rules that prevent the same mistake.
- Ruthlessly iterate until the mistake rate drops.

### 4. Verification Before Done
- Never mark a task complete without proving it works.
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness.

### 5. Demand Elegance (Balanced)
- Pause and ask "is there a more elegant way?"
- Skip this for simple fixes — don't over-engineer.

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it.
- Zero context switching required from the user.

## Task Management
1. **Plan First:** write the plan to `tasks/todo.md`.
2. **Verify Plan:** check in before starting.
3. **Track Progress:** mark items complete as you go.
4. **Explain Changes:** high-level summary at each step.
5. **Document Results:** add a review section to `tasks/todo.md`.
6. **Capture Lessons:** update `tasks/lessons.md` after corrections.

## Core Principles
- **Simplicity First:** make every change as simple as possible.
- **No Laziness:** find root causes. No temporary fixes.
- **Minimal Impact:** only touch what's necessary.
