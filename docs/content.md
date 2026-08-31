# Leasehold enquiry triage — V1 content

This file is the maintained source for exact user-facing scenario, result, fallback, validation, error and recovery copy; official links; shared warnings; and source-verification dates. Product behaviour and scope are defined in [plan.md](./plan.md); decision history remains in [running-notes.md](./running-notes.md).

## Content rules

- Use cautious signposting such as “This may relate to…” and “This guidance may help…”.
- Do not decide rights, liability, validity, eligibility, likely success, urgency, or the best legal route.
- Show one primary next step per originating scenario and no more than one conditional alternative per topic card.
- Conditional alternatives are objective “if” statements. The system does not infer that a condition applies.
- Urgent-condition messages are static general warnings and are never triggered or personalised by analysing user input.
- Official sources must be rechecked before production use.

## Navigation behaviour and control labels

- Show a clear **“Back”** button on every journey step after the first. It returns to the previous step without submitting and preserves previous scenario selections.
- Use **“Continue”** to move between input steps and **“Show relevant guidance”** for the final submission action.
- Refreshing the page restarts the journey at the first step. Do not restore enquiry data after refresh or include it in a URL.
- After forward or Back navigation, move keyboard focus to the new step's main heading and announce the new step to assistive technology.
- Use the result and recovery action labels defined below.

## Topic labels

| Internal topic | User-facing topic label |
| --- | --- |
| `COSTS_AND_CHARGES` | Costs and charges |
| `REPAIRS_AND_BUILDING_MANAGEMENT` | Repairs and building management |
| `LEASE_EXTENSION` | Lease extension |

The suggested-topic heading uses: **“This may relate to [user-facing topic label].”**

## Free-text entry

- **Heading:** “Before you describe your situation”
- **Privacy notice:** “Do not include names, addresses, contact details, reference numbers or information about other people. When you continue, your description is sent to this prototype to suggest relevant guidance. It is not added to an account or enquiry history.”
- **Field label:** “Describe your situation”
- **Hint:** “Briefly describe the main issue in your own words. You do not need to use legal terms. Maximum 1,000 characters.”
- **Examples (accepted):** shown **below** the field (not as placeholder), labelled “For example:”, one per topic:
  - “My service charge has gone up a lot this year and I don’t understand why.” — costs & charges
  - “The lift in my block has been broken for weeks and the managing agent isn’t fixing it.” — repairs & building management
  - “My lease has about 80 years left and I want to know how to extend it.” — lease extension
- **Rejected:** placeholder text inside the box — it disappears on typing and has low contrast (WCAG). Examples sit below the field, associated to it via `aria-describedby`.

This wording deliberately does not claim that the text is never saved anywhere. That claim would require the final proxy, server and diagnostic-logging setup to be implemented and audited.

## Free-text topic cards

Free-text results use the same card structure as guided results but omit `scenario_id`. They do not imply that a more specific scenario or personalised legal conclusion has been identified.

Use these shared labels:

- **Suggested-topic heading:** “This may relate to [user-facing topic label].”
- **Explanation heading:** “Why this may be relevant”
- **Next-step heading:** “What you can do next”

### `COSTS_AND_CHARGES`

- **Suggested topic:** “This may relate to costs and charges.”
- **Why it may be relevant:** “Your description may concern a payment connected with your lease, such as a service charge, ground rent or another charge. This result does not decide whether an amount is payable or reasonable.”
- **Primary next step:** “Read LEASE’s costs and charges guidance to find information about service charges, ground rent, major works and other common charges.”
- **Link label:** “Read costs and charges guidance”
- **Official source:** https://www.lease-advice.org/costs-and-charges/
- **Verified:** 30 August 2026

### `REPAIRS_AND_BUILDING_MANAGEMENT`

- **Suggested topic:** “This may relate to repairs and building management.”
- **Why it may be relevant:** “Your description may concern repairs, maintenance or how your building is managed. The relevant guidance can depend on the part of the building, who manages it and what the lease says. This result does not decide who is responsible.”
- **Primary next step:** “Read LEASE’s building management guidance to find information about repairs, maintenance and problems with managing a leasehold building.”
- **Link label:** “Read building management guidance”
- **Official source:** https://www.lease-advice.org/building-management/
- **Verified:** 30 August 2026

### `LEASE_EXTENSION`

- **Suggested topic:** “This may relate to lease extension.”
- **Why it may be relevant:** “Your description may concern extending a lease. The process and guidance can differ for flats and leasehold houses. This result does not decide whether you qualify, what it may cost or which route is suitable.”
- **Primary next step:** “Read LEASE’s lease extension guidance, then choose the information for a flat or a leasehold house.”
- **Link label:** “Read lease extension guidance”
- **Official source:** https://www.lease-advice.org/lease-extension/
- **Verified:** 30 August 2026

