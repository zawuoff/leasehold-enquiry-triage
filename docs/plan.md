# Leasehold enquiry triage — V1 planning pack

## Problem, users and useful outcome

Leaseholders in England and Wales may seek help while dealing with a stressful, unfamiliar housing problem. They may not know its legal name, which information applies or what to do next.

V1 will let a leaseholder select one or two common plain-language scenarios or use a separate free-text route. It will signpost them to broadly relevant, verified LEASE guidance or clearly explain that it cannot make a safe match.

A useful V1 lets a user:

- understand what is being asked without legal terminology;
- reach a broad topic and a cautious next step;
- recognise and reject an unsuitable result;
- recover from unclear, unsupported or failed enquiries; and
- complete the journey without being asked for unnecessary personal information.

Categorisation supports this outcome; it is not the outcome itself. The prototype provides signposting, not personalised legal advice.

## Confirmed V1 boundary

- V1 supports the five confirmed leasehold scenarios across costs and charges, repairs and building management, and lease extension. Exact wording and mappings are maintained in [content.md](./content.md).
- Users may choose no more than two scenarios. “I’m not sure / something else” is mutually exclusive with those scenarios and is the only route to free text.
- Results are deduplicated by topic. Separate concerns remain separately explained and are never combined into personalised conclusions.
- Park-home triage is excluded. Park-home owners must be told the prototype does not cover their situation and directed to an appropriate verified LEASE service.
- React owns the journey using local step state and conditional rendering, without React Router. Back preserves in-memory answers, refresh restarts and enquiry data stays out of URLs.
- A thin plain-Django JSON view exposes only `POST /api/triage`. Pure Python owns authoritative validation, classification, fallback, deduplication and approved result assembly.
- Guided requests contain one or two known scenario IDs. Free text is non-blank, limited to 1,000 characters and cannot accompany scenario IDs. Unknown modes and fields are rejected.
- Matches and valid fallback are HTTP 200 outcomes; invalid input returns HTTP 400 with a stable code; unexpected failures return HTTP 500. Responses do not echo enquiry text or expose rules, scores or legal conclusions.
- V1 has no database, persistence, accounts, uploads, external processing or intentional enquiry logging.

Deliberately excluded from Part 2 are weighted or AI classification, a full advice engine, Wagtail, Django REST Framework, authentication, production deployment or monitoring infrastructure, pixel-perfect design and feature completeness beyond the confirmed slice.

## Assumptions and honest unknowns

### Product and advice

- Users can choose one or two broadly relevant scenarios, recognise an unsuitable result and use the fallback or Contact LEASE route.
- Five scenarios provide useful depth despite incomplete leasehold coverage.
- Official guidance can support cautious signposting without deciding rights, liability, validity, eligibility, urgency, likely success or legal strategy.
- Exact park-home exclusion and redirect content still requires approval and source verification.

### Technical, accessibility and privacy

- Explicit phrase and synonym rules are sufficient for three topics when weak, negated, conflicting and unsupported input falls back safely.
- React and Django remain proportionate if there is one endpoint, one authoritative Python domain path and a reproducible local setup.
- Plain language, focus management and accessible announcements should make the journey usable, but representative usability and assistive-technology testing remains necessary.
- The application will not persist enquiries or intentionally log request bodies. Infrastructure-level no-storage claims remain unproven until server, proxy and diagnostic logging are inspected.
- Classification quality, misspelling coverage and the usefulness of two-topic results remain empirical unknowns until representative tests pass.

## Part 2 — Ordered implementation tickets

1. **Scaffold the React frontend**

   - **Deliverable:** basic React application, local development command and frontend test setup.
   - **Acceptance checks:** the application mounts a basic page and the initial render test passes.
   - **Done means:** the frontend starts locally, renders a basic page and its initial test passes.

2. **Scaffold the Django backend**

   - **Deliverable:** plain-Django project and application structure with backend test setup and no database-dependent feature.
   - **Acceptance checks:** Django system checks and the initial backend test pass without requiring migrations or stored data.
   - **Done means:** Django starts locally and its initial test passes.

