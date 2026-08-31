# Leasehold enquiry triage

A small prototype for the Leasehold Advisory Service (LEASE). A leaseholder in
England & Wales describes a problem — by picking common scenarios **or** typing
in their own words — and gets a plain-English next step: relevant topics, a
cautious explanation, and a link to verified LEASE guidance. It signposts; it
does **not** give legal advice.

**Author:** Fouwaz Parkar · **Date:** 2026-08-31

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
  `content.ts` (UI copy mirrored from `docs/content.md`).
- **Backend** — plain Django 6.1 JSON API, **stateless (no database)**.
  `backend/triage/` — `content.py` (mirrors `docs/content.md`), `domain.py`
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
and an automated `vitest-axe` check on each screen. Automated axe cannot check
colour contrast under jsdom — that remains a manual/next-step check.

## Personal data & security

- **No database and no persistence.** Guided/free-text enquiries are sent to the
  backend only to compute a result and are not stored or logged (verified: no
  request-body logging, no `console.log`, no `localStorage`, nothing in URLs).
- The **adviser callback** collects a name + email; in this prototype they are
  validated and acknowledged, then **discarded — never stored**. **Feedback**
  (yes/no + optional comment) is likewise not stored. In production these would
  need a lawful basis, a retention/deletion policy, and access controls.
- The free-text entry warns users not to include personal details, and enquiry
  text is never placed in a URL. `DEBUG=True` and the dev `SECRET_KEY` are for
  local development only.

## Deliberately left out

Per the brief, this is a first slice, not a finished product. Not included:

- **Park homes** — out of scope (leasehold only); a natural future extension.
- **Persistence, accounts, auth, deployment** — none; the API is stateless.
- **A real NLP classifier** — free-text uses naive keyword matching, so
  misspellings and negated phrases fall to the safe fallback by design.
- **Real LEASE phone/email** — results link to the verified "Get in touch" page
  rather than inventing contact details.
- **Part 3 reflective notes** (personal-data / accessibility / self-review write-up)
  and a full GOV.UK Design System implementation.

## Docs

- `docs/plan1.md` — the V1 planning pack.
- `docs/content.md` — approved user-facing copy, warnings, LEASE URLs, dates.
- `docs/running-notes.md` — chronological decisions and draft copy awaiting
  promotion into `content.md`.
