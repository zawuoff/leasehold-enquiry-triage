// Static UI chrome. Result-card copy, scenario labels and warnings come from the
// API (backend content.py / docs/content.md), not from here. Strings still marked
// DRAFT are pending promotion into docs/content.md.

// Shared literals (referenced in more than one place below).
export const MAX_TEXT_LENGTH = 1000
export const CONTACT_URL = 'https://www.lease-advice.org/about-us/get-in-touch/'

export const copy = {
  appTitle: 'Leasehold enquiry triage',
  brand: 'Leasehold Advisory Service',
  strapline: 'Signposting · not legal advice',
  // Individual stepper nodes — the wizard assembles them per path (guided keeps
  // "Details"; free text skips it). Variant A visual. DRAFT.
  steps: {
    describe: { label: 'Describe', sub: 'Your problem' },
    details: { label: 'Your situation', sub: 'A few details' },
    result: { label: 'What we found', sub: 'Your topic' },
    nextSteps: { label: 'Next steps', sub: 'Guidance & contact' },
    feedback: { label: 'Feedback', sub: 'Was this helpful' },
  },
  describe: {
    heading: 'Describe your problem', // DRAFT
    subtitle:
      "Choose the area closest to your problem, or describe it in your own words. We'll point you to the right guidance and a way to reach us.", // DRAFT
    subtitleFree:
      "Tell us what's happening in your own words. We'll point you to the right guidance and a way to reach us.", // DRAFT
    toggleGuided: 'Pick a topic', // DRAFT
    toggleFree: 'Describe in your own words', // DRAFT
    topicLabel: 'What is your enquiry about?', // DRAFT
  },
  situationStep: {
    heading: 'Which best describes your situation?', // DRAFT
    selectUpToTwo: 'Select up to 2',
  },
  stepHeadings: {
    result: 'What we found', // DRAFT
    nextSteps: 'Your next steps', // DRAFT
    feedback: 'Was this helpful?',
    done: 'Thanks for using this service', // DRAFT
    doneBody: 'You can start a new enquiry at any time.', // DRAFT
  },
  nav: {
    back: 'Back',
    continueLabel: 'Continue',
    finish: 'Finish',
    startAgain: 'Start again',
  },
  freeText: {
    // Shortened, two-line privacy notice (inset) — less text-heavy. DRAFT.
    privacyPrimary:
      'Do not include personal details — such as names, addresses or reference numbers.',
    privacySecondary:
      "Your description isn't saved to an account or enquiry history.",
    label: 'Describe your situation',
    placeholder: 'Start typing here…',
    hint: 'Briefly describe the main issue in your own words. You do not need to use legal terms. Maximum 1,000 characters.',
    maxLength: MAX_TEXT_LENGTH,
    // One example per topic so the guidance is relevant whatever the enquiry. DRAFT.
    examplesLabel: 'For example',
    examples: [
      'My service charge has gone up a lot this year and I don’t understand why.',
      'The lift in my block has been broken for weeks and the managing agent isn’t fixing it.',
      'My lease has about 80 years left and I want to know how to extend it.',
    ],
  },
  results: {
    contact: 'Contact LEASE',
    contactUrl: CONTACT_URL,
  },
  // DRAFT: callback/feedback copy is not yet in content.md. See running-notes.
  callback: {
    heading: 'Ask an adviser to contact you',
    intro:
      'Optional. If you would like a LEASE adviser to get in touch, add your details.',
    why:
      "We only use your name and email to reply to this enquiry — nothing else. In this prototype, they're not saved.",
    nameLabel: 'Your name',
    emailLabel: 'Your email address',
    submit: 'Request a callback',
    success:
      'Thanks — an adviser can follow up. (Prototype: your details were not saved.)',
  },
  feedback: {
    question: 'Was this helpful?',
    yes: 'Yes',
    no: 'No',
    commentLabel: 'How could this be more helpful? (optional)',
    success: 'Thanks for your feedback.',
  },
  card: {
    whyHeading: 'Why this may be relevant',
    nextHeading: 'What you can do next',
    verifiedPrefix: 'Guidance last checked',
  },
  errorSummaryHeading: 'Check your answers',
  validation: {
    invalid_mode: 'Choose a topic, or describe your problem in your own words.',
    invalid_scenario_count: 'Select one or two scenarios.',
    invalid_scenario_ids:
      'One or more scenario choices could not be recognised. Choose them again.',
    conflicting_fields:
      'Choose scenarios or describe your situation in your own words—not both.',
    invalid_request: 'We could not read your answers. Go back and try again.',
    blank_text: 'Describe your situation before continuing.',
    text_too_long: 'Shorten your description to 1,000 characters or fewer.',
    name_required: 'Enter your name.', // DRAFT
    email_invalid: 'Enter a valid email address.', // DRAFT
    helpful_required: 'Select Yes or No.', // DRAFT
  } as Record<string, string>,
  serviceError: {
    heading: 'We could not check your enquiry',
    body: 'There was a problem with the service. Try again, or contact LEASE for guidance.',
    tryAgain: 'Try again',
    contact: 'Contact LEASE',
    contactUrl: CONTACT_URL,
  },
}
