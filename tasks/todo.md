# Todo — Chunk C: connect frontend to backend

Branch: `connecting-frontend-to-backend` · Plan: approved (scaffold, chunked).
No commits by assistant.

- [x] Backend: `POST /api/triage` stub (csrf_exempt, POST-only) returning JSON
- [x] Backend tests: POST 200 stub, GET 405, invalid JSON 400
- [x] Frontend: Vite dev proxy `/api` → `http://localhost:8000`
- [x] Frontend: relative-path fetch client (`src/api/triage.ts`)
- [x] Frontend: wire Start button → call API, show result/error (aria-live)
- [x] Frontend tests: api client (success/failure) + App click (success/error) + a11y
- [x] Verify: backend 4 tests, frontend 6 tests, build clean, live proxy e2e
- [ ] User commits + opens PR (assistant provides PR description only)

## Review

- **What shipped:** the front/back boundary. Django gains a stub
  `POST /api/triage` (`@csrf_exempt`, POST-only → 405 on GET, 400 on bad JSON,
  200 stub otherwise). Vite proxies `/api` to Django in dev, so the browser makes
  same-origin calls (no CORS). React calls it via a relative-URL fetch client and
  the Start button now shows the backend message (or an error) in an `aria-live`
  region.
- **Verified:**
  - Backend: `manage.py test triage` → 4 passed (no DB).
  - Frontend: `npm test` → 6 passed (2 files); `npm run build` → clean.
  - End-to-end via proxy (`:5173` → `:8000`): POST → 200 stub JSON, GET → 405,
    invalid JSON → 400.
- **Notes / deliberate cuts:** the triage response is a stub — real
  classification (scenarios, keyword matching, topics) is later tickets. Proxy is
  dev-only; a real deployment serves both from one origin.
- **Gotcha logged:** a stale `runserver` on :8000 (health-only code) once served
  requests and masked the new route — always confirm the intended process owns
  the port. (→ tasks/lessons.md)
