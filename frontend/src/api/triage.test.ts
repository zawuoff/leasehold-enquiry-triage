import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  getScenarios,
  postGuidedTriage,
  postFreeTextTriage,
  postCallback,
  postFeedback,
  TriageValidationError,
} from './triage'

afterEach(() => vi.unstubAllGlobals())

describe('getScenarios', () => {
  it('returns topics and scenarios', async () => {
    const body = {
      topics: [{ key: 'T', label: 'T label' }],
      scenarios: [{ id: 'a', label: 'A', topic: 'T' }],
    }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => body }))
    expect(await getScenarios()).toEqual(body)
  })

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(getScenarios()).rejects.toThrow(/500/)
  })
})

describe('postGuidedTriage', () => {
  it('posts the guided payload and returns the parsed result', async () => {
    const result = { outcome: 'matched', topics: [] }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => result,
    })
    vi.stubGlobal('fetch', fetchMock)

    expect(await postGuidedTriage(['lease-extension'])).toEqual(result)
    const [, options] = fetchMock.mock.calls[0]
    expect(JSON.parse(options.body)).toEqual({
      mode: 'guided',
      scenario_ids: ['lease-extension'],
    })
  })

  it('throws TriageValidationError on a 400 with the code', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          error: { code: 'invalid_scenario_count', field: 'scenario_ids' },
        }),
      }),
    )
    await expect(postGuidedTriage([])).rejects.toBeInstanceOf(TriageValidationError)
  })

  it('throws a generic error on a 500', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(postGuidedTriage(['lease-extension'])).rejects.toThrow(/500/)
  })
})

describe('postFreeTextTriage', () => {
  it('posts the free-text payload and returns the matched result', async () => {
    const result = { outcome: 'matched', topics: [] }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => result,
    })
    vi.stubGlobal('fetch', fetchMock)

    expect(await postFreeTextTriage('my service charge')).toEqual(result)
    const [, options] = fetchMock.mock.calls[0]
    expect(JSON.parse(options.body)).toEqual({
      mode: 'free_text',
      free_text: 'my service charge',
    })
  })

  it('returns a fallback outcome unchanged', async () => {
    const result = { outcome: 'fallback', fallback: { heading: 'x' } }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => result }),
    )
    expect((await postFreeTextTriage('nonsense')).outcome).toBe('fallback')
  })

  it('throws TriageValidationError on a 400', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: { code: 'blank_text', field: 'free_text' } }),
      }),
    )
    await expect(postFreeTextTriage('')).rejects.toBeInstanceOf(TriageValidationError)
  })
})

describe('postCallback / postFeedback', () => {
  it('posts callback details and returns the acknowledgement', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: 'received' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    expect(await postCallback({ name: 'Sam', email: 'sam@example.com' })).toEqual({
      status: 'received',
    })
    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/callback')
  })

  it('throws TriageValidationError when callback validation fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: { code: 'email_invalid', field: 'email' } }),
      }),
    )
    await expect(
      postCallback({ name: 'Sam', email: 'nope' }),
    ).rejects.toBeInstanceOf(TriageValidationError)
  })

  it('posts feedback and returns the acknowledgement', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: 'received' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    expect(await postFeedback({ helpful: true, comment: 'clear' })).toEqual({
      status: 'received',
    })
    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/feedback')
  })
})
