# Running notes

## 2026-08-30 — Exercise context established

### What Fouwaz provided and asked

- The Leasehold Advisory Service (`www.lease-advice.org`) provides government-funded guidance to leaseholders and park-home owners in England and Wales.
- The exercise is to build a small prototype where users describe a leasehold problem, have it categorised, and receive a clear next step.
- Start maintaining both the chronological running notes and the clean planning record from this point.
- Do not write production code yet.

### Options considered

- Treat the required journey as a thin three-stage flow: describe the problem, categorise it, and present a next step.
- The exact categories, method of categorisation, form of the next step, and need for persistence have not yet been selected.
- A broader case-management or advisory system is possible, but it is not required by the confirmed brief and would expand the prototype substantially.

### Important trade-offs

- A narrowly scoped journey will be easier to explain, test, and complete to a high standard; broader workflow features may look more realistic but risk distracting from the core exercise.
- Automated categorisation may improve the experience, but its predictability, explainability, cost, and failure behaviour depend on the approach selected later.
- A “clear next step” could be static guidance, a link, a contact route, or escalation; this needs a product decision because it changes both the content model and the user experience.

### Decisions and remaining questions

- Confirmed product flow: a user describes a leasehold problem, the prototype categorises it, and the prototype provides a clear next step.
- Confirmed audience context: leaseholders and park-home owners in England and Wales.
- No technical architecture or categorisation method has been selected.
- The category set, next-step format, handling of uncertainty, storage requirements, and any supplied acceptance criteria remain open.

### Official service taxonomy explored

- The LEASE website groups leasehold guidance under building management, buying and selling, costs and charges, disputes, lease extension, leasehold essentials, and shared ownership.
- Its separate park-homes site groups guidance under buying a park home, disputes, living in a park home, pitch fees and bills, and selling or gifting a park home.
- This creates two plausible category designs: first identify leasehold versus park home and then apply the relevant taxonomy, or create one combined category list for the prototype.
- Reusing the official top-level topics would make categories recognisable and allow next steps to link to relevant guidance. A smaller custom subset would be easier to demonstrate and test but would cover fewer enquiries.
- No taxonomy has been selected. The expected breadth of the take-home exercise and whether park-home enquiries must be demonstrated remain open questions.

## 2026-08-30 — Problem statement critique

### What Fouwaz proposed and asked

- The draft focuses on leaseholders and park-home owners in England and Wales who may be stressed, unfamiliar with legal terminology, and unsure which information applies or what to do next.
- The proposed V1 lets users select a common scenario or describe a situation in their own words, then returns a broad category and a plain-English next step.
- The intended boundaries are signposting rather than legal advice, with clarity, accessibility, privacy, and an honest fallback as priorities.
- The draft was reviewed for strengths, risks, assumptions, scope, legal-advice boundaries, missing user needs, and alternative approaches.

### What is strong

- It starts with a credible user problem and does not require users to know legal terminology.
- It focuses on a complete user outcome: understanding the issue broadly and knowing what to do next.
- It explicitly recognises uncertainty, privacy, accessibility, and the need for a fallback.
- The proposed journey is simple enough to explain and demonstrate.

### Issues and important trade-offs

- Categorisation is a proposed product mechanism, not the user's underlying need; the real outcome is reaching trustworthy information or a safe next action.
- Supporting leaseholders and park-home owners may make the content scope large because they have different legal frameworks and guidance structures.
- A confidently wrong category could mislead users. A safe design must let users reject or recover from an incorrect result, not only handle low-confidence cases.
- Enquiries may cover several overlapping topics, so forcing one category may oversimplify the situation.
- “Clear next step,” “common scenario,” “small number of topics,” “accessibility,” and “privacy” are not yet defined precisely enough to test.
- The screen flow appears small, but the subject coverage and content-validation work may not be.

### Alternatives considered

- A guided scenario journey using plain-language questions.
- A hybrid journey that starts with common scenarios and uses free text when those do not fit.
- A guidance finder that presents several potentially relevant routes instead of asserting one category.
- Next-step-first routing to guidance, LEASE advisers, another organisation, or urgent support.
- Curated search using ordinary-language terms.

### Assumptions and missing needs

- The draft assumes broad categories are useful to users, short descriptions contain enough information, most enquiries have one dominant issue, and every supported category has a safe next step.
- It assumes users know their tenure and jurisdiction, can recognise a wrong result, will avoid entering personal data, and do not need special handling for urgent or time-sensitive matters.
- Missing needs may include explaining why a result was suggested, rejecting an unsuitable result, browsing without disclosure, recognising urgency, and receiving a useful fallback route.

### Current conclusion and open decisions

- The problem is well grounded, but the draft mixes the user problem with a proposed categorisation solution.
- The legal-advice boundary is clear in intent but not yet operationally defined; permitted output language, urgent cases, escalation, and content verification remain open.
- No revised problem statement, taxonomy, interaction approach, or V1 scope has been confirmed, so nothing should be added to `plan.md` yet.
- The next major product decision is whether V1 is primarily testing free-text categorisation or whether it is testing the broader outcome of helping users reach a safe, useful next step.

## 2026-08-30 — Comparing the main goal for V1

### Options considered

- Prove that free-text enquiries can be categorised.
- Prove that users can reliably reach a safe, useful next step.
- Use a small hybrid journey combining guided scenarios with optional free text.

### Comparison and trade-offs

- Free-text categorisation has a focused technical scope and demonstrates classification logic, but it carries the greatest risk of incorrect or overconfident results and does not by itself prove user value.
- Safe next-step routing is the strongest product outcome and keeps attention on the user's real need, but “safe” and “useful” need explicit acceptance criteria and verified content.
- A hybrid journey offers stronger usability and safer recovery than free text alone, while still demonstrating categorisation. It requires more interface states and content than either a simple form or a purely guided route.


### Current recommendation and open decision

- Option 2 is best treated as the main product goal because it states the outcome for the user.
- Option 3 is better treated as the likely interaction approach used to achieve that goal; it is a solution design rather than a separate product outcome.
- Option 1 can remain a capability within the prototype rather than its primary measure of success.
- No option has been confirmed, so `plan.md` remains unchanged.

## 2026-08-30 — Exploring a small hybrid journey

### What Fouwaz asked

- Explore a hybrid journey combining guided scenarios with optional free text.
- Define the likely user journey, benefits and drawbacks, minimum viable scope, the role of free text, handling of wrong or overlapping results, and new assumptions.
- The hybrid approach is currently preferred but has not been confirmed.

### Proposed journey

- Explain what the prototype can help with, what it cannot provide, and ask users not to include personal information.
- Show a short list of recognisable, plain-language scenarios plus “I’m not sure / something else.”
- Let users choose a scenario directly or use free text when none fits.
- Return a suggested broad topic, a short explanation, and one safe next step.
- Let users accept the result, reject it and view alternatives, or use a fallback contact or guidance route.

### Minimum viable scope

- Support one clearly defined user group initially, or separate leasehold and park-home journeys before showing scenarios.
- Limit V1 to roughly three or four topics and four to six common scenarios.
- Provide one verified next step per topic and one useful fallback route.
- Return no more than two possible topics for an ambiguous or overlapping enquiry.
- Exclude accounts, saved enquiries, case history, document uploads, personalised legal conclusions, and open-ended advice conversations.

### Role of free text and failure handling

- Free text is an escape route for users who cannot identify a suitable scenario, not the required starting point.
- It can also provide optional context after a scenario choice, but V1 should avoid making that context necessary for the guided route.
- A wrong result must be rejectable, with alternative scenarios or the fallback offered immediately.
- Ambiguous or overlapping input should show up to two possible topics and let the user choose, rather than asserting certainty.
- Unsupported or low-confidence input should produce a clear limitation and useful fallback instead of a forced category.

### Benefits, drawbacks, and assumptions

- Benefits include lower cognitive effort, reduced dependence on legal vocabulary, safer handling than free text alone, and flexibility for users whose issue is not represented.
- Drawbacks include more interface states, scenario-content maintenance, possible bias toward the scenarios shown, and continued misclassification risk in the free-text route.
- The approach assumes the selected scenarios cover meaningful needs, users can recognise a suitable scenario, a small topic set maps to safe next steps, and users can identify and correct an unsuitable result.
- It also assumes most useful enquiries can be handled as one or two topics and that a fallback remains useful when the prototype cannot help.

### Open decisions

- Which user group or tenure V1 supports.
- The exact topics and scenarios.
- Whether free text appears only under “I’m not sure” or is also optional after selecting a scenario.
- What each next step and the fallback should contain.
- The hybrid approach remains under consideration and has not been added to `plan.md`.

## 2026-08-30 — Single versus limited multi-selection

### What Fouwaz challenged

- The current journey may assume too strongly that a user can identify one scenario.
- Consider allowing users to select up to two scenarios when issues overlap or the user is unsure which fits.
- Reconsider whether one next step per topic is sufficient and how multiple results can remain signposting rather than personalised legal advice.

### Comparison and trade-offs

- Single selection is simpler to understand, operate with assistive technology, validate, and present, but it can force users to hide an overlapping concern or guess which issue matters most.
- Selecting up to two scenarios better reflects real situations and may improve broad triage coverage, but it increases cognitive load, interaction instructions, validation states, and result complexity.
- Limited multi-selection should use labelled checkboxes, clearly state “choose up to two,” show the current selection count, and explain why the limit exists.
- Multi-selection can improve coverage but does not necessarily improve precision; unrelated selections could make the result less focused.

### Result and next-step design

- Multiple selections should produce separate topic cards or sections rather than one combined interpretation of the user's circumstances.
- Each result should use cautious language such as “This guidance may be relevant” and explain which selected scenario produced it.
- One next step per topic may be too restrictive when users need either self-service guidance or adviser support.
- A small V1 could provide one primary next step per topic plus one conditional alternative or escalation route, while avoiding long lists of links.
- The prototype should not infer legal rights, rank which issue is legally more important, or merge selections into personalised legal conclusions.

### Possible assumption

- “Users can identify one or two broadly relevant scenarios, and allowing limited multi-selection helps represent overlapping issues.”

### Current recommendation and open decision

- Allowing up to two scenarios is a reasonable hybrid design if overlapping needs are common in the chosen V1 topics.
- The benefit should be tested against the simpler single-selection journey before it is confirmed.
- Selection behaviour and next-step limits remain open and have not been added to `plan.md`.

## 2026-08-30 — Scenario-selection rules refined

### What Fouwaz asked and decided

- Explain the rationale for limiting standard scenario selections to two; the maximum has not yet been confirmed.
- Confirmed that “I’m not sure / something else” must be mutually exclusive with all standard scenario selections.
- Confirmed that users who select standard scenarios will not also be asked for free text in V1.
- Free text will only be offered through the “I’m not sure / something else” route to keep the journey manageable.

### Rationale and trade-offs for a two-selection limit

- Two selections can represent a primary issue and one overlapping concern without producing a long, unfocused result page.
- A small limit discourages selecting every plausible scenario and preserves useful triage signals.
- It bounds the number of result combinations, next-step links, interface states, and acceptance tests required for V1.
- The limit is a prototype constraint rather than an assumption that real situations contain no more than two issues.
- If representative examples show that three or more issues are commonly necessary, the limit should be reconsidered rather than forcing users into an inaccurate journey.

### Confirmed boundary

- Standard scenario selection and the uncertainty/free-text route are separate paths.
- The maximum number of standard scenarios remained an open decision at this point.

## 2026-08-30 — Two-scenario limit and problem framing confirmed

### Decisions

- Users may select up to two standard scenarios.
- The limit is a V1 scope constraint, not an assumption that users only experience two issues.
- “I’m not sure / something else” remains mutually exclusive with standard scenarios, and free text is shown only through that route.
- When two selections produce multiple results, each topic and its next steps remain separate; the prototype will not combine them into personalised legal advice.

### Reasoning

- Two selections accommodate a main issue and an overlapping concern while keeping results understandable and testable.
- The limit discourages unfocused selection, controls the number of result combinations, and avoids implying that the prototype can assess a whole legal situation.
- Separate results preserve the connection between each selected scenario and its general guidance without inferring how the issues legally interact.

### Refined problem statement

Leaseholders and park-home owners in England and Wales may seek help while dealing with a stressful and unfamiliar housing problem. They may not know the legal term for their issue, which information is relevant, or what they can safely do next. This can make it difficult to navigate guidance confidently and may lead them to irrelevant information or no action at all.

They need a clear, accessible, and privacy-conscious way to recognise or describe their situation, reach broadly relevant guidance, and understand a safe next step—including when no suitable route can be identified—without receiving personalised legal advice.

### V1 response to the problem

- Use a small hybrid journey: users select up to two plain-language scenarios or take a mutually exclusive free-text route when unsure or unrepresented.
- Return broad topic signposting and safe next steps, with separate results for overlapping issues and an honest fallback for unsupported or unclear enquiries.
- The next-step content, supported topics, scenarios, tenure scope, and free-text categorisation method still require decisions.

## 2026-08-30 — Exploring tenure scope for V1

### Options considered

- Support leaseholders only.
- Support park-home owners only.
- Support both audiences, separated by an initial tenure question and a limited scenario set for each.

### Leaseholders only

- This aligns most directly with the exercise wording about categorising a leasehold problem and with the main LEASE service identity.
- It reduces content, legal, interface, and testing scope compared with supporting both audiences.
- A narrower audience makes scenario wording and next steps easier to verify, but leasehold itself remains broad and still requires a deliberately small topic set.
- Park-home visitors would need a clear out-of-scope route rather than being allowed into an unsuitable leasehold journey.
- The main challenge is that excluding park-home owners conflicts with the current broad problem statement and reduces the prototype's usefulness to the full service audience.

### Park-home owners only

- This creates a distinct and potentially manageable journey with its own scenarios and guidance.
- It is less aligned with the exercise's explicit reference to a leasehold problem unless the brief permits choosing either LEASE audience.
- Park-home law and terminology are not simply a smaller version of leasehold, so the content still requires separate verification and safety boundaries.
- The narrower focus is testable, but choosing it would need a clear reason because it leaves the exercise's named leasehold use case unsupported.

### Both audiences with an initial tenure question

- This aligns with the full audience described for the Leasehold Advisory Service and retains the current problem-statement scope.
- Separating the journeys is safer than combining both legal contexts into one taxonomy.
- It approximately doubles scenario research, result content, fallback behaviour, and acceptance testing, even if each branch is small.
- The initial question introduces a new risk: some users may not know their tenure or may have a shared-ownership or otherwise unclear situation.
- Breadth may make the prototype superficially useful to more people while leaving each audience with weaker coverage.

### Current recommendation and challenge

