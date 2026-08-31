// Static UI chrome, mirrored from docs/content.md — keep in sync. Result-card
// copy and scenario labels come from the API, not from here.
//
// NOTE: two strings marked DRAFT are not yet in content.md (it has no guided
// picker heading/hint). See docs/running-notes.md — promote them to content.md
// once confirmed.

export const copy = {
  appTitle: 'Leasehold enquiry triage',
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
  } as Record<string, string>,
  serviceError: {
    heading: 'We could not check your enquiry',
    body: 'There was a problem with the service. Try again, or contact LEASE for guidance.',
    tryAgain: 'Try again',
    contact: 'Contact LEASE',
    contactUrl: 'https://www.lease-advice.org/about-us/get-in-touch/',
  },
}
