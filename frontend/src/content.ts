// Static UI chrome, mirrored from docs/content.md — keep in sync. Result-card
// copy and scenario labels come from the API, not from here.
//
// NOTE: two strings marked DRAFT are not yet in content.md (it has no guided
// picker heading/hint). See docs/running-notes.md — promote them to content.md
// once confirmed.

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
  },
  nav: {
    back: 'Back',
    continueLabel: 'Continue',
    skip: 'Skip',
    startAgain: 'Start again',
  },
  picker: {
    heading: 'Choose the option that best matches your situation', // DRAFT
    hint: 'Select one or two options.', // DRAFT
    submit: 'Show relevant guidance',
    notSure: 'I’m not sure / something else',
  },
  freeText: {
    heading: 'Before you describe your situation',
    privacy:
      'Do not include names, addresses, contact details, reference numbers or information about other people. When you continue, your description is sent to this prototype to suggest relevant guidance. It is not added to an account or enquiry history.',
    label: 'Describe your situation',
    hint: 'Briefly describe the main issue in your own words. You do not need to use legal terms. Maximum 1,000 characters.',
    maxLength: 1000,
    submit: 'Show relevant guidance',
    back: 'Back',
    // One example per topic so the guidance is relevant whatever the enquiry. DRAFT.
    examplesLabel: 'For example:',
    examples: [
      'My service charge has gone up a lot this year and I don’t understand why.',
      'The lift in my block has been broken for weeks and the managing agent isn’t fixing it.',
      'My lease has about 80 years left and I want to know how to extend it.',
    ],
  },
  results: {
    contact: 'Contact LEASE',
    contactUrl: 'https://www.lease-advice.org/about-us/get-in-touch/',
    changeAnswers: 'Change your answers', // DRAFT
  },
  // DRAFT: callback/feedback copy is not yet in content.md. See running-notes.
  callback: {
    heading: 'Ask an adviser to contact you',
    intro:
      'Optional. If you would like a LEASE adviser to get in touch, add your details.',
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
    submit: 'Send feedback',
    success: 'Thanks for your feedback.',
  },
  fallbackActions: {
    edit: 'Edit description',
    choose: 'Choose from common scenarios',
    contact: 'Contact LEASE',
  },
  card: {
    whyHeading: 'Why this may be relevant',
    nextHeading: 'What you can do next',
    verifiedPrefix: 'Guidance last checked',
  },
  errorSummaryHeading: 'Check your answers',
  validation: {
    invalid_mode:
      'Choose a common scenario or select ‘I’m not sure / something else’.',
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
    contactUrl: 'https://www.lease-advice.org/about-us/get-in-touch/',
  },
}