- Recommend leaseholders only for V1 because it aligns most directly with the confirmed exercise wording and provides the best balance of usefulness, safety, and manageable scope.
- This recommendation is only safe if the interface clearly excludes and redirects park-home enquiries and the leasehold topic set is still tightly limited.
- If both audiences are mandatory, use an initial separation question with an explicit “I’m not sure” route; do not force uncertain users into either legal context.
- Selecting leaseholders only would require revising the confirmed problem statement so that it no longer promises support for park-home owners.
- No tenure option has been confirmed, so `plan.md` remains unchanged.

## 2026-08-30 — Leaseholder-only audience confirmed for V1

### Decision

- V1 will support leaseholders in England and Wales only.
- Park-home owners are deliberately outside the supported V1 audience.
- Park-home users must be clearly told that the prototype does not cover their situation and directed to the appropriate service.

### Reasoning

- A leaseholder-only scope keeps the guidance and scenarios within one legal context.
- It reduces the risk of confusing separate leasehold and park-home frameworks.
- It makes the content, verification, implementation, and testing scope manageable while allowing useful depth for the supported audience.
- The final leasehold topic and scenario list remains undecided.

### Planning impact

- The problem statement must refer only to leaseholders rather than promising support for both tenure groups.
- Park-home support and content are deliberately excluded from V1, but safe redirection remains part of the required journey boundary.

## 2026-08-30 — Exploring the V1 topic and scenario list

### Evidence and limitation

- Current official LEASE guidance provides direct routes for service charges and major works, ground rent, repairs, building-management problems, and lease extensions.
- These routes provide a credible basis for safe signposting, but no enquiry-volume or user-research data has yet been supplied. “Common” currently means prominent, recognisable needs represented in the official guidance, not empirically proven demand.

### Recommended internal topics

- `COSTS_AND_CHARGES`
- `REPAIRS_AND_BUILDING_MANAGEMENT`
- `LEASE_EXTENSION`

### Candidate user-facing scenarios

- “I do not understand or agree with a service charge or major works bill.” → `COSTS_AND_CHARGES`
- “I have a question about ground rent or another fee from my landlord or managing agent.” → `COSTS_AND_CHARGES`
- “My building needs repairs, or I am unsure who should arrange them.” → `REPAIRS_AND_BUILDING_MANAGEMENT`
- “I am unhappy with how my building is being managed.” → `REPAIRS_AND_BUILDING_MANAGEMENT`
- “I want to extend my lease or understand how the process works.” → `LEASE_EXTENSION`

### Evaluation and trade-offs

- The scenarios use words users are likely to encounter on bills, correspondence, or the LEASE site, while avoiding procedural terms such as Section 20, forfeiture, enfranchisement, and statutory route.
- Useful overlaps remain: major works can involve both charges and repairs; poor repairs can also be a management problem; ground rent can interact with lease extension. The two-selection rule represents these without merging the results.
- Each scenario maps to a current official LEASE guidance route, allowing a safe next step without the prototype deciding the user's rights or interpreting their lease.
- Three topics and five scenarios provide useful depth and keep content verification manageable, but deliberately omit several legitimate leasehold needs.
- A fourth internal topic for lease rules and permissions was considered. It could cover alterations, subletting, and pets, but one scenario would conceal several different rules and next steps. It is better omitted from the initial list unless the scope is expanded deliberately.
- Buying and selling was also considered but omitted because buyers may not yet be leaseholders and because the combined journey introduces separate professional-advice and process needs.
- A generic “dispute” topic is not recommended: disputes usually concern an underlying issue such as charges, repairs, or management and would overlap with nearly every topic.

### Direct fallback candidates

- Immediate danger, urgent fire or building-safety concerns, threatened eviction or forfeiture, active court or tribunal proceedings, and imminent legal deadlines.
- Requests to interpret a specific lease, notice, bill, evidence, or the user's legal rights.
- Shared ownership, buying the freehold, right to manage, buying or selling, subletting, alterations, neighbour disputes, and other intentionally unsupported leasehold topics.
- Park-home, renting, freehold, unclear-tenure, or other out-of-audience enquiries.
- Free text that is unclear, low-confidence, unsupported, or contains more issues than the V1 result can safely represent.

### Open decision

- The three-topic, five-scenario set is recommended but not confirmed.
- The exact fallback destinations and next-step content still require separate decisions.
- `plan.md` remains unchanged until the final list is confirmed.

## 2026-08-30 — Alternative V1 topic and scenario sets

### Set A — Minimal and safest

Internal topics:

- `COSTS_AND_CHARGES`
- `REPAIRS_AND_BUILDING_MANAGEMENT`
- `LEASE_EXTENSION`

User-facing scenarios:

- “I do not understand or agree with a service charge or major works bill.”
- “My building needs repairs, or I am unsure who should arrange them.”
- “I am unhappy with how my building is being managed.”
- “I want to extend my lease or understand how the process works.”

Evaluation:

- Very clear, easy to test, and maps directly to verified official guidance.
- The repairs/management overlap makes limited multi-selection useful.
- It has the smallest content and result surface, but omits ground rent and everyday questions about lease restrictions.
- Best if predictability and depth are prioritised over coverage.

### Set B — Balanced core

Internal topics:

- `COSTS_AND_CHARGES`
- `REPAIRS_AND_BUILDING_MANAGEMENT`
- `LEASE_EXTENSION`

User-facing scenarios:

- “I do not understand or agree with a service charge or major works bill.”
- “I have a question about ground rent or another fee from my landlord or managing agent.”
- “My building needs repairs, or I am unsure who should arrange them.”
- “I am unhappy with how my building is being managed.”
- “I want to extend my lease or understand how the process works.”

Evaluation:

- Adds meaningful financial coverage without introducing another internal topic.
- Intentional overlaps include repairs with major-work charges, management with repairs, and ground rent with lease extension.
- All scenarios have direct official guidance routes and remain reasonably plain-language.
- The ground-rent/other-fee wording is broader than the other scenarios and needs example testing.
- Best balance of coverage, safe signposting, and manageable V1 scope.

### Set C — Broader everyday coverage

Internal topics:

- `COSTS_AND_CHARGES`
- `REPAIRS_AND_BUILDING_MANAGEMENT`
- `LEASE_EXTENSION`
- `LEASE_RULES_AND_PERMISSIONS`

User-facing scenarios:

- The five scenarios from Set B.
- “I want to change or rent out my home and need to know whether I need permission.”

Evaluation:

- Covers an additional recognisable need and remains within four topics and six scenarios.
- It makes multi-selection useful where permission, management, and fees overlap.
- The additional scenario contains two distinct activities whose rules depend heavily on the individual lease, increasing the risk of overgeneralisation.
- Safe results would need separate alterations and subletting links, cautious language, and a stronger professional-advice fallback.
- It offers broader coverage but has the greatest content, result, and testing complexity.

### Comparative conclusion

- Set A is easiest to make safe but may feel noticeably incomplete.
- Set B is the current recommendation because it adds useful breadth without adding a new legal-content area.
- Set C is viable only if permission-related guidance is important enough to justify more branching and stronger legal boundaries.
- No set has been selected, so `plan.md` remains unchanged.

## 2026-08-30 — Set B refined before confirmation

### Direction

- Set B is preferred but not yet confirmed.
- The broad “ground rent or another fee” scenario is narrowed to ground rent demands.
- All scenarios are rewritten as complete, plain-language statements from the user's perspective.

### Refined user-facing scenarios

- “I have received a service charge or major works bill that I do not understand or think is fair.” → `COSTS_AND_CHARGES`
- “I have received a ground rent demand and want to understand what to check.” → `COSTS_AND_CHARGES`
- “My building needs repairs, and I am unsure who is responsible for arranging them.” → `REPAIRS_AND_BUILDING_MANAGEMENT`
- “I am unhappy with how my building is being managed and want to know what I can do next.” → `REPAIRS_AND_BUILDING_MANAGEMENT`
- “I want to extend my lease and understand how the process works.” → `LEASE_EXTENSION`

### Proposed result deduplication

- Results are grouped by unique internal topic, so selecting two scenarios from the same topic produces one topic result card rather than two duplicate cards.
- The card retains and displays both selected scenarios so the user's concerns are not hidden.
- Scenario-specific guidance and next steps remain distinct within the card; only repeated topic headings, explanations, links, and fallback content are removed.
- If both scenarios point to the same next step, it is shown once. If they require different guidance, each route is labelled by the scenario that produced it.
- Scenarios mapped to different topics continue to produce separate topic cards and are never combined into a personalised conclusion.

### Trade-off

- Topic-level grouping reduces repetition and keeps the result page easier to scan.
- It requires the result model to preserve both the internal topic and the originating scenario so deduplication does not discard relevant guidance.
- Set B and this deduplication behaviour remain unconfirmed; `plan.md` is unchanged.

## 2026-08-30 — Refined Set B confirmed

### Decision

- Refined Set B is the V1 topic and scenario list.
- The internal topics are `COSTS_AND_CHARGES`, `REPAIRS_AND_BUILDING_MANAGEMENT`, and `LEASE_EXTENSION`.
- The five refined plain-language scenarios and their mappings are confirmed.
- Topic-level result deduplication is confirmed.

### Deduplication boundary

- Two selected scenarios mapped to the same internal topic produce one topic result card that retains both originating scenarios.
- Repeated topic content is shown once, while distinct scenario-specific guidance remains labelled separately.
- Scenarios mapped to different topics remain separate results.
- Grouping never combines the user's circumstances into a personalised legal conclusion.

### Remaining decision

- The content and number of next steps within each result have not been decided.

## 2026-08-30 — Exploring result-card structure and next-step limits

### Options compared

#### One primary next step only

- Provides the clearest and lowest-load result and is easiest to verify and maintain.
- It can appear more certain than the prototype is and may be unhelpful when the primary route does not fit or the user needs escalation.
- It works best only when each scenario has one authoritative, broadly safe guidance route.

#### One primary next step plus a conditional alternative

- Keeps a clear recommended starting point while supporting a defined exception, escalation, or fallback.
- It offers the best balance of clarity, safety, cognitive load, and maintainability for V1.
- The condition must be objective and concise, such as receiving formal papers or facing a stated deadline; it must not assess legal merits or recommend a personalised legal strategy.
- Conditional content adds verification and maintenance work but remains bounded.

#### Several possible next steps

- Covers more circumstances but shifts the burden of choosing the correct legal route back to the user.
- Longer lists reduce clarity, increase cognitive load, and can imply that the prototype has assessed several legally suitable options.
- Every route, condition, and link increases content-review and maintenance requirements.
- This is not recommended for V1.

### Recommended next-step limit

- Default to one primary next step per originating scenario plus no more than one conditional escalation or fallback for the topic card.
- A card produced from one scenario therefore shows one primary step and, only when relevant, one conditional alternative.
- A deduplicated card produced from two scenarios in the same topic may show up to two clearly labelled primary steps, one for each selected concern, while showing any shared escalation or fallback once.
- Do not present an unranked menu of possible legal actions.

### Proposed result-card structure

1. **Suggested topic:** “This may relate to [plain-language topic].”
2. **Why it may be relevant:** a short, general explanation based only on the selected scenario or categorised text.
3. **What the user selected:** display the originating scenario or scenarios so the result is traceable and correctable.
4. **What to do next:** one verified primary guidance step per originating scenario, with duplicated steps shown once.
5. **Conditional escalation or fallback:** optional, shown only for a clear condition and never framed as a personalised conclusion.
6. **“This doesn’t match”:** return to scenario selection, or allow the free-text user to revise their description or use the fallback route.

### Language and safety boundaries

- Prefer “This may relate to…”, “This guidance may help you understand…”, and “If this applies…” rather than declaring the user's category, rights, or correct legal action.
- Explanations may describe why the selected words or scenarios map to a topic, but must not interpret a lease, evidence, notice, or legal position.
- Primary and conditional routes must use current, verified guidance or an approved escalation destination.
- The structure and next-step count remain unconfirmed, so `plan.md` is unchanged.

## 2026-08-30 — Result-card structure confirmed

### Decision

- Each originating scenario has one primary next step and no more than one conditional alternative or escalation.
- A deduplicated card may contain up to two labelled primary steps, one for each selected scenario, with shared content displayed once.
- The confirmed card layout contains: suggested topic, why it may be relevant, selected scenario or scenarios, next step, optional escalation or fallback, and a “This doesn’t match” action.

### Conditional-escalation boundary

- Escalation is phrased as an objective “if” condition.
- The prototype does not infer that the condition applies to the user and does not automatically escalate based on their scenario or free text.
- The condition must not assess legal merits or imply a personalised legal recommendation.

### Remaining content work

- The exact verified guidance wording and links for each scenario remain undecided.

## 2026-08-30 — Official signposting content researched

All sources below were verified on **30 August 2026** and are on the official LEASE website. This content is proposed, not yet confirmed.

### Service charge or major works bill

- **Internal topic:** `COSTS_AND_CHARGES`
- **Cautious explanation:** “This may relate to costs and charges because service charges and major-works bills concern amounts requested for managing, maintaining, or repairing a building. The relevant guidance depends on the demand, the work, and the lease; this result does not decide whether a charge is payable or reasonable.”
- **Primary next step:** “Read LEASE’s service-charges section to understand what service charges may cover, how demands are presented, and where to find guidance about high charges or major works.”
- **Primary source:** https://www.lease-advice.org/costs-and-charges/service-charges/
- **Objective conditional alternative:** “If you have received court papers or a formal forfeiture notice relating to unpaid charges, get urgent legal advice rather than relying on this result.”
- **Conditional source:** https://www.lease-advice.org/disputes/breaching-your-lease-and-forfeiture/

### Ground rent demand

- **Internal topic:** `COSTS_AND_CHARGES`
- **Cautious explanation:** “This may relate to costs and charges because LEASE provides separate guidance for ground-rent demand notices. This result can help you find what to check, but it does not decide whether an amount is owed.”
- **Primary next step:** “Read LEASE’s ground-rent demand-notices guide to understand the information a demand should contain, when payment can be requested, and the time limit covered by the guide.”
- **Primary source:** https://www.lease-advice.org/costs-and-charges/ground-rent/demand-notices/
- **Objective conditional alternative:** “If you have received court papers or a formal forfeiture notice relating to unpaid charges, get urgent legal advice rather than relying on this result.”
- **Conditional source:** https://www.lease-advice.org/disputes/breaching-your-lease-and-forfeiture/

### Repairs and responsibility

