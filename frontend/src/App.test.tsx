import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import App from './App'

const SCENARIOS = [
  { id: 'service-charge-major-works', label: 'Service charge or major works bill' },
  { id: 'ground-rent-demand', label: 'Ground rent demand' },
  { id: 'lease-extension', label: 'Extend my lease' },
]

const COSTS_RESULT = {
  outcome: 'matched',
  topics: [
    {
      topic: 'COSTS_AND_CHARGES',
      label: 'Costs and charges',
      heading: 'This may relate to costs and charges.',
      warning: { text: 'Urgent warning text', source: '', verified: '30 August 2026' },
      cards: [
        {
          scenario_id: 'service-charge-major-works',
          scenario: 'Service charge bill',
          why: 'why one',
          next_step: 'next one',
          link: { label: 'Read costs and charges guidance', url: 'https://example.test/1' },
          verified: '30 August 2026',
        },
        {
          scenario_id: 'ground-rent-demand',
          scenario: 'Ground rent demand',
          why: 'why two',
          next_step: 'next two',
          link: { label: 'Read costs and charges guidance', url: 'https://example.test/2' },
          verified: '30 August 2026',
        },
      ],
    },
  ],
}

const FREETEXT_MATCH = {
  outcome: 'matched',
  topics: [
    {
      topic: 'COSTS_AND_CHARGES',
      label: 'Costs and charges',
      heading: 'This may relate to costs and charges.',
      warning: null,
      cards: [
        {
          why: 'free text why',
          next_step: 'free text next',
          link: { label: 'Read costs and charges guidance', url: 'https://example.test/c' },
          verified: '30 August 2026',
        },
      ],
    },
  ],
}

const FALLBACK = {
  outcome: 'fallback',
  fallback: {
    heading: 'We could not match your question',
    body: 'fallback body',
    next_step: 'fallback next step',
    contact_url: 'https://example.test/contact',
    verified: '30 August 2026',
  },
}

function jsonResponse(body: unknown, { ok = true, status = 200 } = {}) {
  return { ok, status, json: async () => body }
}

