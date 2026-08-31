export interface Scenario {
  id: string
  label: string
}

export interface TriageLink {
  label: string
  url: string
}

export interface TriageCard {
  scenario_id: string
  scenario: string
  why: string
  next_step: string
  link: TriageLink
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
  outcome: string
  topics: TriageTopic[]
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

export async function getScenarios(): Promise<Scenario[]> {
  const response = await fetch('/api/scenarios')
  if (!response.ok) {
    throw new Error(`Scenarios request failed (${response.status})`)
  }
  const body = (await response.json()) as { scenarios: Scenario[] }
  return body.scenarios
}

export async function postGuidedTriage(
  scenarioIds: string[],
): Promise<TriageResult> {
  const response = await fetch('/api/triage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'guided', scenario_ids: scenarioIds }),
  })

  if (response.status === 400) {
    const body = await response.json().catch(() => null)
    const error = body?.error ?? { code: 'invalid_request', field: null }
    throw new TriageValidationError(error.code, error.field ?? null)
  }
  if (!response.ok) {
    throw new Error(`Triage request failed (${response.status})`)
  }
  return (await response.json()) as TriageResult
}
