# Todo — Chunk A: Frontend scaffold

Branch: `feature/scaffold-frontend` · Plan: approved (scaffold, chunked).

- [x] Step 0: add WCAG 2.2 AA Accessibility section to CLAUDE.md
- [x] Scaffold Vite + React + TS into `frontend/`
- [x] Add MUI (`@mui/material` + emotion) and an accessible basic page
- [x] Add Vitest + RTL + `vitest-axe`; render test + axe test
- [x] Verify: `npm test` (2 passing), `npm run build` (clean), a11y tree checked
- [ ] Open PR to `main`

## Review

- **What shipped:** Vite 8 / React 19 / TS frontend with MUI (emotion) as the
  only UI library. Accessible starter page (`main` landmark, single `<h1>`,
  labelled Start button). Vitest + React Testing Library + `vitest-axe` harness
  with two passing tests (role/text render + no axe violations).
- **Verified:** `npm test` → 2 passed; `npm run build` → clean (tsc + vite);
  accessibility tree confirms `main` → `h1` → button.
- **Notes / deliberate cuts:** test files excluded from the production `tsc`
  build (run by Vitest, not typechecked in build) to keep the build green — fine
  for a scaffold. axe's colour-contrast rule can't run under jsdom (no canvas),
  so contrast is checked manually/later, not in this unit test.
- **Next chunks (separate PRs):** B = Django backend, C = `/api/triage` boundary
  + Vite proxy.
