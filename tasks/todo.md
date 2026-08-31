# Todo — Chunk B: Backend scaffold

Branch: `setup-django` · Plan: approved (scaffold, chunked). No commits by assistant.

- [x] Install a package manager (uv 0.12.7) — env had no pip/ensurepip
- [x] Create `backend/.venv` and install Django (6.1 on Python 3.14)
- [x] `django-admin startproject config` + `triage` app
- [x] Trim settings to a stateless JSON API (no admin/auth/sessions/DB models)
- [x] Health endpoint `GET /api/health` + wire `config.urls` → `triage.urls`
- [x] `backend/.gitignore` + `requirements.txt`
- [x] Verify: `manage.py check` (0 issues), `manage.py test` (1 passing), live curl 200
- [ ] User commits + opens PR (assistant provides PR description only)

## Review

- **What shipped:** plain Django 6.1 backend under `backend/`. Project `config`,
  app `triage`. Settings trimmed to a stateless JSON API — no admin, auth,
  sessions, messages or DB models — so no migrations or stored data are needed.
  `GET /api/health` → `{"status": "ok"}` proves the structure serves JSON.
- **Verified:** `manage.py check` → 0 issues; `manage.py test triage` → 1 passed
  (SimpleTestCase, no DB); live `runserver` curl → `200 application/json` with
  security headers; `/api/` → 404.
- **Notes / deliberate cuts:** Django's dev `SECRET_KEY` + `DEBUG=True` are kept
  for local dev only. `db.sqlite3` config remains but nothing uses the ORM. The
  real `POST /api/triage` (with `@csrf_exempt`) is Chunk C, not here.
- **Env note:** environment had no pip/uv/ensurepip; installed uv to proceed.
- **Next chunk (separate PR):** Chunk C — `POST /api/triage` stub + Vite dev
  proxy + React fetch client, wiring frontend ↔ backend.
