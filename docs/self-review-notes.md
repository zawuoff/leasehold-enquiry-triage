# Self-review notes

## Personal data & security

This prototype is intentionally stateless. There is no database, authentication or persistence. The enquiry and feedback are processed in memory to produce a response and are then discarded.

The adviser callback form asks for an optional name and email address. If an email is entered, it is validated, but neither field is stored or attached to any record.

One limitation I wanted to make explicit is that the callback is not actually functional. At the moment it demonstrates the user flow and validation only. For a real callback, the details would need to be sent somewhere, for example to a CRM, adviser queue or another service. I deliberately did not add that because the brief says not to store real personal data and there is no real adviser system available as part of the exercise. The UI also makes this clear rather than suggesting that somebody will actually contact the user.

I also tried to minimise the amount of personal information being requested. The form only contains the information that would realistically be needed for a callback, both fields are optional, and I do not ask for things such as an address, lease reference or other identifiers. The free-text screen also asks users not to include personal information in their enquiry.

Because the application currently stores nothing, there is no application-level retention, access or deletion process to deal with. If callback details were stored or transmitted in a future version, I would expect to add a defined retention period, a process for subject-access and erasure requests, an appropriate lawful basis for processing the information, and encryption for stored personal data.

At the API level I added a few basic defensive measures. The endpoints only accept POST requests, malformed or non-JSON requests return a controlled `400` response instead of a server error, inputs have length limits, and responses do not echo the user's enquiry or expose the matching rules. Django `DEBUG` is also controlled through the environment and defaults to off.

One caveat is that my "nothing is stored" statement only applies to the application itself. I have not audited infrastructure-level logging such as web-server, proxy or platform logs, so I would not claim that no data could appear there without checking the deployment environment first.

## Accessibility

I added automated accessibility checks using `vitest-axe`, along with tests around roles, labels and keyboard interactions. The UI uses MUI components, which gives a reasonable accessible baseline for things such as labelled controls, semantic elements and visible focus states.

During hardening I expanded the axe checks so that every main screen is covered rather than only a few of them. I also added tests to make sure focus moves to the error summary when validation fails and to the service-error screen if the request itself fails. I added example prompts below the free-text input as well and associated them with the field so they are available to assistive technology.

The main limitation is that these are still automated checks. They are useful for catching structural issues, but they do not replace actually using the application with assistive technology. With more time, I would test the full journey using NVDA and/or VoiceOver, go through the complete keyboard order manually, and do some usability testing with real users. I would pay particular attention to the two-result state and the fallback journey, as they contain more information and choices for the user.

## Self code review

*Strengths (kept short — these are table stakes, not selling points):* the backend domain is pure functions with a uniform `TriageError(code, field)` shape and no HTTP coupling, so it's genuinely unit-testable; copy is single-sourced; the stateless design keeps the privacy story simple.

The main technical weakness is the free-text matching. It currently uses deterministic keywords and synonyms, which is simple and predictable but will become brittle with real users, particularly with misspellings, unusual phrasing and more complicated enquiries. For a production version I would probably investigate semantic matching, potentially using embeddings/vector search and an LLM re-ranking step, while still keeping the final service rules deterministic and testable.

I added tests for some awkward free-text cases such as negation and enquiries which mention more than one topic, but this is an area where I would want a much larger set of real-world examples before being confident in it.

There are also a couple of deliberate trade-offs that I would call out: The callback form is a mock: it validates the data and then discards it, so no adviser is actually contacted. The interface makes this clear. Feedback is also optimistic at the moment — the "Thanks" message appears as soon as Yes or No is clicked rather than waiting for the POST request to finish.

Finally, there are some backend validation errors such as `invalid_scenario_ids`, `conflicting_fields` and `invalid_mode` which the current frontend cannot produce. I kept these as defensive API guards rather than relying entirely on the UI to send valid data. They are therefore intentional, although there is currently no frontend path which exercises them.

It only works if the user already speaks the domain's vocabulary. Someone who writes "the people who run my building won't answer my emails" never says "managing agent" and drops straight to fallback. That's the exact stressed, non-expert user the brief centres, so the fallback rate on real language is probably higher than the tests suggest. (This is what I mentioned in the plan file, where this could be improved using an LLM and a vector database.)

Tests cover behaviour, but partly bake in these quirks. Coverage is decent, but several tests assert what the matcher currently does rather than what the user needs, so they'd pass even where the matching is arguably wrong. Missing: adversarial real-world paraphrases, and a check that the two-topic cap doesn't surface a near-noise second topic.

Email validation is a shape check only (documented as such) — fine for a prototype, but it validates format, not deliverability, so "asdf@asdf" passes.