// Routes fetch by URL; `triage` returns the response for POST /api/triage.
function installFetch(triage: () => unknown) {
  const fetchMock = vi.fn(async (url: string) => {
    if (String(url).endsWith('/api/scenarios')) {
      return jsonResponse({ scenarios: SCENARIOS })
    }
    if (String(url).endsWith('/api/triage')) {
      return triage()
    }
    throw new Error(`unexpected url ${url}`)
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => vi.unstubAllGlobals())

describe('App guided journey', () => {
  it('renders the h1 and loads the scenario options', async () => {
    installFetch(() => jsonResponse(COSTS_RESULT))
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Leasehold enquiry triage',
    )
    expect(
      await screen.findByLabelText('Service charge or major works bill'),
    ).toBeInTheDocument()
  })

  it('submits selected scenarios and renders topic cards + shared warning', async () => {
    installFetch(() => jsonResponse(COSTS_RESULT))
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      await screen.findByLabelText('Service charge or major works bill'),
    )
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))

    expect(
      await screen.findByRole('heading', {
        name: /this may relate to costs and charges/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('why one')).toBeInTheDocument()
    expect(screen.getByText('why two')).toBeInTheDocument()
    expect(screen.getByText('Urgent warning text')).toBeInTheDocument()
  })

  it('enforces a maximum of two selections', async () => {
    installFetch(() => jsonResponse(COSTS_RESULT))
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      await screen.findByLabelText('Service charge or major works bill'),
    )
    await user.click(screen.getByLabelText('Ground rent demand'))

    expect(screen.getByLabelText('Extend my lease')).toBeDisabled()
  })

  it('shows the error summary on a validation failure', async () => {
    installFetch(() =>
      jsonResponse(
        { error: { code: 'invalid_scenario_count', field: 'scenario_ids' } },
        { ok: false, status: 400 },
      ),
    )
    const user = userEvent.setup()
    render(<App />)

    await screen.findByLabelText('Service charge or major works bill')
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))

    expect(await screen.findByText('Check your answers')).toBeInTheDocument()
    expect(screen.getByText('Select one or two scenarios.')).toBeInTheDocument()
  })

  it('shows a service error when the request fails', async () => {
    installFetch(() => jsonResponse(null, { ok: false, status: 500 }))
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      await screen.findByLabelText('Service charge or major works bill'),
    )
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))

    expect(
      await screen.findByRole('heading', { name: /could not check your enquiry/i }),
    ).toBeInTheDocument()
  })

  it('has no axe violations on the picker', async () => {
    installFetch(() => jsonResponse(COSTS_RESULT))
    const { container } = render(<App />)
    await screen.findByLabelText('Service charge or major works bill')
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations on the results', async () => {
    installFetch(() => jsonResponse(COSTS_RESULT))
    const user = userEvent.setup()
    const { container } = render(<App />)
    await user.click(
      await screen.findByLabelText('Service charge or major works bill'),
    )
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))
    await screen.findByRole('heading', {
      name: /this may relate to costs and charges/i,
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('App free-text journey', () => {
  async function gotoFreeText(user: ReturnType<typeof userEvent.setup>) {
    await user.click(await screen.findByLabelText(/not sure/i))
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))
    return screen.findByRole('heading', {
      name: /before you describe your situation/i,
    })
  }

  it('routes “I’m not sure” to the free-text screen', async () => {
    installFetch(() => jsonResponse(FREETEXT_MATCH))
    const user = userEvent.setup()
    render(<App />)
    await gotoFreeText(user)
    expect(screen.getByLabelText('Describe your situation')).toBeInTheDocument()
  })

  it('submits free text and renders matched topic cards', async () => {
    installFetch(() => jsonResponse(FREETEXT_MATCH))
    const user = userEvent.setup()
    render(<App />)
    await gotoFreeText(user)
    await user.type(
      screen.getByLabelText('Describe your situation'),
      'service charge too high',
    )
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))
    expect(
      await screen.findByRole('heading', {
        name: /this may relate to costs and charges/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('free text why')).toBeInTheDocument()
  })

  it('shows the fallback with recovery actions when nothing matches', async () => {
    installFetch(() => jsonResponse(FALLBACK))
    const user = userEvent.setup()
    render(<App />)
    await gotoFreeText(user)
    await user.type(
      screen.getByLabelText('Describe your situation'),
      'the weather is nice',
    )
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))
    expect(
      await screen.findByRole('heading', { name: /could not match your question/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /choose from common scenarios/i }),
    ).toBeInTheDocument()
  })

  it('returns from the fallback to the scenario picker', async () => {
    installFetch(() => jsonResponse(FALLBACK))
    const user = userEvent.setup()
    render(<App />)
    await gotoFreeText(user)
    await user.type(screen.getByLabelText('Describe your situation'), 'nonsense')
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))
    await screen.findByRole('heading', { name: /could not match your question/i })
    await user.click(
      screen.getByRole('button', { name: /choose from common scenarios/i }),
    )
    expect(
      await screen.findByLabelText('Service charge or major works bill'),
    ).toBeInTheDocument()
  })

  it('shows a validation error for blank free text', async () => {
    installFetch(() =>
      jsonResponse(
        { error: { code: 'blank_text', field: 'free_text' } },
        { ok: false, status: 400 },
      ),
    )
    const user = userEvent.setup()
    render(<App />)
    await gotoFreeText(user)
    await user.click(screen.getByRole('button', { name: /show relevant guidance/i }))
    expect(await screen.findByText('Check your answers')).toBeInTheDocument()
    expect(
      screen.getByText('Describe your situation before continuing.'),
    ).toBeInTheDocument()
  })

  it('has no axe violations on the free-text screen', async () => {
    installFetch(() => jsonResponse(FREETEXT_MATCH))
    const user = userEvent.setup()
    const { container } = render(<App />)
    await gotoFreeText(user)
    expect(await axe(container)).toHaveNoViolations()
  })
})