## Unsupported or unclear fallback

- **Heading:** “We could not match your question”
- **Body:** “This prototype may not recognise the wording, or your question may be outside the topics it covers. You can still use LEASE guidance or contact LEASE.”
- **Next step:** “Try editing your description without adding personal details, or choose from the common scenarios. If neither helps, contact LEASE for guidance.”
- **Actions:** “Edit description”; “Choose from common scenarios”; “Contact LEASE”
- **Contact destination:** https://www.lease-advice.org/about-us/get-in-touch/
- **Verified:** 30 August 2026

## Validation messages

Use the error-summary heading **“Check your answers”**.

| Stable validation code | User-facing message |
| --- | --- |
| `invalid_mode` | “Choose a common scenario or select ‘I’m not sure / something else’.” |
| `invalid_scenario_count` | “Select one or two scenarios.” |
| `invalid_scenario_ids` | “One or more scenario choices could not be recognised. Choose them again.” |
| `blank_text` | “Describe your situation before continuing.” |
| `text_too_long` | “Shorten your description to 1,000 characters or fewer.” |
| `conflicting_fields` | “Choose scenarios or describe your situation in your own words—not both.” |
| `invalid_request` | “We could not read your answers. Go back and try again.” |

After announcing the summary, validation errors with a known field link to or focus the scenario group or free-text field. `invalid_request` may be shown as a page-level error because a specific field may not be identifiable.

## Service, network or malformed-response error

- **Heading:** “We could not check your enquiry”
- **Body:** “There was a problem with the service. Try again, or contact LEASE for guidance.”
- **Actions:** “Try again”; “Contact LEASE”
- **Contact destination:** https://www.lease-advice.org/about-us/get-in-touch/
- **Verified:** 30 August 2026

Network failures, malformed responses and HTTP 500 responses use this same visible copy, while remaining distinguishable in tests.

## Recovery and external action behaviour