- **Internal topic:** `REPAIRS_AND_BUILDING_MANAGEMENT`
- **Cautious explanation:** “This may relate to repairs and building management because responsibility can depend on which part of the property is affected and what the lease says. This result does not decide who is responsible in your circumstances.”
- **Primary next step:** “Read LEASE’s repairs and maintenance guide to understand the usual areas of responsibility and the steps for requesting a repair.”
- **Primary source:** https://www.lease-advice.org/building-management/repairs/repairs-and-maintenance-in-leasehold-properties/
- **Objective conditional alternative:** “If you have already raised the issue with your landlord or managing agent and it remains unresolved, read LEASE’s guide for general information about routes for resolving the issue.”
- **Conditional source:** https://www.lease-advice.org/disputes/resolving-leasehold-disputes/landlord-managing-agent-disputes/

### Building-management problem

- **Internal topic:** `REPAIRS_AND_BUILDING_MANAGEMENT`
- **Cautious explanation:** “This may relate to repairs and building management because LEASE’s management guidance covers problems involving landlords, freeholders, or property managers. This result does not determine which complaint or legal route applies.”
- **Primary next step:** “Read LEASE’s leasehold-management-problems guide, starting with its steps for raising the issue and checking the relevant complaints process.”
- **Primary source:** https://www.lease-advice.org/building-management/management/leasehold-management-problems/
- **Objective conditional alternative:** “If you have already raised the issue with your landlord or managing agent and it remains unresolved, read LEASE’s guide for general information about routes for resolving the issue.”
- **Conditional source:** https://www.lease-advice.org/disputes/resolving-leasehold-disputes/landlord-managing-agent-disputes/

### Lease extension

- **Internal topic:** `LEASE_EXTENSION`
- **Cautious explanation:** “This may relate to lease extension. LEASE provides different guidance for flats and leasehold houses, and this result does not determine eligibility, cost, or which route is suitable.”
- **Primary next step:** “Open LEASE’s lease-extension section, choose the guidance for a flat or leasehold house, and read the relevant getting-started information before taking action.”
- **Primary source:** https://www.lease-advice.org/lease-extension/
- **Objective conditional alternative:** “If you have already served or received a formal lease-extension notice, or a document states a deadline, request advice from LEASE or a relevant professional rather than relying on this result.”
- **Conditional source:** https://www.lease-advice.org/about-us/get-in-touch/

### Content shared within deduplicated cards

- A deduplicated `COSTS_AND_CHARGES` card can share its topic heading, a short statement that service charges and ground rent are different kinds of payment, the court-papers/forfeiture condition, verification date, and “This doesn’t match” action.
- The service-charge and ground-rent primary links must remain separately labelled because they lead to different guidance.
- A deduplicated `REPAIRS_AND_BUILDING_MANAGEMENT` card can share its topic heading, the unresolved-issue conditional route to dispute guidance, verification date, and “This doesn’t match” action.
- The repairs and management primary links and explanations must remain separately labelled because responsibility for repairs and complaints about management are different concerns.
- `LEASE_EXTENSION` has only one confirmed originating scenario, so no within-topic deduplication is currently needed.

### Safety limitations and unsupported claims

- The service-charge scenario covers both ordinary service charges and major works. One deep link cannot safely represent every case, so the proposed primary route is the broader official service-charges section, which links onward to Section 20 guidance.
- The lease-extension scenario does not distinguish a flat from a leasehold house. Their official routes differ, so the prototype should not deep-link to the flat process or state eligibility without first knowing the property type; the general lease-extension section is the safe proposed route.
- Property-manager redress coverage differs between England and Wales. A redress-scheme link should not be presented as universally available without confirming jurisdiction and scheme membership, so the broader official dispute-resolution guide is used instead.
- None of the five scenarios supports deciding whether a charge is valid, who is legally responsible, whether a complaint will succeed, the best lease-extension route, or any other personalised conclusion.
- The wording and links remain subject to confirmation; `plan.md` is unchanged.

## 2026-08-30 — Official signposting content confirmed

### Decision

- The researched explanations, primary next steps, official sources, conditional alternatives, and deduplicated-card sharing rules are confirmed for V1.
- “Before considering formal action” is replaced with “for general information about routes for resolving the issue” to avoid directing legal strategy.
- Urgent-condition messages are general warnings displayed as objective “if” statements. The prototype does not infer that an urgent condition applies and does not trigger or personalise the warning from a scenario selection or free-text description.
- The official sources were verified on 30 August 2026 and must be rechecked before production use.

## 2026-08-30 — Exploring free-text classification

### Option 1 — Deterministic keyword and phrase rules

- Exact, local rules are predictable, private, easy to explain, and straightforward to unit test.
- They work well for high-signal phrases such as “service charge,” “ground rent demand,” “major works,” “managing agent,” and “extend my lease.”
- They can miss synonyms, spelling mistakes, indirect descriptions, negation, and context, while a single keyword can create an incorrect result if treated as conclusive.
- Rule lists can become difficult to maintain as exceptions and phrase combinations accumulate.
- Multiple matched rule groups can support overlapping results, and no match can safely fall back, but ambiguous weak matches are difficult to rank.

### Option 2 — Curated search or weighted term matching

- Terms and phrases contribute different weights to each confirmed topic, allowing several weak signals to form a useful match.
- This handles synonyms, partial matches, and overlapping topics better than exact rules while remaining local and reasonably explainable.
- A score is not a legal or statistical confidence measure and must not be shown as certainty to users.
- Weights and thresholds need a representative test set and ongoing review; small changes can alter borderline results.
- Low scores can fall back and two independently strong topic scores can produce two possible topics.

### Option 3 — AI/LLM classifier

- An LLM can understand indirect language, spelling variation, context, and multiple issues better than a small term list.
- It can still produce plausible but incorrect or overconfident classifications, and generated explanations may not reliably describe the real reason for a result.
- External processing introduces privacy, data-handling, cost, availability, and service-dependency questions.
- Model and prompt changes make behaviour less deterministic and regression testing more difficult.
- An LLM is not recommended for V1; it is a possible later improvement only after a labelled example set and privacy controls exist.

### Option 4 — Small hybrid of explicit rules and weighted matching

- Use explicit high-signal phrases for precise matches, then use a small weighted vocabulary for synonyms and supporting context.
- Add explicit unsupported and out-of-audience signals that route to fallback instead of competing with supported topics.
- This offers a better balance of flexibility, explainability, local privacy, and deterministic testing than the other approaches.
- It is more complex than phrase rules alone and still requires careful thresholds, negative examples, and maintenance of both phrase and weight lists.
- This is the current recommendation for V1.

### Proposed evidence model for the hybrid

- A **strong topic match** requires either one unambiguous high-signal phrase or several corroborating weighted terms; generic words such as “lease,” “landlord,” “problem,” or “bill” are never enough alone.
- Negated phrases, quoted text, and words used in an unrelated context must be included in negative tests rather than assumed to be positive evidence.
- Matched signals are retained as an internal reason for testing and explanation, but no numeric score is shown to the user.
- Exact weights and score thresholds should be selected using representative examples rather than invented before the vocabulary and test corpus exist.

### Proposed one-topic, two-topic, and fallback policy

- **Return one topic** when exactly one topic has strong evidence and any other topic evidence is clearly below the supported threshold.
- **Return two possible topics** when two topics each have independent strong evidence, or when the two leading supported matches are deliberately treated as too close to choose safely. Present separate cautious result cards and do not claim which is primary.
- **Return fallback** when no topic has strong evidence; the text is blank, too short, or only generic; more than two topics appear materially supported; supported and unsupported meanings cannot be separated safely; or explicit out-of-scope content is detected.
- Urgent wording, court or tribunal proceedings, formal notices, or deadlines must not be automatically inferred into legal advice. The ordinary result may display the confirmed general warning, while clearly high-risk or unsupported requests use the approved fallback route.
- If one supported issue and one clearly unsupported issue are present, return the supported topic only if it can be separated without implying the unsupported issue was assessed; otherwise use fallback.

### Handling and presentation boundaries

- User-facing wording remains “This may relate to…” and never includes a numeric confidence score.
- Explanations identify general matched subject matter, such as charges or repairs, without interpreting facts or legal documents.
- Processing should be local for V1, and enquiry text should not be stored or sent to an external service unless a later decision explicitly changes the privacy model.
- The classifier must be tested with clear positives, synonyms, misspellings, negation, overlapping issues, unsupported leasehold topics, other tenures, personal information, and adversarial or meaningless text.
- No method has been confirmed, so `plan.md` remains unchanged.

## 2026-08-30 — Challenging the hybrid classifier recommendation

### Smallest explicit-rules version

- Normalise case, punctuation, spacing, and a small number of known spelling variants.
- Maintain curated high-signal phrases and synonyms for the five confirmed scenarios.
- Require meaningful phrase or context combinations rather than matching generic single words.
- Return one topic when only one topic's rules match, two possible topics when two independently match, and fallback for no match, more than two matches, or explicit unsupported content.
- No scoring, user-visible confidence, tuning data, or arbitrary margin is required.

### Smallest weighted-hybrid version

- Keep the same high-signal rules, then add lower-weight terms and synonyms that accumulate a score for each topic.
- Define a minimum supported score, a margin for choosing one topic, a closeness rule for returning two, and a fallback threshold.
- Preserve matched terms so results can be explained and tested.
- Calibrate every weight and threshold against labelled examples rather than intuition.

### What weighting adds

- It can recognise indirect descriptions where no single phrase is decisive but several related terms appear together.
- It can distinguish strong phrases from weak supporting vocabulary and expose two independently supported topics.
- It may reduce the number of false fallbacks for users who describe a known issue without using expected wording.

### New failure modes introduced by weighting

- Scores can create false precision even though they are not probabilities or legal confidence measures.
- Generic or repeated terms can accumulate enough weight to produce an unsupported match, especially in long input.
- Closely related synonyms may be double-counted and dominate a score.
- Small weight or threshold changes can unexpectedly alter borderline classifications.
- Negation and quoted or hypothetical wording can still match unless explicitly handled.
- Tuning and evaluating on the same small example set can overfit the prototype while making results appear systematic.
- Explanations become less direct because the result may depend on several weak signals rather than one recognisable phrase.

### When to use explicit rules instead

- The five scenario vocabularies remain small and distinguishable.
- Representative enquiries usually contain at least one recognisable phrase or synonym.
- Weighted matching changes very few fallbacks or mainly introduces false positives.
- There is not enough labelled data to tune thresholds separately from evaluating them.
- Every supported match needs to be understandable from one or two clear signals.
- Under the current three-topic scope, explicit phrase and synonym rules are the revised default recommendation unless evidence shows a meaningful recall problem.

### Minimum evidence before adding weighting

- Use at least 48 labelled examples: 24 for calibration and 24 held back unchanged for evaluation.
- Each half should contain four single-topic examples for each of the three topics, two examples for each of the three topic pairs, and six fallback examples.
- Across the full set, include direct phrases, indirect wording, synonyms, common spelling errors, negation, misleading keyword mentions, long descriptions, unsupported leasehold issues, other tenures, and meaningless input.
- Weighting is justified only if it recovers a meaningful group of valid indirect enquiries that explicit rules send to fallback without materially increasing incorrect supported matches on the held-back set.

### Revised recommendation

- Start with explicit phrase and synonym rules for V1.
- Add weighting only if the representative corpus demonstrates that the explicit rules create unacceptable false fallbacks and the weighted version improves held-back results without weakening safety.
- No method has been confirmed, so `plan.md` remains unchanged.

## 2026-08-30 — Explicit free-text rules confirmed

### Decision

- V1 will classify free text using small, curated phrase and synonym groups for the three confirmed topics.
- The method was selected because it is more predictable, explainable, maintainable, and testable at this scale.
- A safe fallback is preferred to weighted scoring that could turn weak signals into an incorrect supported result.

### Output rules

- Return one topic when one supported topic's phrase group matches clearly.
- Return two possible topics when two supported topic groups match independently.
- Return fallback for unclear, conflicting, negated, unsupported, meaningless, or otherwise unsafe-to-interpret input.
- Do not return more than two topics.
- Do not use weighting, numeric confidence scores, or an LLM in V1.

### Testing boundary

- Use a small representative example set covering each supported topic, two-topic overlaps, synonyms, common misspellings, negation, and fallback cases.
- Include false-positive checks for generic terms and unsupported leasehold or tenure enquiries.
- Each supported result must be traceable to the phrase or synonym rule that matched.

### Deliberately deferred improvements

- Weighted matching may be reconsidered later if representative evidence shows that explicit rules create too many valid fallbacks without a corresponding safety benefit.
- An LLM classifier may be reconsidered later only with a labelled evaluation set, privacy controls, deterministic fallback behaviour, and a clear benefit over local rules.

## 2026-08-30 — Planning documentation restructured

### What changed

- `plan.md` was shortened to focus on the problem and useful outcome, confirmed V1 scope and assumptions, a provisional ordered task breakdown with “done means” criteria, and key risks.
- Exact scenario wording, result explanations, primary-step copy, conditional warnings, official URLs, source-verification dates, deduplicated-card content, and content limitations moved to the new maintained `content.md` file.
- Detailed comparisons, rejected alternatives, trade-offs, and chronological decisions remain in `running-notes.md`.

### Preservation and boundaries

- No confirmed product decision was changed.
- The scenario-to-topic scope remains in `plan.md` through stable scenario IDs and short need labels; `content.md` owns the exact user-facing wording.
- The confirmed explicit phrase-and-synonym classifier, one/two/fallback outcomes, exclusions, and deferred weighted/LLM options remain in `plan.md`.
- The ordered task breakdown is explicitly provisional until the application architecture and technical constraints are confirmed.
- No production code was written.

## 2026-08-30 — Exploring the smallest maintainable architecture

### Constraints used for the comparison

- The exercise asks for a small working prototype and says that a smaller, well-understood slice is preferable to a large generated codebase.
- The organisation's production stack is Wagtail/Django and React. Mirroring it is encouraged but not mandatory.
- The prototype must show how frontend and backend, or an equivalent separation, fit together.
- V1 has only five scenarios, three internal topics, deterministic local rules, static verified content, and no accounts, saved enquiries, uploads, case history, or open-ended advice.
- Enquiry text must not be persisted or unnecessarily logged. The system needs only request-time processing.
- The architecture should preserve one authoritative implementation of classification, validation, deduplication, and result assembly.

### Summary comparison