3. **Establish the frontend–backend boundary**

   - **Deliverable:** minimal `POST /api/triage` Django view, relative frontend API client and local development proxy.
   - **Acceptance checks:** an integration-focused frontend test covers success and failure handling; an endpoint test confirms JSON and method handling.
   - **Done means:** React submits a request and handles a real Django JSON response.

4. **Implement guided-scenario triage**

   - **Deliverable:** pure Python scenario IDs, mappings, approved result data, request validation, result assembly and topic deduplication.
   - **Acceptance checks:** focused domain and endpoint tests cover every scenario, one/two IDs, same/different topics, duplicates, unknown IDs and excessive selections.
   - **Done means:** one or two valid scenario IDs return the expected result cards, while invalid requests are rejected.

5. **Implement the guided React journey**

   - **Deliverable:** scenario screen, two-selection limit, submission/loading flow and matched, validation and service-error presentation.
   - **Acceptance checks:** component tests cover selection limits, submission payload, matched results, field errors and API failure recovery.
   - **Done means:** a user can complete the guided journey and recover from an invalid or failed request.

6. **Implement free-text triage**

   - **Deliverable:** exclusive free-text screen, privacy guidance, length validation, phrase/synonym classifier, one/two-topic results and safe fallback.
   - **Acceptance checks:** domain, endpoint and component tests cover supported wording, overlaps, misspellings, negation, conflicts, unsupported text, blank text and the 1,000-character limit.
   - **Done means:** supported descriptions return one or two relevant topics, while unclear, conflicting or unsupported descriptions return the approved fallback.

7. **Complete results, navigation and recovery**

   - **Deliverable:** approved cards and warnings plus Back, retry, “This doesn’t match,” preserved input, focus management and accessible announcements.
   - **Acceptance checks:** frontend tests cover matched, deduplicated, fallback and failure states; recovery actions; focus; announcements; and keyboard operation.
   - **Done means:** every confirmed matched, fallback and failure path is keyboard usable and provides a clear recovery action.

8. **Verify the integrated prototype**

   - **Deliverable:** proportionate domain, endpoint, frontend and real React-to-Django journey tests, with recorded privacy and link checks.
   - **Acceptance checks:** supported, invalid, fallback, malformed-response and service-error paths pass; links, browser storage and accidental request logging are inspected.
   - **Done means:** important paths pass and the complete slice runs using documented commands.

9. **Document the delivered slice**

   - **Deliverable:** README covering setup, architecture, supported behaviour, testing, privacy boundaries, limitations and exclusions.
   - **Acceptance checks:** setup commands are rerun from a clean checkout and the README matches the delivered behaviour.
   - **Done means:** another engineer can run and understand the prototype and see what was intentionally omitted.

## Risks and Part 3 reviewer scrutiny

| Risk | What hardening and review should scrutinise |
| --- | --- |
| Testing gaps | Realistic paraphrases, overlaps, misspellings, fallback cases, malformed responses and retries across all test layers—not only happy paths. |
| Accessibility | Native controls, keyboard order, error summaries, focus changes, announcements, preserved answers and one/two-card results with assistive technology. |
| Personal data | Browser storage, URLs, Django/proxy logs, errors, tests and any diagnostic tooling for accidental enquiry capture. |
| Security | Method, content-type, JSON-shape, field and body-size restrictions; output escaping; safe errors; dependencies; and debug settings. |
| Legal/content safety | Accidental statements about liability, urgency, eligibility or strategy, plus stale approved copy, warnings and links. |
| Maintainability | Duplicate validation/content, hidden coupling, unnecessary dependencies and whether the one-endpoint local setup remains reproducible. |

Part 3 hardening and self-review should assess these risks without expanding Part 2 into production infrastructure or additional features.

## Supporting records

- [content.md](./content.md): approved copy, warnings, URLs and verification dates.
- [running-notes.md](./running-notes.md): exploration, decisions, alternatives and planning history.