| Visible action | Destination or behaviour |
| --- | --- |
| “Read costs and charges guidance” | Open the verified costs-and-charges topic page in the same tab |
| “Read building management guidance” | Open the verified building-management topic page in the same tab |
| “Read lease extension guidance” | Open the verified lease-extension topic page in the same tab |
| “Contact LEASE” | Open the verified [Get in touch](https://www.lease-advice.org/about-us/get-in-touch/) page in the same tab |
| “This doesn't match” on a guided result | Return to scenario selection with existing selections preserved and focus the step heading |
| “This doesn't match” on a free-text result | Return to the free-text step with the previous description preserved and focus the step heading |
| “Edit description” | Return to the free-text step with the previous description preserved and focus the step heading |
| “Choose from common scenarios” | Return to scenario selection; exclude free text from the next guided request |
| “Try again” | Resubmit the same in-memory request once; disable the action while that request is pending |
| “Go back” after `invalid_request` | Return to the previous input step with user-entered values preserved |

- Keep **“This doesn't match”** as the visible label. Give it a topic-specific accessible name, such as “This doesn't match: Costs and charges.”
- Do not place enquiry text in action URLs.
- Open all external guidance and contact links in the same tab.

## Shared conditional content

### `charges-urgent-warning`

- **Copy:** “If you have received court papers or a formal forfeiture notice relating to unpaid charges, get urgent legal advice rather than relying on this result.”
- **Official source:** https://www.lease-advice.org/disputes/breaching-your-lease-and-forfeiture/
- **Verified:** 30 August 2026
- **Display rule:** show as a general warning only. Do not infer that the condition applies.

### `unresolved-landlord-or-agent-route`

- **Copy:** “If you have already raised the issue with your landlord or managing agent and it remains unresolved, read LEASE’s guide for general information about routes for resolving the issue.”
- **Official source:** https://www.lease-advice.org/disputes/resolving-leasehold-disputes/landlord-managing-agent-disputes/
- **Verified:** 30 August 2026
- **Display rule:** show as an objective condition only. Do not decide that the issue is unresolved or recommend a legal strategy.

### `lease-extension-deadline-warning`

- **Copy:** “If you have already served or received a formal lease-extension notice, or a document states a deadline, request advice from LEASE or a relevant professional rather than relying on this result.”
- **Official source:** https://www.lease-advice.org/about-us/get-in-touch/
- **Verified:** 30 August 2026
- **Display rule:** show as a general warning only. Do not infer that a notice or deadline exists.

## Scenario content

### `service-charge-major-works`

- **User-facing scenario:** “I have received a service charge or major works bill that I do not understand or think is fair.”
- **Internal topic:** `COSTS_AND_CHARGES`
- **Why it may be relevant:** “This may relate to costs and charges because service charges and major-works bills concern amounts requested for managing, maintaining, or repairing a building. The relevant guidance depends on the demand, the work, and the lease; this result does not decide whether a charge is payable or reasonable.”
- **Primary next step:** “Read LEASE’s service-charges section to understand what service charges may cover, how demands are presented, and where to find guidance about high charges or major works.”
- **Official source:** https://www.lease-advice.org/costs-and-charges/service-charges/
- **Verified:** 30 August 2026
- **Conditional content:** `charges-urgent-warning`

### `ground-rent-demand`

- **User-facing scenario:** “I have received a ground rent demand and want to understand what to check.”
- **Internal topic:** `COSTS_AND_CHARGES`
- **Why it may be relevant:** “This may relate to costs and charges because LEASE provides separate guidance for ground-rent demand notices. This result can help you find what to check, but it does not decide whether an amount is owed.”
- **Primary next step:** “Read LEASE’s ground-rent demand-notices guide to understand the information a demand should contain, when payment can be requested, and the time limit covered by the guide.”
- **Official source:** https://www.lease-advice.org/costs-and-charges/ground-rent/demand-notices/
- **Verified:** 30 August 2026
- **Conditional content:** `charges-urgent-warning`

### `repairs-responsibility`

- **User-facing scenario:** “My building needs repairs, and I am unsure who is responsible for arranging them.”
- **Internal topic:** `REPAIRS_AND_BUILDING_MANAGEMENT`
- **Why it may be relevant:** “This may relate to repairs and building management because responsibility can depend on which part of the property is affected and what the lease says. This result does not decide who is responsible in your circumstances.”
- **Primary next step:** “Read LEASE’s repairs and maintenance guide to understand the usual areas of responsibility and the steps for requesting a repair.”
- **Official source:** https://www.lease-advice.org/building-management/repairs/repairs-and-maintenance-in-leasehold-properties/
- **Verified:** 30 August 2026
- **Conditional content:** `unresolved-landlord-or-agent-route`

### `building-management-problem`

- **User-facing scenario:** “I am unhappy with how my building is being managed and want to know what I can do next.”
- **Internal topic:** `REPAIRS_AND_BUILDING_MANAGEMENT`
- **Why it may be relevant:** “This may relate to repairs and building management because LEASE’s management guidance covers problems involving landlords, freeholders, or property managers. This result does not determine which complaint or legal route applies.”
- **Primary next step:** “Read LEASE’s leasehold-management-problems guide, starting with its steps for raising the issue and checking the relevant complaints process.”
- **Official source:** https://www.lease-advice.org/building-management/management/leasehold-management-problems/
- **Verified:** 30 August 2026
- **Conditional content:** `unresolved-landlord-or-agent-route`

### `lease-extension`

- **User-facing scenario:** “I want to extend my lease and understand how the process works.”
- **Internal topic:** `LEASE_EXTENSION`
- **Why it may be relevant:** “This may relate to lease extension. LEASE provides different guidance for flats and leasehold houses, and this result does not determine eligibility, cost, or which route is suitable.”
- **Primary next step:** “Open LEASE’s lease-extension section, choose the guidance for a flat or leasehold house, and read the relevant getting-started information before taking action.”
- **Official source:** https://www.lease-advice.org/lease-extension/
- **Verified:** 30 August 2026
- **Conditional content:** `lease-extension-deadline-warning`

## Deduplicated topic cards

### `COSTS_AND_CHARGES`

- Share the topic heading, `charges-urgent-warning`, verification information, and “This doesn’t match” action.
- Keep the service-charge and ground-rent scenarios, explanations, primary steps, and official links separately labelled.
- Service charges and ground rent are different kinds of payment; do not merge their guidance.

### `REPAIRS_AND_BUILDING_MANAGEMENT`

- Share the topic heading, `unresolved-landlord-or-agent-route`, verification information, and “This doesn’t match” action.
- Keep the repairs and management scenarios, explanations, primary steps, and official links separately labelled.
- Do not treat responsibility for repairs and dissatisfaction with management as the same concern.

### `LEASE_EXTENSION`

- V1 has one originating scenario, so no within-topic deduplication is currently required.

## Content limitations

- The service-charge scenario uses the broader official service-charges section because one deep link cannot represent every ordinary service-charge and major-works concern.
- The lease-extension scenario does not distinguish a flat from a leasehold house. Their official guidance differs, so the result uses the general lease-extension section and does not state eligibility or select a route.
- Property-manager redress coverage differs between England and Wales. Do not present a redress scheme as universally available without confirming jurisdiction and scheme membership.
- None of the content decides whether a charge is valid, who is legally responsible, whether a complaint will succeed, which lease-extension route is suitable, or any other personalised conclusion.