| Option | Implementation complexity | Privacy and data flow | Testing | Maintainability |
| --- | --- | --- | --- | --- |
| React + small Django JSON API | Medium: two runtimes, an API contract, integration and error states | Free text crosses the same-origin network boundary to Django but is not stored | Strong separation: pure classifier tests, API contract tests, React interaction tests, one end-to-end path | Clear responsibilities and close to the stated production stack, but more dependencies and integration points |
| Django-rendered frontend and backend | Lowest full-stack complexity: one runtime, form posts and templates | Free text is posted to Django and held only for the request | Simple: pure classifier, form/view and rendered-response tests | Smallest server architecture and easiest single-source content model, but does not use React |
| React-only client-side triage | Lowest operational complexity: no server request or backend runtime | Strongest V1 privacy: enquiry text stays in the browser | Pure classifier and component tests are straightforward; browser journey still needs testing | Simple now, but rule/content governance and later server integration require a larger boundary change |

### Option 1 — React frontend with a small Django JSON API

#### Smallest viable shape

- A React application owns the interactive journey and rendering.
- Django exposes only the small read/triage boundary the journey needs: scenario configuration and a triage submission. Exact endpoint names remain an implementation detail.
- The Django domain layer holds version-controlled scenario definitions, approved result content, phrase/synonym rules, validation, topic matching, fallback policy, and deduplication.
- The API returns structured outcomes; it does not return generated legal prose or a numeric confidence score.
- The React build and Django API should be presented from the same origin in the runnable application. This avoids making CORS configuration part of the prototype. A frontend development proxy may be used locally.
- There is no application database, model, admin area, authentication, session-dependent journey, or persistence.

#### Responsibilities

**React frontend**

- Presents scope, privacy guidance, scenarios, free text, validation messages, result cards, fallbacks, and the “This doesn't match” action.
- Manages transient view state, the two-selection interaction, mutual exclusivity, loading/error states, focus, and accessible announcements.
- Performs immediate interface validation for usability, while treating server validation as authoritative.
- Does not contain a second classifier, duplicate result copy, or decide legal-content conditions.

**Django backend**

- Validates input mode, allowed scenario IDs, the maximum of two selections, mutual exclusivity, free-text length, and malformed requests.
- Runs the explicit phrase-and-synonym classifier and returns one topic, two topics, or fallback.
- Applies topic deduplication and assembles the approved scenario-specific and shared card content.
- Processes text in memory for the request only and does not store or log request bodies.
- Provides predictable invalid-input and service-error responses.

#### Strengths

- Mirrors the two main technologies named in the exercise while keeping each part narrow.
- Gives one authoritative server-side implementation of safety rules and content assembly.
- Separates the domain logic from both HTTP handling and React components, so classifier tests do not require a browser or database.
- Creates a clear data contract that could later support another interface without moving classification rules into it.
- Keeps free-text processing under the service's control rather than using an external classifier.

#### Challenges and failure modes

- The same user outcome can be delivered with less code using Django templates or client-only React, so the API must not grow merely to justify the backend.
- Two package ecosystems, development commands, build steps, and test suites increase setup and maintenance.
- API loading, timeout, invalid-response, and unavailable-service states must be designed and tested.
- If frontend and backend are run on different origins, CORS and CSRF configuration become avoidable complexity; same-origin delivery should be the default.
- Sending free text to Django is less private than processing it entirely in the browser, even when nothing is persisted. Request-body logging and error reporting must be explicitly avoided.
- Scenario validation exists in both layers for different reasons: frontend validation improves interaction, while backend validation enforces the contract. Any duplicated constants must be minimised or supplied by backend configuration.

### Option 2 — Django-rendered frontend and backend

#### Smallest viable shape

- One Django application renders the scenario/free-text form and result cards using templates.
- A normal form submission runs the same pure triage service and renders the result page.
- Native form controls and server-side validation provide the complete journey. A small amount of optional JavaScript can improve the two-selection limit and mutually exclusive “I'm not sure” behaviour without becoming required for correctness.
- Static Python or JSON data holds the approved content and rules. No database is required for application data.

#### Strengths

- This is the smallest maintainable full journey: one runtime, one server, no API schema, no frontend build, and one source of content and business rules.
- Server-rendered native HTML supports a robust keyboard and screen-reader baseline and can continue to work without JavaScript.
- Validation, classification and content remain together without duplicating a client contract.
- Django's request, form, template and test tools are sufficient for this scale.
- Deployment and local setup are simpler than a split React/Django build.

#### Challenges and failure modes

- It does not mirror the React part of the stated production stack.
- Selection feedback, conditional free-text display and results feel less immediate without a small enhancement script.
- Page reloads require deliberate focus placement, preservation of invalid values, and clear error summaries.
- The frontend/backend separation is architectural rather than technological: templates and view code must still be kept separate from the domain service.
- Adding a React application later would require introducing and stabilising a new API contract.

#### Challenge to the “too simple” objection

- The confirmed journey is fundamentally a small form and deterministic result. It does not require an SPA to be usable.
- This option still demonstrates a frontend, request validation, domain logic, rendering, privacy choices, and automated tests.
- If minimum implementation risk were the only priority, this would be the recommendation.

### Option 3 — React-only frontend with client-side triage

#### Smallest viable shape

- A React application contains a pure triage module plus version-controlled scenario, content and phrase-rule data.
- The UI calls the pure module directly. No enquiry or selection is transmitted or persisted.
- UI state is held in memory; refresh starts the journey again.

#### Strengths

- Strongest privacy boundary: free text never leaves the browser.
- No backend runtime, HTTP contract, database, server failure state, CORS, or request logging risk.
- The classifier can still be independently unit-tested because it is a pure module rather than component logic.
- Static deployment and local setup can be small.

#### Challenges and failure modes

- It omits Django despite the brief encouraging the production stack and the repository already separating frontend and backend areas.
- The browser receives all rules and approved content. That is not a security problem here, but it means every content/rule change requires a frontend build and deployment.
- A future server-owned content or classification process would require introducing a new boundary and changing data flow.
- The complete journey depends on JavaScript; accessibility needs explicit attention to focus, dynamic announcements, browser navigation, and error recovery.
- Frontend telemetry or third-party error reporting could accidentally capture enquiry state, so none should receive user text.
- A backend would add no honest value if it merely echoes a client-side result; the architecture should remain client-only rather than inventing a token endpoint.

### Additional options challenged

#### Django host with a React “island”

- Django could render the page shell and initial configuration while React controls only the triage journey, posting to a same-origin Django endpoint.
- This avoids a fully separate deployment and makes the initial page usable as a server response.
- It is best understood as a deployment refinement of Option 1, not a fourth domain architecture.
- It still has two toolchains and adds a boundary between the Django shell and React-owned page. Server-rendering part of the same journey as well would risk duplicate presentation logic.
- If React is selected, a single React-owned journey mounted in a Django-served shell is reasonable; multiple small islands are unnecessary for V1.

#### Django templates with HTMX or another interaction library

- This can add partial page updates while retaining server-rendered HTML.
- For one form and one result journey, it introduces another dependency and request mode without removing the need for normal server validation and full-page fallback.
- A very small plain enhancement script is easier to justify than an additional interaction framework.

#### Static HTML with small vanilla JavaScript

- This is smaller than React-only and retains browser-local privacy.
- At five scenarios it is viable, but manual DOM/state management can become less structured than a small React component tree.
- It neither mirrors the encouraged stack nor improves the product boundary enough to displace Django-rendered pages as the simplest server option or React-only as the simplest client option.

#### Wagtail or headless Wagtail with React

- Wagtail would add an editor UI, publishing workflow, page/snippet models, permissions and managed content.
- Those capabilities require a database, migrations, admin setup and a content-governance design.
- V1 has a tiny, verified, version-controlled content set and explicitly excludes a full CMS. Adding Wagtail would expand the slice without solving a confirmed user need.
- It becomes useful later only if non-developers must edit and publish guidance, revision history and approval workflow are defined, and link-verification/content-review responsibilities can be enforced.

#### A full-stack React framework

- A React framework could combine server and client rendering in one JavaScript project.
- It would not mirror the stated Django backend and would introduce framework conventions that the small deterministic journey does not need.
- It is not a better fit than either React-only or the minimal same-origin React/Django option.

### Do DRF, Wagtail or a database add value in V1?

#### Django REST Framework

- DRF provides useful serializer validation, consistent API responses, authentication/permission integrations, browsable APIs and API testing helpers.
- V1 needs only a very small, internal JSON contract with no models, authentication, pagination, relationships or public API lifecycle.
- Plain Django request handling and `JsonResponse`, with explicit small validation functions and tests, are enough. Adding DRF would introduce a dependency and abstraction layer without removing meaningful V1 complexity.
- Reconsider DRF if the API grows to multiple resources, complex nested validation, authentication/permissions, versioning, or multiple independent clients.

#### Wagtail

- Wagtail is valuable for editor-managed page/snippet content, workflow and publishing.
- It is not justified for five curated scenarios whose legal-signposting copy is currently reviewed in source control.
- Reconsider it only when content ownership and editorial workflow—not stack resemblance alone—require a CMS.

#### Database

- No confirmed V1 behaviour requires persistence. Scenarios, approved content and matching rules are small configuration data that benefit from reviewable source-control changes.
- Storing enquiries would create retention, access, deletion and breach risks while conflicting with the privacy-minimisation decision.
- A database would also bring models, migrations, fixtures and test setup without improving classification.
- Do not create application models or store enquiry text. Reconsider persistence only for a separately approved need such as managed content workflow or aggregate privacy-reviewed metrics.

### Recommendation to consider

Use **a same-origin React frontend with a minimal plain-Django JSON boundary**, as the smallest version of Option 1:

- React owns the complete interactive and accessible journey.
- Django owns authoritative input validation, explicit phrase/synonym classification, topic deduplication, fallback decisions and approved result assembly.
- Keep the triage logic as pure Python called by a thin Django view.
- Keep approved content and rules in version-controlled structured files or modules, not a database.
- Use plain Django JSON responses; do not add DRF, Wagtail, authentication, application persistence, external services or enquiry logging.
- Serve the runnable frontend and API from one origin so CORS is not part of the product.
- Test the pure domain logic most heavily, then the small HTTP contract, React states and one complete browser journey.

This is not the fewest-lines option: Django-rendered templates are smaller. It is recommended because the extra boundary is still narrow, maps cleanly to the production technologies named in the brief, and gives both sides a real responsibility. If the two-runtime setup threatens completion or cannot be confidently maintained, simplify to Django-rendered templates rather than adding framework layers or cutting tests.

### Remaining decision

- No architecture is confirmed. `plan.md` remains unchanged.
- Confirm or reject the minimal same-origin React + plain-Django recommendation before the provisional task sequence is finalised.

### Official framework references checked

- Django templates: https://docs.djangoproject.com/en/dev/topics/templates/
- Django testing: https://docs.djangoproject.com/en/dev/topics/testing/overview/
- Django `JsonResponse`: https://docs.djangoproject.com/en/dev/ref/request-response/#jsonresponse-objects
- Django REST Framework serializers: https://www.django-rest-framework.org/api-guide/serializers/
- Django REST Framework testing: https://www.django-rest-framework.org/api-guide/testing/
- Wagtail getting started and database-backed content models: https://docs.wagtail.org/en/stable/getting_started/tutorial.html
- Wagtail integration and installed components: https://docs.wagtail.org/en/stable/advanced_topics/add_to_django_project.html
- React client rendering: https://react.dev/reference/react-dom/client

## 2026-08-30 — Django versus FastAPI backend exploration

### Question explored

- Would React with FastAPI be smaller or more maintainable than React with a plain Django JSON API?
- Are there useful middle-ground or alternative Python API options?
- No architecture has been confirmed, so this comparison does not change `plan.md`.

### Constant boundaries for a fair comparison

Both variants would use the same product and privacy boundaries:

- React owns the interactive journey and accessible presentation.
- The backend owns authoritative validation, phrase/synonym classification, deduplication, fallback policy and approved result assembly.
- The backend has one small configuration/read boundary and one triage submission boundary; it is not a general-purpose public API.
- Free text is processed in memory for the request only and is not stored or written to application logs.
- There is no application database, authentication, account, external classifier or content-management interface.
- The classifier remains a pure synchronous Python function, independent of the web framework.
- Frontend and backend should be delivered from one origin, regardless of framework, to avoid unnecessary CORS configuration.

### Direct comparison

| Area | Plain Django | FastAPI |
| --- | --- | --- |
| Initial API code | More framework setup and some explicit JSON parsing/validation | Concise typed route and Pydantic request/response schemas |
| Validation | Small validation functions must be written deliberately | Request conversion, validation and schema generation are integrated |
| API documentation | Must be documented manually if required | OpenAPI schema and interactive documentation are generated automatically |
| Async/performance | More than adequate for a tiny CPU-local classifier | Strong async support, but V1 has no waiting I/O that benefits materially |
| React integration | Straightforward same-origin JSON and static build hosting | Straightforward JSON; static SPA hosting/fallback needs explicit setup |
| Testing | Pure unit tests plus Django's request/test client | Pure unit tests plus FastAPI/Starlette `TestClient`; HTTPX is an additional test dependency |
| Future production-stack fit | Directly matches the Django base used by Wagtail | Would remain a separate service or require migration to Django later |
| Framework surface | Larger general web framework, although most features remain unused | Smaller API-focused surface, but still brings FastAPI, Starlette, Pydantic and an ASGI server |

### React plus plain Django

#### What Django adds

- Direct alignment with the Django/Wagtail production foundation named in the exercise brief.
- A conventional same-origin application boundary with built-in request/response, middleware, static-file and test support.
- A future path to Wagtail-managed content without changing backend frameworks, if a genuine editorial requirement is later confirmed.
- The option to simplify all the way to Django-rendered templates without replacing the domain layer.

#### What remains manual

- Django's `JsonResponse` serialises output, but it does not define or validate an incoming JSON schema.
- The small triage request shape therefore needs explicit parsing and validation or a deliberately chosen schema library.
- API documentation and frontend/backend contract examples must be maintained in the repository rather than generated automatically.
- Django project settings, URL configuration and application structure are more ceremony than FastAPI needs for two endpoints.

#### Why the manual validation may still be acceptable

- V1 has only two mutually exclusive request modes: one or two known scenario IDs, or bounded free text.
- Important product validation cannot be delegated entirely to a generic schema system: maximum selections, mutual exclusivity, supported IDs, fallback safety and classification traceability are domain rules either way.
- A small explicit input parser can return a stable internal command before calling the pure triage function.
- The contract should be tested directly, keeping the web view thin.

### React plus FastAPI

#### What FastAPI adds

- Pydantic models provide typed request and response structures, data conversion, validation and generated schemas.
- OpenAPI and interactive API documentation are generated from the declared routes and models.
- Its test client makes JSON endpoint tests concise.
- For an API-first product with many contracts or independent consumers, these features reduce repeated schema work.

#### What it does not add for this V1

