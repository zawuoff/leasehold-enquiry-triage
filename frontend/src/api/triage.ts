export interface TriageResponse {
  status: string
  result: unknown | null
  message: string
}

/**
 * Calls the backend triage endpoint. Uses a relative URL so the Vite dev proxy
 * (and, in a real deployment, the same origin) routes it to Django.
 */
export async function postTriage(
  payload: unknown,
): Promise<TriageResponse> {
  const response = await fetch('/api/triage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Triage request failed (${response.status})`)
  }

  return (await response.json()) as TriageResponse
}
