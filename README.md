# Leasehold enquiry triage

A small prototype for the Leasehold Advisory Service (LEASE). A leaseholder in
England & Wales describes a problem — by picking common scenarios **or** typing
in their own words — and gets a plain-English next step: relevant topics, a
cautious explanation, and a link to verified LEASE guidance. It signposts; it
does **not** give legal advice.

**Author:** Fouwaz Parkar · **Date:** 2026-09-01 (submission date)

## What it does

- **Guided triage** — pick one or two common scenarios → topic-grouped guidance
  cards (deduplicated by topic; scenarios in a topic share a heading + warning).
- **Free-text triage** — describe the situation; a deterministic keyword
  classifier returns up to two topics, or a safe fallback that routes to LEASE.
- **On every result** — a "Contact LEASE" link, an optional **adviser callback**
  (name + email), and a **"was this helpful?"** feedback control.
- **Navigation** — Back, "Change your answers" (preserves input), retry on error;
  focus moves to each step's heading for assistive tech.

## Architecture

- **Frontend** — React 19 + TypeScript (Vite), **MUI** as the only UI library.
  Local step-state machine (no router); enquiry data stays in memory and out of
  the URL. `frontend/src/` — `App.tsx` (flow), `components/`, `api/triage.ts`,
  `content.ts` (UI copy mirrored from `docs/records/content.md`).
- **Backend** — plain Django 6.1 JSON API, **stateless (no database)**.
  `backend/triage/` — `content.py` (mirrors `docs/records/content.md`), `domain.py`
  (pure validation + classification), `views.py`, `urls.py`.
- **Dev** — Vite proxies `/api` to Django, so the browser makes same-origin
  requests (no CORS).

Endpoints (all under `/api/`): `GET /scenarios`, `POST /triage`
(`mode: guided | free_text`), `POST /callback`, `POST /feedback`,
`GET /health`.

## Run it locally

**Backend** (Python 3.12+; uses [uv](https://docs.astral.sh/uv/) or pip):

```bash
cd backend
uv venv .venv --python 3.14 && uv pip install -r requirements.txt
# or: python -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python manage.py runserver
```

`DEBUG` is off by default (env-driven). For verbose local error pages, run with
`DJANGO_DEBUG=true .venv/bin/python manage.py runserver`. `ALLOWED_HOSTS`
defaults to `localhost,127.0.0.1` and is overridable via `DJANGO_ALLOWED_HOSTS`.

**Frontend** (Node 20+), in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The dev server proxies `/api` to Django on `:8000`.

## Tests

```bash
backend/.venv/bin/python backend/manage.py test triage   # domain + endpoints
npm --prefix frontend test                               # Vitest + axe
npm --prefix frontend run build                          # type-check + bundle
```

## Accessibility

Targets **WCAG 2.2 AA**: semantic landmarks + a single `<h1>` per screen,
labelled controls, error summaries with focus management, keyboard operability,
and an automated `vitest-axe` check on each screen. axe cannot check colour
contrast under jsdom, so contrast is asserted directly in a unit test
(`theme.contrast.test.ts`) — added after a manual check found and fixed a real
WCAG AA contrast failure that axe had missed.

## Personal data & security

- **No database and no persistence.** Guided/free-text enquiries are sent to the
  backend only to compute a result and are not stored or logged (verified: no
  request-body logging, no `console.log`, no `localStorage`, nothing in URLs).
- The **adviser callback** collects a name + email; in this prototype they are
  validated and acknowledged, then **discarded — never stored**. **Feedback**
  (yes/no + optional comment) is likewise not stored. In production these would
  need a lawful basis, a retention/deletion policy, and access controls.
- The free-text entry warns users not to include personal details, and enquiry
  text is never placed in a URL. `DEBUG` is **off by default** (opt in with
  `DJANGO_DEBUG=true` for local dev); the checked-in `SECRET_KEY` is a dev
  placeholder and must be replaced (e.g. via env) for any real deployment.

## Deliberately left out

Per the brief, this is a first slice, not a finished product. Not included:

- **Park homes** — out of scope (leasehold only); a natural future extension.
- **Persistence, accounts, auth, deployment** — none; the API is stateless.
- **A real NLP classifier** — free-text uses naive keyword matching: input with
  no keyword (e.g. a misspelling) falls to the safe fallback, and **negation is
  not detected** — a negated sentence containing a keyword still matches its topic.
- **Real LEASE phone/email** — results link to the verified "Get in touch" page
  rather than inventing contact details.
- A **full GOV.UK Design System** implementation — MUI approximates the look and
  feel; the design system itself is out of scope.

## Docs

- `docs/plan1.md` — the V1 planning pack.
- `docs/hardening-notes.md`, `docs/self-review-notes.md`, `docs/ai-usage-note.md` — Part 3 write-ups.
- `docs/records/content.md` — approved user-facing copy, warnings, LEASE URLs, dates.
- `docs/records/running-notes.md` — chronological decisions and draft copy awaiting
  promotion into `content.md`.