- It does not improve classification quality, legal safety, accessibility or privacy by itself.
- It does not remove the need for pure domain rules, representative classifier examples, fallback tests or React journey tests.
- Async support offers no meaningful architectural benefit when the work is a small in-memory deterministic function with no database or external service.
- Automatic documentation is useful developer support, but the prototype has one internal client and does not require a public API product.
- It does not make free-text transmission more private; logging, error reporting, body-size limits and retention still require explicit decisions.

#### New costs and failure modes

- It departs from the Django backend named in the exercise's preferred production stack.
- It introduces Pydantic, Starlette, an ASGI server and HTTPX-based testing as part of the maintained dependency surface.
- If Wagtail-managed content is later required, the team must operate FastAPI beside Django/Wagtail or migrate the endpoints and schemas.
- Generated validation errors and interactive documentation need deliberate production handling; internal schema detail should not replace plain-English UI errors.
- Serving the React build and SPA fallback from one origin is possible but requires an explicit hosting arrangement, just as it does with Django.

### Privacy and security comparison

- Neither server framework has the privacy advantage of React-only processing: both receive the user's free text.
- Both can avoid persistence and process the body only for the life of the request.
- Both require a maximum input length, generic user-facing failures, redaction-safe error handling and a rule that request bodies are not logged.
- With a public stateless triage endpoint and no cookie-authenticated state change, the main V1 risks are accidental logging, oversized or malformed input, unsafe rendering and abuse—not database access.
- The framework choice should not be presented as a privacy control; the data-flow and logging design are the controls.

### Testing comparison

Both should use the same testing pyramid:

1. Most tests target the pure classifier, validation rules, fallback policy and deduplication without HTTP.
2. A small set tests valid and invalid API contracts.
3. React tests cover selection behaviour, mutually exclusive free text, loading, errors, result cards and “This doesn't match.”
4. One or two browser tests cover the complete guided and free-text journeys.

FastAPI makes the HTTP contract more declarative. Django keeps the web layer consistent with the named stack. Neither changes where the majority of important tests belong.

### Other Python options

#### Django Ninja

- Django Ninja adds typed schemas, validation, generated API documentation and API-focused testing while remaining inside Django.
- It is the closest compromise if the API contract becomes large enough to justify FastAPI-style schemas but the application should remain Django-based.
- For one tiny submission contract, it adds another framework dependency and abstraction without enough repeated schema work to repay it.
- It should not be selected merely to avoid writing a small explicit validator.

#### Standalone Pydantic inside Django

- Django could use Pydantic only for request/response schemas while retaining plain Django views.
- This gains typed validation but requires custom binding and error translation, so it captures only part of FastAPI's integration while adding the same core schema dependency.
- It may become reasonable if the contract grows, but it is unnecessary for the confirmed two-mode input.

#### Flask or Starlette directly

- Both can produce a very small API, but request validation, error conventions and project structure would need additional decisions or dependencies.
- FastAPI already offers a stronger typed version of this minimal-API direction.
- Neither improves alignment or product scope enough to justify another comparison branch for V1.

### Revised recommendation

- Keep **React plus minimal plain Django** as the recommendation.
- FastAPI would be a reasonable choice if this were an API-first service, if several clients shared a growing typed contract, or if the implementation team could maintain it substantially more confidently than Django.
- Those conditions are not present in the confirmed V1. The backend is a thin adapter around a small pure domain function, and Django is explicitly named in the preferred production stack.
- Do not add DRF, Django Ninja or standalone Pydantic pre-emptively. Reconsider schema tooling only if explicit validation becomes difficult to understand or repeated across several endpoints.
- If even plain Django plus React is too much integration for the available scope, simplify to Django-rendered templates. Do not switch to FastAPI solely because its first endpoint is shorter.

### Official references checked

- FastAPI request-body models and validation: https://fastapi.tiangolo.com/tutorial/body-nested-models/
- FastAPI concurrency guidance: https://fastapi.tiangolo.com/async/
- FastAPI testing: https://fastapi.tiangolo.com/tutorial/testing/
- Django `JsonResponse`: https://docs.djangoproject.com/en/dev/ref/request-response/#jsonresponse-objects
- Django testing: https://docs.djangoproject.com/en/dev/topics/testing/overview/
- Django Ninja request parsing: https://django-ninja.dev/tutorial/step2/
- Django Ninja testing: https://django-ninja.dev/guides/testing/

## 2026-08-30 — Independent challenge of the React/Django boundary

### Method

- Two independent subagents challenged the proposed architecture before confirmation.
- The first examined hidden React/Django setup, same-origin, build, error-handling and testing complexity.
- The second examined whether validation, classification, deduplication and approved-content assembly should all belong in the backend.
- Neither subagent edited project files or saw the other's findings before reporting.

### Subagent 1 — Integration challenge

#### Hidden setup and build cost

- React/Django requires two runtimes, dependency files, version sets and test commands.
- Local development normally starts two processes. The smallest arrangement is for React to call a relative `/api` path and for the frontend development server to proxy it to Django; adding CORS is unnecessary.
- A production-like single-server build is not free. Hashed frontend assets, generated manifests or HTML, Django static-file discovery and client-route fallbacks require deliberate setup.
- The exercise excludes production deployment, so V1 should choose one reproducible evaluation path rather than building production infrastructure.
- The README must make both environments, commands, ports, proxy behaviour and the integrated journey easy to reproduce.

#### Hidden request and error-state cost

- A JSON POST requires an explicit CSRF decision. It should not become `csrf_exempt` merely to make local integration easier.
- React must handle loading, double submission, timeout, unavailable server, malformed or non-JSON responses, retry, and preservation of the user's current input.
- A previous request can finish after a later request and replace the newer result unless submissions are controlled.
- A fallback classification is a valid product outcome; an invalid request and an unavailable server are different states and must not be displayed as if the enquiry was assessed.
- Dynamic validation and results require focus management or announcements so keyboard and screen-reader users know that the state changed.

#### Hidden testing cost

- Mocked React tests can pass while the actual API contract, proxy or CSRF configuration is broken.
- The minimum credible test set becomes: pure domain tests, Django endpoint-contract tests, React interaction and error-state tests, and at least one real integrated guided journey plus one free-text/fallback journey.
- A built or proxied browser-to-Django path must be exercised; independent unit suites are not sufficient evidence that the application runs.

#### Integration failure examples

- The development proxy works but a built frontend calls the wrong origin.
- Django cannot locate hashed frontend assets.
- CSRF failures occur outside mocked tests.
- Frontend and backend disagree about IDs, selection limits or response shapes.
- A 500 HTML response leaves React stuck in a loading state because it expected JSON.
- An older submission overwrites the latest result.
- Visually rendered validation/results are not announced accessibly.
- Setup requires undocumented commands, environment variables or ports.

### Subagent 2 — Backend-responsibility challenge

The backend boundary is coherent only if “Django owns it” means pure backend domain modules own policy. The Django view itself should remain a thin HTTP adapter.

| Responsibility | Proposed owner | Reason |
| --- | --- | --- |
| Immediate interaction validation | React | Prevent a third selection, reveal free text and provide timely accessible feedback |
| Authoritative request validation | Backend domain/input layer | Direct requests can bypass React; limits and route exclusivity are product invariants |
| Phrase/synonym classification | Pure Python domain module | There must be one deterministic, directly testable implementation |
| Topic deduplication | Pure Python domain module | It is product policy and must preserve each originating scenario's distinct step |
| Fallback decision | Pure Python domain module | It depends on ambiguity, negation, unsupported input and the two-topic boundary |
| Approved guidance selection and assembly | Backend content/domain module | React should not independently map topic IDs to safety-sensitive copy or links |
| Card markup, focus and interaction | React | These are presentation and accessibility responsibilities |

React may mirror simple validation for usability, but it must not classify, choose a fallback, infer warnings, deduplicate topics or select legal-signposting content.

### Synthesised minimum API contract

#### Absolute minimum

One triage endpoint is sufficient for processing:

`POST /api/triage`

It accepts a discriminated request with exactly one valid shape:

- Guided route: `{"mode":"guided","scenario_ids":["ground-rent-demand"]}`
- Free-text route: `{"mode":"free_text","text":"My description"}`

The explicit `mode` avoids inferring intent from missing fields. The backend rejects unknown modes, both fields together, neither field, zero or more than two scenario IDs, duplicate or unknown IDs, blank text, and over-limit text.

The endpoint returns one of four distinct outcome classes:

1. `matched`: one or two already-deduplicated, presentation-ready topic cards using approved content;
2. `fallback`: a valid but unsupported, ambiguous or unsafe-to-classify enquiry with approved fallback content;
3. `invalid_request`: a stable code and safe field/general message for malformed input;
4. `unexpected_failure`: a generic response that does not claim the enquiry was assessed or reveal internals.

Rule IDs and matching traces can remain in the pure domain result for tests. They do not need to be exposed in the public response, and no confidence score is returned.

#### Minimum maintainable configuration boundary

- React needs the exact scenario IDs and approved user-facing statements before submission.
- To avoid manually duplicating them, either:
  - provide a small read-only configuration endpoint; or
  - have Django inject the same structured configuration into the initial React page.
- A configuration endpoint is cleaner when the frontend development server owns the initial page. Django-injected bootstrap data can avoid a second request when Django owns the HTML shell, but it adds build/template integration.
- Therefore the recommended maintainable contract is one small configuration read plus one triage POST. One POST alone remains viable only with a tested shared structured-data build or Django bootstrap; it must not create two canonical copies of scenario text.

### Guided IDs versus free text

- Guided selections should send stable scenario IDs. Sending the full statement would increase payload size, allow altered copy, and require the backend to match user-facing text back to a scenario.
- The backend validates every ID and owns its mapping to topics and approved content.
- Free-text enquiries must send text because classification is the backend's responsibility.
- The two modes are mutually exclusive at both interface and backend-contract levels.
- Free text belongs in a POST body, never a URL or query parameter.
- Neither request should send internal topic IDs chosen by React; that would let the client bypass classification and mapping policy.

### Approved content without a database

- Use small, version-controlled structured backend data: immutable Python definitions or schema-validated JSON are sufficient. YAML would add another parser and looser typing without a V1 benefit.
- Keep approved user-facing copy/URLs separate from scenario-topic mappings and phrase/synonym rules, even if all live in the same backend package.
- The backend selects and assembles the approved records; React renders the returned structure.
- Parsing `docs/content.md` at runtime would be brittle and should not be used.
- `content.md` remains the human approval record during planning. Once implementation begins, the project must choose one canonical exact-copy source:
  - preferably structured runtime data with `content.md` generated or checked against it; or
  - an explicit, tested copy process from `content.md` into runtime data.
- Two independently maintained canonical copies would create likely guidance drift.
- This exploration does not change the user-facing content structure, so `content.md` is not edited yet. Its source-of-truth relationship should be resolved only after the architecture is confirmed.

### Avoiding logging and storage

- Do not create enquiry models, database writes, caches, history, analytics events or persistence features.
- Keep selections and text in React memory only. Do not use local storage, session storage or URLs.
- Send text only in the POST body and apply an explicit input-length/request-size limit.
- Do not log request bodies, entered text, matched excerpts, rule traces or exception locals.
- Review development/server access logs, reverse-proxy defaults, error monitoring and APM separately; the absence of Django models does not prove that infrastructure cannot capture data.
- Return generic errors, disable detailed error pages outside local development and prevent exceptions from echoing input.
- Mark triage responses `Cache-Control: no-store` and do not attach enquiry text to telemetry.
- Use only dummy enquiry text in automated tests and documentation examples.
- A service-unavailable message must be available in React because Django content cannot be retrieved when the API is unreachable. Keep it operational and generic; do not duplicate scenario-specific legal guidance in the client.

### Main failure modes after synthesis

#### Integration

- Two-environment setup or undocumented run order prevents reproduction.
- Proxy, API origin, CSRF or frontend asset configuration differs between development and the evaluated build.
- React and Django contract versions drift.
- Configuration fails to load, so the journey cannot start.
- Network or malformed-response errors are mistaken for classification fallback.
- Repeated or out-of-order submissions display stale results.

#### Product and content

- Client-only validation is bypassed and invalid combinations reach domain logic.
- Deduplication drops one selected scenario's distinct explanation or primary step.
- Runtime content and `content.md` diverge.
- Negated, unsupported or overlapping text produces an overconfident match.
- A general conditional warning is incorrectly triggered from input.
- Unknown frontend scenario IDs are silently accepted or mapped incorrectly.

#### Privacy and accessibility

- Text leaks through URLs, application logs, analytics, error reports or browser persistence.
- A debug error echoes the submitted description.
- Dynamic validation/results are visible but not announced, focused or recoverable by keyboard.
- A failed request clears the user's input or traps the page in a loading state.

#### Testing

- Backend and frontend unit tests pass but no real browser-to-Django journey works.
- Only successful matches are tested; invalid, fallback, unavailable-service and malformed-response states are missed.
- Mock response fixtures drift from the backend's real response.

### What would justify simplifying to Django-rendered templates?

Simplify if one or more of these conditions materially threatens completing the useful slice:

- React's work remains limited to scenario selection, conditional free-text display, submission and result rendering—all achievable with native HTML and a small enhancement script.
- Proxy, CSRF, asset-build or same-origin work consumes more effort than triage accuracy, approved content, accessibility and fallback behaviour.
- A reproducible run path cannot be explained and verified simply.
- There is not enough scope to test the endpoint contract and at least one real integrated guided and free-text journey.
- Legal-signposting copy or scenario mappings must be duplicated to make the split work.
- Accessibility for asynchronous validation/results is less dependable than full-page server navigation.
- There is no planned second API consumer or interaction that genuinely benefits from persistent client state.
- React/Django failures lead to framework shortcuts such as disabling CSRF, skipping service-error states, omitting privacy checks or reducing classifier tests.

Django-rendered forms and templates would preserve the same pure domain modules, authoritative validation and privacy model while removing the JSON contract, proxy, request races and most frontend-build integration. React/Django remains defensible only if its boundary stays narrow and the integration work does not displace higher-risk product behaviour.

### Current recommendation, not yet confirmed

- React plus a thin plain-Django API remains reasonable, but the minimum maintainable version is slightly larger than “one endpoint and one component.”
- Use one backend triage path for both guided and free-text routes.
- Add one read-only configuration/bootstrap mechanism so exact scenario content has one source.
- Return presentation-ready deduplicated results rather than topic IDs that React must interpret.
- Keep Django views thin and put validation, classification, fallback and content assembly in pure backend modules.
- Treat reproducible integration, operational error states, accessibility and privacy logging checks as part of the slice—not optional hardening.
- No architecture decision is confirmed. `plan.md` and `content.md` remain unchanged, and no production code was written.

