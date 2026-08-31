export interface Scenario {
  id: string
  label: string
  topic: string
}

export interface Topic {
  key: string
  label: string
}

export interface ScenariosResponse {
  topics: Topic[]
  scenarios: Scenario[]
}

export interface TriageLink {
  label: string
  url: string
}

export interface TriageCard {
  scenario_id?: string // omitted for free-text cards
  scenario?: string // omitted for free-text cards
  why: string
  next_step: string
  link: TriageLink
  verified: string
}

export interface TriageFallback {
  heading: string
  body: string
  next_step: string
  contact_url: string
  verified: string
}

export interface TriageWarning {
  text: string
  source: string
  verified: string
}

export interface TriageTopic {
  topic: string
  label: string
  heading: string
  warning: TriageWarning | null
  cards: TriageCard[]
}

export interface TriageResult {
  outcome: 'matched' | 'fallback'
  topics?: TriageTopic[]
  fallback?: TriageFallback
}

/** A 400 from the API, carrying a stable code the UI maps to a message. */
export class TriageValidationError extends Error {
  code: string
  field: string | null

  constructor(code: string, field: string | null) {
    super(code)
    this.name = 'TriageValidationError'
    this.code = code
    this.field = field
  }
}

export async function getScenarios(): Promise<ScenariosResponse> {
  const response = await fetch('/api/scenarios')
  if (!response.ok) {
    throw new Error(`Scenarios request failed (${response.status})`)
  }
  return (await response.json()) as ScenariosResponse
}

async function postJson<T>(url: string, payload: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (response.status === 400) {
    const body = await response.json().catch(() => null)
    const error = body?.error ?? { code: 'invalid_request', field: null }
    throw new TriageValidationError(error.code, error.field ?? null)
  }
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return (await response.json()) as T
}

export function postGuidedTriage(scenarioIds: string[]): Promise<TriageResult> {
  return postJson<TriageResult>('/api/triage', {
    mode: 'guided',
    scenario_ids: scenarioIds,
  })
}

export function postFreeTextTriage(freeText: string): Promise<TriageResult> {
  return postJson<TriageResult>('/api/triage', {
    mode: 'free_text',
    free_text: freeText,
  })
}

export interface Acknowledgement {
  status: string
}

export interface CallbackRequest {
  name: string
  email: string
  topic?: string
}

export interface FeedbackRequest {
  helpful: boolean
  comment?: string
}

export function postCallback(request: CallbackRequest): Promise<Acknowledgement> {
  return postJson<Acknowledgement>('/api/callback', request)
}

export function postFeedback(request: FeedbackRequest): Promise<Acknowledgement> {
  return postJson<Acknowledgement>('/api/feedback', request)
}
