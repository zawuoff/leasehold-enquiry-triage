import { describe, it, expect, vi, afterEach } from 'vitest'
import { postTriage } from './triage'

afterEach(() => vi.unstubAllGlobals())

describe('postTriage', () => {
  it('posts JSON to /api/triage and returns the parsed body', async () => {
    const body = { status: 'ok', result: null, message: 'stub' }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => body,
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await postTriage({ ping: true })

    expect(result).toEqual(body)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/triage',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
  })

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(postTriage({})).rejects.toThrow(/500/)
  })
})