## 2026-08-30 — Reducing the React/Django architecture to V1 scope

### Reason for revisiting the architecture

- The previous challenge identified valid production and hardening concerns, but treating all of them as part of the first build made the architecture larger than the useful slice.
- This pass separates what is necessary to demonstrate the confirmed journey from later quality improvements and genuine production concerns.
- The aim is not to remove boundaries or tests; it is to avoid solving content operations, observability and deployment problems that V1 does not have.

### Required for V1

#### Application shape

- One React page for the complete guided/free-text journey and result states.
- One small Django application with one JSON triage endpoint.
- One pure Python domain layer for validation, deterministic classification, fallback decisions, topic deduplication and approved result assembly.
- One lightweight frontend-development proxy for relative `/api` calls to Django. This is local integration plumbing, not production proxy architecture.
- A documented two-process local run path is acceptable. V1 does not need one production-like server process.

#### Minimum request contract

- Use only `POST /api/triage`.
- Guided requests contain an explicit `guided` mode and one or two scenario IDs.
- Free-text requests contain an explicit `free_text` mode and bounded text.
- The backend rejects unknown modes/IDs, duplicate IDs, missing input, both modes together, more than two selections and over-limit text.
- Guided requests send IDs rather than full statements or frontend-selected topic IDs.
- Free text is sent in the POST body, never the URL.

#### Minimum response behaviour

- A successful supported request returns one or two already-deduplicated result cards with approved content.
- A valid ambiguous, negated or unsupported enquiry returns an explicit product fallback.
- Invalid input returns a stable validation error.
- An unexpected backend or network problem produces a separate generic service-error state. It must not look like the enquiry was assessed.
- React retains the current selection/text after validation or service failure and prevents accidental repeated submission while a request is pending.

#### Responsibility split

- React owns the five static scenario statements, general interface copy, transient state, the selection interaction, field display, accessible feedback and rendering the server response.
- Django holds the authoritative valid ID set, scenario/topic mapping, approved result content, phrase rules and all product decisions.
- The same five scenario IDs intentionally appear on both sides as the small API contract. This bounded duplication is preferable to adding a configuration-loading flow.
- React may mirror selection/input checks for immediate feedback, but Django validates every request again.
- React does not classify, infer warnings, map scenarios to topics, deduplicate or choose legal-signposting content.

#### Content without a database

- Keep runtime result content as small immutable Python definitions in the backend, separated logically from phrase rules.
- Keep the five input-option statements directly in the React source because they are needed before any API request.
- Continue to use `docs/content.md` as the human approval record during V1.
- Copying the confirmed five statements and result records into runtime structures is an explicit, reviewable implementation task. For this small fixed set, manual verification plus tests is sufficient.
- Add basic tests that all five expected scenario IDs are accepted and that each supported result has its required content/link fields.
- Do not parse Markdown at runtime and do not add a database or CMS.

#### Privacy baseline

- Do not create models, database writes, caches, histories, analytics events or browser storage for enquiries.
- Keep user input in React memory and the Django request only.
- Do not add application log statements containing request bodies, user text, excerpts or rule matches.
- Use dummy text in tests.
- Limit free-text length and return generic error details.
- Make an explicit, documented CSRF decision for the stateless JSON endpoint. V1 must not acquire cookies, authentication or server-side state merely to justify a more complex CSRF flow; the decision must be revisited if state or authentication is added.

#### Minimum tests

- Pure backend tests cover representative supported topics, overlap, negation and fallback behaviour.
- Django endpoint tests cover a guided match, free-text match/fallback, invalid IDs/mixed payload and a generic unexpected failure.
- React tests cover the two-selection/mutual-exclusion behaviour and presentation of matched, fallback, validation and service-error states.
- At least one real browser-to-Django smoke journey verifies the actual proxy and contract. A guided happy path is sufficient for the minimum integrated test; the API tests still cover free text.
- Basic keyboard use, labels, error association and announcement/focus of changed results are part of the first journey because accessibility is a stated product concern.

### Useful during hardening

- Add a second integrated browser journey for free text and fallback.
- Test malformed or non-JSON server responses, slow responses, repeated clicks and out-of-order requests more deeply.
- Add request cancellation rather than only disabling repeated submission.
- Add `Cache-Control: no-store` explicitly to triage responses.
- Audit Django/server logs in the chosen local/evaluation setup to confirm that bodies are absent.
- Run fuller keyboard and screen-reader checks and improve focus restoration.
- Add automated link checking and reverify guidance dates.
- Add a consistency check or small generation script between runtime content and `content.md` if manual drift becomes evident.
- Verify a production-like frontend build can talk to Django, if time remains, without making it the required evaluation path.
- Add CI that runs the separate frontend, backend and integrated suites.
- Expand invalid-input, browser-navigation and error-recovery coverage.

### Future production concern

- A separate configuration/content endpoint for independently deployed clients or frequently changing content.
- Automatic generation or synchronisation between an editorial source, runtime data and `content.md`.
- Wagtail, a CMS, database-backed content, editorial permissions, approval workflow and revision history.
- DRF, API versioning, OpenAPI publication or multiple API consumers.
- Production static-asset hosting, hashed-manifest integration, reverse proxy, CDN and single-origin deployment topology.
- Production CORS/CSRF policy, HTTPS, security headers and cookie/authentication design.
- APM, monitoring, alerting, centralised logging, error-reporting scrubbing and operational dashboards.
- Rate limiting, abuse protection, load testing, scaling and async-performance work.
- Retention, access, deletion and audit policies if a future version stores enquiries or metrics.
- Authentication, accounts, saved enquiries, persistence and service integrations.

### Specific challenges

#### Separate configuration endpoint

- **Not required for V1.** It would avoid repeating five IDs/statements but introduce an initial request, loading/error state, cache decision and another endpoint/test contract.
- Keep the five input statements in React and the authoritative ID set in Django. Test the contract using each ID.
- Reconsider configuration delivery only when content changes independently of frontend deployments or another client needs the same configuration.

#### Automatic `content.md` synchronisation

- **Not required for V1.** Five reviewed scenarios can be copied deliberately into structured runtime data and checked during review.
- A full generator, parser or bidirectional sync introduces build and ownership decisions larger than the current content set.
- A lightweight consistency check is useful hardening; automatic editorial/runtime synchronisation is a future concern.

#### Proxy, hosting, APM and monitoring

- A tiny local frontend proxy is **required** to connect React to Django without adding CORS to the development journey.
- Production reverse-proxy and hosting configuration are **future concerns** because deployment is explicitly outside the exercise.
- APM and monitoring configuration are **future concerns**. V1's obligation is to avoid adding tools or log statements that capture enquiry text.
- A manual log check is useful hardening, not a reason to add an observability stack.

#### Complex same-origin deployment

- **Not required for V1.** The browser can use relative `/api` URLs through the local development proxy.
- Do not add Django template/manifest integration, `collectstatic` architecture, a reverse proxy or production SPA routing merely to claim one-origin deployment.
- The README should document the exact local evaluation path. A real deployment topology can be selected later.

### Smallest proposed React + Django architecture

```text
React page
  ├─ static scenario statements and UI state
  ├─ immediate accessible form validation
  └─ POST /api/triage
          ↓
Thin Django view
  ├─ parse JSON and return stable errors
  └─ call pure triage service
          ↓
Pure Python domain modules
  ├─ authoritative validation
  ├─ scenario/topic mapping
  ├─ explicit phrase/synonym rules
  ├─ one/two/fallback and deduplication
  └─ immutable approved result content
```

There is no configuration endpoint, database, CMS, persistence, authentication, external API, production hosting layer or monitoring stack. The only runtime boundary is one triage POST.

### Current recommendation, not yet confirmed

- React plus a thin plain-Django API remains viable after removing production concerns from V1.
- The remaining extra cost over Django templates is limited to two toolchains, a local development proxy, one JSON contract, asynchronous error states and one integrated smoke test.
- Simplify to Django templates if even this reduced integration causes accessibility, classifier, content or test work to be omitted.
- `plan.md` and `content.md` remain unchanged, and no production code was written.


## 2026-08-30 — Exploring frontend step navigation

| Area | Conditional rendering with local step state | React Router with one route per step |
| --- | --- | --- |
| Browser Back | Does not return to the previous step by default; provide an explicit in-journey Back action | Browser Back/Forward maps naturally to steps |
| Refresh | Safely restarts the journey; transient selections/text are lost by design | A refreshed later route lacks transient input and needs redirect/recovery behaviour |
| Accessibility | Requires focus to move to the new step heading and errors/results to be announced | Routing does not solve focus automatically; the same deliberate focus/announcement work is required |
| Testing | Small state-transition and rendering tests | Adds route, history, direct-entry, invalid-deep-link and refresh tests |
| Complexity | Lowest; no router, route configuration or SPA fallback | Higher; introduces routing and hosting fallback for a short private journey |
| Shareable URLs | No | Possible, but not useful when steps depend on private transient input and results should not be reconstructable from a URL |

### Current recommendation, not yet confirmed

- Use conditional rendering with local step state and a clear in-journey Back button that preserves current selections when appropriate.
- Refresh should restart at the first step rather than persist or reconstruct enquiry text.
- Do not put scenario selections, free text or results in the URL.
- Move focus to the new step heading after forward/back transitions and to the error summary after failed validation.
- React Router is justified only if later testing shows browser Back/Forward is essential, steps must be directly addressable, or the journey expands into independently useful pages.
- No navigation approach is confirmed. `plan.md` and `content.md` remain unchanged.

## 2026-08-30 — Local step-state navigation confirmed

- V1 will use conditional rendering with local React step state rather than route-per-step URLs.
- A clear in-app Back control preserves previous selections; refresh restarts safely; enquiry data stays out of URLs; and focus and announcements are managed after step changes.
- The concise technical assumption is recorded in `plan.md`, and exact navigation behaviour and control labels are maintained in `content.md`.

## 2026-08-30 — Exploring the `POST /api/triage` contract

### Contract principles

- Use one endpoint and an explicit request mode. Do not infer the route from missing fields.
- Use the same matched-response shape for one or two topics; only the number of cards changes.
- Treat fallback as a successful classification outcome, invalid input as a client error, and service failure as an operational error.
- Return presentation-ready approved content so React does not map topic IDs to legal-signposting copy.
- Do not echo the user's free text or expose scores, confidence, matched phrases, rule IDs, legal conclusions, urgency or internal exceptions.

### Proposed requests

#### Guided mode

```json
{
  "mode": "guided",
  "scenario_ids": ["ground-rent-demand"]
}
```

- Accept one or two unique IDs from the five supported scenarios.
- Reject an empty list, more than two IDs, duplicates, unknown IDs, non-string values, a `text` field or unexpected top-level fields.
- The client sends IDs, not the user-facing statements or frontend-selected topic IDs.

#### Free-text mode

```json
{
  "mode": "free_text",
  "text": "My service charge includes work I do not recognise."
}
```

- Trim surrounding whitespace and require non-blank text.
- Propose a 500-character maximum for V1. This is enough for a short description while discouraging case histories and unnecessary personal information.
- Do not impose a semantic minimum length: a short but valid description can be processed and safely fall back.
- Reject `scenario_ids`, non-string text, over-limit text or unexpected top-level fields.

### Proposed matched card shape

```json
{
  "topic_id": "COSTS_AND_CHARGES",
  "topic_label": "Costs and charges",
  "items": [
    {
      "scenario_id": "ground-rent-demand",
      "why": "Approved cautious explanation.",
      "next_step": {
        "text": "Approved next-step text.",
        "url": "https://www.lease-advice.org/..."
      }
    }
  ],
  "conditional": {
    "text": "Approved objective if-condition.",
    "url": "https://www.lease-advice.org/..."
  }
}
```

- `topic_id` is a stable rendering/test key; it does not imply a legal conclusion.
- `topic_label` is returned because Django owns approved result content.
- `items` preserves separate scenario explanations and next steps within a deduplicated topic card.
- `scenario_id` is present for guided-origin items and omitted for a topic-level free-text item.
- `conditional` is omitted when the topic card has none; do not send `null` merely to fill the shape.
- Do not return a top-level copy of selected scenario IDs because the guided items already identify them.

### Matched one-topic response

```json
{
  "outcome": "matched",
  "cards": [
    {
      "topic_id": "COSTS_AND_CHARGES",
      "topic_label": "Costs and charges",
      "items": ["presentation-ready item"],
      "conditional": "optional presentation-ready condition"
    }
  ]
}
```

- `cards` contains exactly one card.
- Two guided scenarios mapping to the same topic still produce one card with two items.

### Matched two-topic response

```json
{
  "outcome": "matched",
  "cards": [
    { "topic_id": "COSTS_AND_CHARGES", "topic_label": "Costs and charges", "items": [] },
    { "topic_id": "LEASE_EXTENSION", "topic_label": "Lease extension", "items": [] }
  ]
}
```

- `cards` contains exactly two complete card objects using the same schema as a one-topic response.
- Neither card is marked primary or given a confidence value.
- Use a fixed documented topic order rather than classifier score so array position does not imply relevance ranking.

### Valid fallback

```json
{
  "outcome": "fallback",
  "fallback": {
    "heading": "Approved fallback heading.",
    "body": "Approved explanation that no supported topic was identified.",
    "next_step": {
      "text": "Approved general signposting step.",
      "url": "https://www.lease-advice.org/..."
    }
  }
}
```

- Return HTTP 200 because the valid request was processed successfully.
- Use one fallback presentation for no match, ambiguity, negation, unsupported input and more than two possible topics unless the user journey genuinely needs different actions.
- Do not expose an internal fallback reason, confidence or matched terms when the UI does not use them.
- React adds the local “Edit description” action; it is interface navigation and does not need to be serialised by Django.
- Exact fallback copy and actions are not yet confirmed; this proposal does not add unapproved wording to `content.md`.

### Invalid request

```json
{
  "outcome": "invalid_request",
  "error": {
    "field": "scenario_ids",
    "code": "select_one_or_two"
  }
}
```

- Return HTTP 400.
- Return one deterministic highest-priority validation error rather than a complex error tree for the two-field contract.
- Use stable codes such as `required`, `select_one_or_two`, `unknown_scenario`, `choose_one_mode`, `too_long`, `invalid_json` and `invalid_request`.
- React maps codes to approved plain-English messages and an error summary. Do not return framework exception text.
- Exact validation messages are not yet confirmed, so `content.md` remains unchanged.

### Unexpected service error

```json
{
  "outcome": "service_error"
}
```

- Return a generic HTTP 500 JSON response when the endpoint can do so safely.
- A network failure or malformed/non-JSON response is mapped by React to the same operational state.
- Do not return an exception message, traceback, request ID, submitted text or retry prediction.
- The frontend owns a small generic service-error presentation because it must work when Django cannot supply content.
- Exact service-error copy is not yet confirmed, so `content.md` remains unchanged.

### Fields deliberately excluded

- `success`: redundant with `outcome` and HTTP status.
- `mode` in the response: React already knows which route it submitted.
- `original_text` or normalised text: unnecessary personal-data exposure.
- `selected_scenario_ids` at response top level: duplicated by card items and client state.
- `score`, `confidence`, `rank`, `matched_terms` or `rule_ids`: not meaningful to users and could imply precision.
- `legal_status`, `eligibility`, `urgency`, `recommended_route` or generated conclusions: outside the signposting boundary.
- `timestamp`, `request_id`, API version or content version: no V1 consumer needs them.
- Pagination, metadata and links wrappers: there are at most two cards.

### Important content gap revealed by the contract

- Guided selections have scenario-specific approved explanations and next steps in `content.md`.
- Free text is currently confirmed to map only to one or two internal topics, not to one of the five scenarios.
- `COSTS_AND_CHARGES` and `REPAIRS_AND_BUILDING_MANAGEMENT` each contain two different scenario-specific next steps. A topic match alone cannot safely choose one without adding a more granular rule.
- Before confirming the contract, choose one of these approaches:
  1. approve one broad topic-level explanation and primary link for each free-text topic;
  2. change phrase rules to identify scenario-level intent before topic deduplication; or
  3. make free-text matched results present the relevant topic with a cautious choice of its supported scenario links, accepting greater cognitive load.
- The smallest option that preserves the confirmed topic-only classifier is broad topic-level free-text content. It requires separate verified copy/links before implementation.

### Current recommendation, not yet confirmed

- Use the explicit guided/free-text request union, propose a 500-character free-text maximum, and use one response envelope with `matched`, `fallback`, `invalid_request` or `service_error`.
- Keep matched results presentation-ready and capped at two cards.
- Confirm how topic-only free-text matches receive a safe next step before freezing the response schema.
- `plan.md` and `content.md` remain unchanged, and no production code was written.

## 2026-08-30 — Challenging and simplifying the triage contract

### 1. Full-content response versus IDs only

#### Lean ID-only response

- Django could return only topic IDs and originating scenario IDs.
- The payload would be smaller and the HTTP contract would change less when wording changes.
- React would then need its own topic labels, explanations, links, warnings and next-step mapping.
- This contradicts the confirmed responsibility split in which Django selects and assembles approved signposting content.
- It would also create two possible interpretations of an ID if frontend content drifted from backend rules.
- Adding a separate content/configuration request to resolve the IDs would restore backend ownership but reintroduce the endpoint and loading state deliberately removed from V1.

#### Presentation-ready full-content response

- Django returns the approved content needed to render each matched card.
- React remains an accessible renderer and does not interpret topic IDs as legal-content instructions.
- The payload is tiny: at most two cards with short static copy, so response size is not a meaningful V1 concern.
- Content changes can alter response values without changing the schema.
- This better supports the confirmed backend content ownership and is the recommended option.

### 2. Simplifying the response envelope

- A discriminating `outcome` field is necessary because HTTP 200 must distinguish a match from a valid fallback.
- Using the same discriminator for invalid requests and service errors keeps frontend handling explicit.
- Separate top-level wrappers for `fallback` and `error` are not necessary for this one endpoint.
- Keep only the fields used by each outcome:

```json
{ "outcome": "matched", "cards": ["one or two complete cards"] }
```

```json
{
  "outcome": "fallback",
  "heading": "Approved heading",
  "body": "Approved body",
  "next_step": { "text": "Approved signpost", "url": "https://..." }
}
```

```json
{ "outcome": "invalid_request", "code": "invalid_mode" }
```

```json
{ "outcome": "service_error" }
```

- `field` is unnecessary because each validation code identifies the affected part of the two-field request.
- Matched cards retain `topic_id`, `topic_label`, `items`, and an optional `conditional` block. Guided items retain `scenario_id`, `why`, and `next_step`; topic-level free-text items omit `scenario_id`.
- HTTP status remains meaningful: 200 for `matched`/`fallback`, 400 for `invalid_request`, and 500 for `service_error` when Django can return a safe JSON body.

### 3. Resolving the free-text content gap

- Yes: each of the three internal topics should have one broad, approved free-text explanation and one broad primary next step.
- This preserves the confirmed topic-only classifier and avoids pretending that free text identified one of two more specific scenarios.
- A two-topic free-text match returns two separate broad topic cards with neither ranked as primary.
- Existing objective conditional content can remain attached to the topic as static general information; it must not be triggered by analysing text.
- Guided results continue to use the more specific scenario explanations and steps already approved.
- Exact broad explanations and official links require separate research and confirmation before being added to `content.md`.

Rejected alternatives:

- Returning both scenario links for every free-text topic adds cognitive load and weakens the one-clear-next-step principle.
- Inferring a specific scenario would change the confirmed classifier from three topic rules to five scenario rules.
- Returning only a topic label would fail the useful-outcome requirement because it provides no clear next step.

### 4. Minimum validation codes

Use seven stable codes rather than one code for every technical parsing variation:

| Condition | Code | Reason for grouping |
| --- | --- | --- |
| Missing, unknown or non-string mode | `invalid_mode` | All require choosing one supported route |
| Missing/empty or more than two scenario IDs | `invalid_scenario_count` | The user action is to select one or two |
| Duplicate, unknown or non-string scenario IDs | `invalid_scenario_ids` | These cannot normally be produced by the UI and can share a generic selection error |
| Missing, blank or whitespace-only free text | `blank_text` | The user must enter a description |
| Text above the confirmed maximum | `text_too_long` | The user must shorten the description |
| Fields from both modes, or a field inconsistent with the declared mode | `conflicting_fields` | The user must use one input route |
| Malformed JSON, wrong top-level type or unexpected fields | `invalid_request` | These are contract failures without a more useful UI correction |

- Backend tests still cover empty, excessive, duplicate and unknown ID inputs independently even when some share a response code.
- Use a deterministic validation order: parse/top-level shape, mode, conflicting fields, then mode-specific input.
- Exact user-facing messages for these codes remain unconfirmed and are not added to `content.md`.

### 5. Unknown request fields

- Reject them in V1 using `invalid_request`.
- The endpoint has only two small request shapes and one internal client, so strict input catches misspellings, accidental fields and unplanned personal-data submission.
- Ignoring fields would provide forward compatibility that V1 does not need and could conceal frontend/backend drift.
- This applies only to request fields; the frontend should be more defensive about unknown response fields and ignore harmless additions while validating required fields.

### 6. Challenging the 500-character limit

- A bounded length is justified for privacy, predictable validation and protection from accidental case histories.
- Exactly 500 characters is not yet supported by user evidence. It allows roughly one short paragraph and may reject a legitimate description of two overlapping issues.
- The deterministic classifier gains no meaningful safety from choosing 500 rather than 1,000 characters.
- Recommend a 1,000-character V1 maximum as the more stable provisional limit: still bounded, but less likely to force users to remove relevant context.
- Treat the limit as an input boundary, not a confidence rule. Short text is valid and should fall back when unclear.
- Confirm the number after checking the representative example set. The exact counter/help/error wording belongs in `content.md` only after confirmation.

### 7. Network, malformed-response and server failures

- They should share one generic user-facing service-error presentation because the safe action is the same: preserve the input and allow retry.
- Users do not benefit from technical distinctions such as connection rejection, invalid JSON or HTTP 500.
- Tests should distinguish all three paths:
  - the request rejects or cannot connect;
  - Django returns `service_error` with HTTP 500;
  - the response has an unexpected status or fails required-schema parsing.
- The frontend adapter can normalise these technical paths to one service-error UI state without exposing them or logging enquiry content.
- Exact service-error wording remains unconfirmed and is not added to `content.md`.

### Smallest stable contract recommendation

#### Requests

- Guided: `{ "mode": "guided", "scenario_ids": [one or two known IDs] }`.
- Free text: `{ "mode": "free_text", "text": "non-blank text up to a proposed 1,000 characters" }`.
- Reject unknown fields and accept exactly one mode's input.

#### Responses

- `matched`: presentation-ready `cards`, length one or two.
- `fallback`: flattened approved heading, body and one general next step.
- `invalid_request`: one of the seven stable validation codes.
- `service_error`: no technical detail.

#### Deliberately excluded

- ID-only content lookup, a configuration/content endpoint, field-level error objects, multiple simultaneous errors, scores, confidence, rule traces, original input, legal conclusions and metadata.

### Current position, not yet confirmed

- Keep the backend-owned full-content response but flatten non-matched outcomes.
- Add one broad approved free-text explanation and next step per topic.
- Replace the unsupported 500-character proposal with a provisional 1,000-character limit, subject to representative examples.
- Show one service-error message for all operational failures while testing their technical paths separately.
- `plan.md` and `content.md` remain unchanged, and no production code was written.

## 2026-08-30 — `POST /api/triage` contract confirmed

### Decision

- Guided requests contain an explicit mode and one or two known scenario IDs; free-text requests contain an explicit mode and non-blank text of at most 1,000 characters. The two request shapes are mutually exclusive, and unknown fields are rejected.
- The backend returns presentation-ready approved content rather than topic/scenario IDs alone.
- `matched` uses HTTP 200 and returns one or two cards. Free-text matches use the same card structure as guided results, omit `scenario_id`, and use one approved broad topic-level explanation and next step.
- `fallback` is a valid processed outcome and uses HTTP 200.
- `invalid_request` uses HTTP 400 and one stable validation code. The seven confirmed code groups and deterministic validation order remain documented in the preceding review rather than duplicated in `plan.md`.
- Unexpected Django service failures use HTTP 500 with no technical detail.
- Network, malformed-response and service failures share one user-facing recovery message while remaining distinct frontend test paths.
- The response excludes enquiry text, scores, confidence, ranks, matched phrases/rules, legal conclusions and unnecessary metadata.

### Content boundary

- Each of the three internal topics now requires separately approved broad free-text explanation and next-step content.
- Exact free-text, fallback, validation and service-error copy is still unconfirmed and must be researched or agreed before it is added to `content.md`.
- `plan.md` contains the concise confirmed contract; detailed validation codes and rejected alternatives remain in this working log.
- No production code was written.

## 2026-08-30 — Proposed free-text, fallback and error copy

All wording below is proposed for review, not confirmed. `plan.md` and `content.md` remain unchanged.

### Broad official sources verified for free-text cards

- Costs and charges: https://www.lease-advice.org/costs-and-charges/
- Building management: https://www.lease-advice.org/building-management/
- Lease extension: https://www.lease-advice.org/lease-extension/
- Verified on 30 August 2026.
- These topic landing pages are preferable to scenario-specific pages because free text identifies only a broad topic.

### Shared free-text card labels

- **Suggested-topic heading:** “This may relate to [topic label].”
- **Explanation heading:** “Why this may be relevant”
- **Next-step heading:** “What you can do next”
- Existing confirmed objective conditional warnings remain unchanged and are not inferred from the user's text.

### Free-text result card — Costs and charges

- **Suggested-topic heading:** “This may relate to costs and charges.”
- **Why this may be relevant:** “Your description may concern a payment connected with your lease, such as a service charge, ground rent or another charge. This result does not decide whether an amount is payable or reasonable.”
- **Next step:** “Read LEASE’s costs and charges guidance to find information about service charges, ground rent, major works and other common charges.”
- **Link label:** “Read costs and charges guidance”
- **Official source:** https://www.lease-advice.org/costs-and-charges/

### Free-text result card — Repairs and building management

- **Suggested-topic heading:** “This may relate to repairs and building management.”
- **Why this may be relevant:** “Your description may concern repairs, maintenance or how your building is managed. The relevant guidance can depend on the part of the building, who manages it and what the lease says. This result does not decide who is responsible.”
- **Next step:** “Read LEASE’s building management guidance to find information about repairs, maintenance and problems with managing a leasehold building.”
- **Link label:** “Read building management guidance”
- **Official source:** https://www.lease-advice.org/building-management/

### Free-text result card — Lease extension

- **Suggested-topic heading:** “This may relate to lease extension.”
- **Why this may be relevant:** “Your description may concern extending a lease. The process and guidance can differ for flats and leasehold houses. This result does not decide whether you qualify, what it may cost or which route is suitable.”
- **Next step:** “Read LEASE’s lease extension guidance, then choose the information for a flat or a leasehold house.”
- **Link label:** “Read lease extension guidance”
- **Official source:** https://www.lease-advice.org/lease-extension/

### Unsupported or unclear fallback

- **Heading:** “We could not match your question”
- **Body:** “This prototype may not recognise the wording, or your question may be outside the topics it covers. This does not mean LEASE cannot help.”
- **Next-step copy:** “Try editing your description without adding personal details, or choose from the common scenarios. If neither helps, contact LEASE for guidance.”
- **Actions:** “Edit description”; “Choose from common scenarios”; “Contact LEASE”
- **Contact source:** https://www.lease-advice.org/about-us/get-in-touch/

### Validation copy

- **Shared error-summary heading:** “Check your answers”

| Validation code | Proposed message |
| --- | --- |
| `invalid_mode` | “Choose a common scenario or select ‘I’m not sure / something else’.” |
| `invalid_scenario_count` | “Select one or two scenarios.” |
| `invalid_scenario_ids` | “One or more scenario choices could not be recognised. Choose them again.” |
| `blank_text` | “Describe your situation before continuing.” |
| `text_too_long` | “Shorten your description to 1,000 characters or fewer.” |
| `conflicting_fields` | “Choose scenarios or describe your situation in your own words—not both.” |
| `invalid_request` | “We could not read your answers. Go back and try again.” |

- Each message identifies a recovery action rather than exposing request-schema or server terminology.
- The error summary should link to the relevant input where one exists; `invalid_request` may use the page-level summary only.

### Generic service, network or malformed-response error

- **Heading:** “We could not check your enquiry”
- **Body:** “There was a problem with the service. Your answers have not been saved. Try again, or contact LEASE for guidance.”
- **Actions:** “Try again”; “Contact LEASE”
- **Contact source:** https://www.lease-advice.org/about-us/get-in-touch/
- The same visible copy applies to network, malformed-response and HTTP 500 failures, while tests distinguish the three technical paths.

### Privacy notice before free-text entry

- **Heading:** “Before you describe your situation”
- **Notice:** “Do not include names, addresses, contact details, reference numbers or information about other people. We use your description only to suggest relevant guidance and do not save it.”
- **Field label:** “Describe your situation”
- **Hint:** “Briefly describe the main issue in your own words. You do not need to use legal terms. Maximum 1,000 characters.”

### “This doesn't match” and recovery actions

- **Result-card action:** “This doesn't match”
- For a guided result, the action returns to scenario selection with previous selections preserved.
- For a free-text result, the action returns to the description with the previous text preserved.
- **Fallback actions:** “Edit description”; “Choose from common scenarios”; “Contact LEASE”
- **Operational retry action:** “Try again”
- Do not place enquiry content in an action URL or open LEASE guidance/contact links in a new tab by default.

### Copy critique

#### Clarity

- The topic-card wording uses short sentences, names the broad subject and gives one concrete next step.
- “May concern” and “may relate” avoid claiming that the classification is certain.
- Validation messages use verbs and say what the user can do next.
- `invalid_scenario_ids` is necessarily less specific because duplicate, unknown and malformed IDs share one confirmed code; this should rarely appear through the controlled UI.
- “This prototype may not recognise the wording” places the limitation on the system rather than blaming the user.

#### Accessibility

- Descriptive headings make result, fallback and error states easy to scan and announce.
- Error text does not rely on colour or technical codes and can be linked to the relevant field.
- The character maximum appears before submission rather than only after an error.
- “Read costs and charges guidance” is more informative out of context than “Read more.”
- The visible “This doesn't match” label is concise but slightly context-dependent. Its accessible name should include the card topic, for example “This doesn't match: Costs and charges.”
- Focus should move to the error summary, fallback heading, service-error heading or new result heading as already required by the navigation decision.

#### Accidental legal certainty

- Each card expressly says what the result does not decide and links to broad official guidance rather than selecting a legal route.
- The copy avoids statements about rights, liability, validity, success, urgency or what the user should legally do.
- The lease-extension card avoids choosing between flat/house or formal/informal routes.
- Existing urgent-condition content must remain a static objective warning; it must not be triggered from free text.
- “We do not save it” and “Your answers have not been saved” are operational promises, not legal conclusions. They should be approved only if implementation and log checks uphold them.

### Remaining wording questions

- Confirm or revise the exact proposed copy before moving it into `content.md`.
- Decide whether “This does not mean LEASE cannot help” is reassuring enough or should be replaced with the more direct “You can still use LEASE guidance or contact LEASE.”
- Confirm that the privacy promise can be supported by the final request-logging setup.
- No product behaviour changes are proposed, so `plan.md` remains unchanged.

## 2026-08-30 — Operational accuracy and recovery review

This review changes proposed wording only. No product behaviour changes are introduced, so `plan.md` remains unchanged. The final copy is still awaiting confirmation and is not moved to `content.md` yet.

### 1. Fallback reassurance revised

Replace:

- “This does not mean LEASE cannot help.”

With:

- “You can still use LEASE guidance or contact LEASE.”

Revised fallback body:

- “This prototype may not recognise the wording, or your question may be outside the topics it covers. You can still use LEASE guidance or contact LEASE.”

This is more direct, avoids speculating about LEASE's ability to help with a particular case and points to real recovery routes.

### 2. Storage claims reviewed

The architecture can guarantee the following application behaviour:

- no account or enquiry history;
- no database/model for enquiries;
- no local or session storage of the description;
- no intentional application log statement containing request bodies or text.

It cannot yet guarantee that the description is never saved anywhere because the final development/hosting proxy, server access/error logging and diagnostic tooling have not been implemented and audited. A network or server error may also occur after the request has reached infrastructure outside the React/Django application boundary.

Therefore remove these absolute claims:

- “We do not save it.”
- “Your answers have not been saved.”

Safer revised privacy notice:

- **Heading:** “Before you describe your situation”
- **Notice:** “Do not include names, addresses, contact details, reference numbers or information about other people. When you continue, your description is sent to this prototype to suggest relevant guidance. It is not added to an account or enquiry history.”
- **Field label:** “Describe your situation”
- **Hint:** “Briefly describe the main issue in your own words. You do not need to use legal terms. Maximum 1,000 characters.”

Safer revised service-error copy:

- **Heading:** “We could not check your enquiry”
- **Body:** “There was a problem with the service. Try again, or contact LEASE for guidance.”
- **Actions:** “Try again”; “Contact LEASE”

These statements describe observable product behaviour and recovery without making an unsupported promise about every infrastructure log.

### 3. Destinations reverified

Verified on 30 August 2026:

| Action | Exact official destination |
| --- | --- |
| “Read costs and charges guidance” | https://www.lease-advice.org/costs-and-charges/ |
| “Read building management guidance” | https://www.lease-advice.org/building-management/ |
| “Read lease extension guidance” | https://www.lease-advice.org/lease-extension/ |
| “Contact LEASE” | https://www.lease-advice.org/about-us/get-in-touch/ |

- All four URLs resolve to current official LEASE pages with the expected page title and scope.
- Open these destinations in the same tab by default. No action requires a new-window warning.

### 4. Explicit action behaviour

| Visible action | Destination or behaviour |
| --- | --- |
| “Read costs and charges guidance” | Open the verified costs-and-charges topic page in the same tab |
| “Read building management guidance” | Open the verified building-management topic page in the same tab |
| “Read lease extension guidance” | Open the verified lease-extension topic page in the same tab |
| “Contact LEASE” | Open the verified Get in touch page in the same tab |
| “This doesn't match” on a guided result | Return to scenario selection with existing selections preserved and focus the step heading |
| “This doesn't match” on a free-text result | Return to the free-text step with the previous description preserved and focus the step heading |
| “Edit description” | Return to the free-text step with the previous description preserved and focus the step heading |
| “Choose from common scenarios” | Return to scenario selection; free text is excluded from the next guided request |
| “Try again” | Resubmit the same in-memory request once; disable the action while that request is pending |
| “Go back” after `invalid_request` | Return to the previous input step with user-entered values preserved |

- Validation errors with a known field focus or link to the scenario group or free-text field after the error summary is announced.
- Network, malformed-response and HTTP 500 failures use the same visible retry/contact actions but remain separate test cases.
- Enquiry text is never placed in an action URL.

### Operationally revised proposed copy set

All previously proposed free-text card and validation wording remains unchanged. Apply only these revisions before final confirmation:

1. Replace the fallback reassurance with “You can still use LEASE guidance or contact LEASE.”
2. Replace the privacy notice with the safer account/history wording above.
3. Remove the storage claim from the generic service-error message.
4. Use the exact verified destinations and behaviours in the action table.

### Remaining confirmation

- Confirm the revised privacy and service-error wording before the complete approved copy is added to `content.md`.
- During hardening, verify that Django, the local proxy and any chosen error tooling do not record request bodies. Only after that evidence would a stronger no-storage statement be supportable.
- No production code was written.

## 2026-08-30 — Free-text and recovery copy confirmed

The revised privacy notice, free-text topic cards, unsupported-or-unclear fallback, validation messages, shared service/network error, official URLs and explicit action behaviours are confirmed for V1.

- `content.md` now contains the complete approved copy and verification date of 30 August 2026.
- The privacy wording avoids an unsupported promise that infrastructure never records text. Auditing proxy, server and diagnostic logging remains a hardening task.
- The fallback and service error provide explicit recovery through editing, common scenarios, retrying or the verified Contact LEASE page, as applicable.
- Network, malformed-response and HTTP 500 failures retain shared user-facing copy but remain distinguishable in tests.
- `plan.md` is unchanged because this confirmation completes previously agreed content without changing product behaviour.
- No production code was written.

## 2026-08-30 — V1 planning pack finalised and audited

`plan.md` has been reduced to a concise planning pack. Detailed wording and verified links remain in `content.md`; architectural exploration, alternatives and rejected approaches remain in this file. The former provisional architecture task and resolved-question framing have been removed.

### Requirement audit

| Requirement | Audit result |
| --- | --- |
| Problem restatement | Covered: identifies leaseholders in England and Wales, their difficulty finding relevant guidance, and five explicit measures of a useful V1 outcome. |
| Assumptions | Covered under product/user needs, advice/content boundaries, and technical/privacy assumptions, including empirical and operational unknowns. |
| Ordered task breakdown | Covered by seven vertical-slice tickets, each with a concise “Done means” statement. |
| Risks | Covered for classification/testing, accessibility, personal data, API/application security, legal-content safety and integration complexity. Each row states what a reviewer should inspect. |
| React plus plain Django | Confirmed: React owns the journey, a thin plain-Django view owns the JSON boundary, and pure Python owns authoritative domain behaviour. |
| Local step state | Confirmed: conditional rendering without React Router, with Back, restart, URL privacy, focus and announcement behaviour. |
| `POST /api/triage` | Covered: guided and free-text request boundaries, 1,000-character limit, strict fields, 200 matched/fallback outcomes, 400 validation, 500 failure and non-disclosure rules. |
| Deliberate exclusions | Covered: unsupported audiences/topics, advice and classifier boundaries, persistence and framework exclusions, and deferred production infrastructure. |
| Record separation | Covered: `content.md` owns exact copy and verified URLs; `running-notes.md` owns exploration and history. |
| Resolved questions and unnecessary detail | No provisional or remaining-decision section remains; production hosting and hardening detail is recorded only as excluded scope or reviewer risk. |

### Remaining gap found

- The behaviour for park-home owners is confirmed, but its exact exclusion wording and verified redirect destination have not yet been approved in `content.md`. This is recorded as an honest content unknown in `plan.md`; no wording or URL was invented during finalisation.
- No other planning requirement is missing.
- `content.md` was not changed because the audit found an omission awaiting content approval, not contradictory approved copy.
- `git diff --check` passes. No production code was written.

## 2026-08-30 — Part 2 implementation tickets clarified

The task breakdown in `plan.md` has been rewritten as future implementation work rather than completed planning activity.

- Seven ordered tickets now name the concrete artifact or working feature to be produced: project scaffolding, Python domain data, pure triage functions, the Django endpoint, accessible React input screens, React result/recovery states, and integrated tests with delivery documentation.
- Every ticket states its minimum relevant tests and a concise “Done means” condition.
- The sequence establishes runnable frontend/backend foundations first, then adds the domain and API, connects accessible screens, completes result and recovery states, and finishes with integrated verification.
- Abstract planning phrases such as “create a seam,” “create records” and “implement behaviour” have been removed.
- Confirmed decisions and detailed exploration were not copied into the tickets; exact user-facing copy remains in `content.md`.
- No production code or user-facing content was changed.

## 2026-08-30 — Planning pack restructured around reviewable Part 2 increments

`plan.md` has been restructured again to make the Part 2 build sequence suitable for incremental implementation and Git review.

### Changes made

- The build breakdown now follows nine dependency-ordered increments: React scaffold, Django scaffold, HTTP boundary, guided domain logic, guided React journey, free-text triage, complete results/navigation/recovery, integrated verification, and delivery documentation.
- Every ticket identifies a concrete deliverable, essential acceptance checks and a concise “Done means” outcome.
- Frontend and backend scaffolding are separate commits. The real HTTP boundary is established before product behaviour is layered onto it.
- Authoritative guided logic is added before its React journey; free-text behaviour follows the working guided slice; shared navigation and recovery are completed before integrated verification.
- Part 3 hardening and self-review are explicitly separated from the Part 2 ticket sequence and retained as risk-led reviewer scrutiny.

### Scope and record separation

- Architecture and API decisions are summarised at boundary level. Full schemas, validation-code lists, exact copy, verified URLs and decision history are not reproduced in `plan.md`.
- Deliberate exclusions prevent the build tickets from expanding into deployment infrastructure, authentication, a full advice engine, pixel-perfect design or feature completeness.
- `content.md` remains the source for exact approved copy, warnings and verified links. No genuine inconsistency was found, so it was not edited.
- The planning pack is 1,295 words, within the intended concise one-to-two-page range for this working format.
- `git diff --check` passes. No production code was written.

## 2026-08-31 — Guided-scenario triage built (tickets 4 + 5)

### What was built

- Backend domain mirrors `content.md` (`backend/triage/content.py`), with pure
  `validate_guided` / `classify_guided` logic (`domain.py`), a guided
  `POST /api/triage` and a `GET /api/scenarios` list endpoint. Results are
  grouped/deduplicated by topic; scenarios sharing a topic share one heading and
  conditional warning but keep their own explanation, next step and link.
- Frontend guided journey (React + MUI): `ScenarioPicker` (two-selection limit),
  `TriageResults`, `ServiceError`, an App step machine, plus focus management,
  an error summary and axe tests. Static chrome mirrored into `src/content.ts`.

### Draft copy introduced (NOT yet approved into content.md)

`content.md` has no guided-picker heading or hint. Two placeholder strings were
used in `src/content.ts`, both marked `// DRAFT`:

- Picker heading: “Choose the option that best matches your situation”.
- Selection hint (fieldset legend): “Select one or two options.”

These need confirmation and, once agreed, should be promoted into `content.md`
(and the `// DRAFT` markers removed). All other user-facing copy is verbatim from
`content.md`.

### Decisions

- Guided result card link labels reuse the approved topic-level labels from
  `content.md` (e.g. “Read costs and charges guidance”) because content.md gives
  no per-scenario link label. Deep scenario URLs are still used as the link target.
- Repeated scenario ids are deduplicated before the 1–2 count check.

## 2026-08-31 — Free-text triage built (ticket 6)

### What was built

- Backend: a deterministic keyword classifier (`domain.KEYWORDS`,
  `classify_free_text`) mapping a description to up to two topics (ranked by hit
  count, tie-broken by topic order) or the approved fallback; `validate_free_text`
  (blank/too-long/conflicting); the `POST /api/triage` view now dispatches on
  `mode` (guided vs free_text). Free-text card copy + fallback copy mirrored into
  `content.py` from content.md.
- Frontend: `FreeTextEntry` (privacy notice, 1,000-char cap) and `Fallback`
  components; the picker gained an "I'm not sure / something else" route
  (mutually exclusive with scenarios); `TriageResults` now also renders
  free-text cards (no scenario). App step machine: picker → freetext →
  results/fallback, with Edit description / Choose from common scenarios recovery.

### Decisions / limitations

- Classifier uses naive substring matching (marked with a `ponytail:` comment):
  misspellings and negated phrases fall to the safe fallback rather than
  mis-signposting. This is deliberate for a legal-adjacent tool; a real matcher
  (stemming/synonyms/negation) is a later upgrade.
- Free-text free_text is hard-capped at 1,000 chars in the textarea; the server
  still enforces `text_too_long` for API robustness.
- All ticket-6 user-facing copy is verbatim from content.md — no new draft
  strings (the two picker DRAFT strings from ticket 5 still await confirmation).
