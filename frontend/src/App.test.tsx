import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { axe } from 'vitest-axe'
import App from './App'
import theme from './theme'

const TOPICS = [
  { key: 'COSTS_AND_CHARGES', label: 'Costs and charges' },
  { key: 'REPAIRS_AND_BUILDING_MANAGEMENT', label: 'Repairs and building management' },
  { key: 'LEASE_EXTENSION', label: 'Lease extension' },
]

const SCENARIOS = [
  { id: 'service-charge', label: 'My service charge bill', topic: 'COSTS_AND_CHARGES' },
  { id: 'ground-rent', label: 'My ground rent demand', topic: 'COSTS_AND_CHARGES' },
  { id: 'major-works', label: 'A major works bill', topic: 'COSTS_AND_CHARGES' },
  { id: 'lease-extension', label: 'Extend my lease', topic: 'LEASE_EXTENSION' },
]

const MATCHED = {
  outcome: 'matched',
  topics: [
    {
      topic: 'COSTS_AND_CHARGES',
      label: 'Costs and charges',
      heading: 'This may relate to costs and charges.',
      warning: null,
      cards: [
        {
          scenario_id: 'service-charge',
          scenario: 'My service charge bill',
          why: 'why one',
          next_step: 'next one',
          link: { label: 'Read costs and charges guidance', url: 'https://example.test/1' },
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

function installFetch(triage: () => unknown, opts: { callback?: () => unknown } = {}) {
  const ack = () => jsonResponse({ status: 'received' })
  const fetchMock = vi.fn(async (url: string) => {
    if (String(url).endsWith('/api/scenarios')) {
      return jsonResponse({ topics: TOPICS, scenarios: SCENARIOS })
    }
    if (String(url).endsWith('/api/triage')) return triage()
    if (String(url).endsWith('/api/callback')) return (opts.callback ?? ack)()
    if (String(url).endsWith('/api/feedback')) return ack()
    throw new Error(`unexpected url ${url}`)
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

function renderApp() {
  return render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  )
}

const continueBtn = () => screen.getByRole('button', { name: /continue/i })

async function chooseTopic(user: ReturnType<typeof userEvent.setup>, name: RegExp) {
  await user.click(await screen.findByRole('radio', { name }))
  await user.click(continueBtn())
}

async function gotoResult(user: ReturnType<typeof userEvent.setup>) {
  await chooseTopic(user, /costs and charges/i)
  await user.click(await screen.findByRole('checkbox', { name: /my service charge bill/i }))
  await user.click(continueBtn())
  await screen.findByRole('heading', { name: /what we found/i })
}

afterEach(() => vi.unstubAllGlobals())

describe('describe step', () => {
  it('renders the app bar, toggle and topic options', async () => {
    installFetch(() => jsonResponse(MATCHED))
    renderApp()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Leasehold Advisory Service',
    )
    expect(await screen.findByRole('radio', { name: /costs and charges/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /describe your problem/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /describe in your own words/i }),
    ).toBeInTheDocument()
  })
})

describe('situation step', () => {
  it('narrows to the chosen topic and enforces two selections', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    renderApp()
    await chooseTopic(user, /costs and charges/i)
    await user.click(await screen.findByRole('checkbox', { name: /my service charge bill/i }))
    await user.click(screen.getByRole('checkbox', { name: /my ground rent demand/i }))
    expect(screen.getByRole('checkbox', { name: /a major works bill/i })).toBeDisabled()
    // a lease-extension scenario is a different topic, so it is not shown here
    expect(screen.queryByRole('checkbox', { name: /extend my lease/i })).toBeNull()
  })
})

describe('journey', () => {
  it('guided selection advances to the result step', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    renderApp()
    await gotoResult(user)
    expect(screen.getByText('why one')).toBeInTheDocument()
  })

  it('free-text tab goes straight to the result (no details step)', async () => {
    installFetch(() => jsonResponse(FALLBACK))
    const user = userEvent.setup()
    renderApp()
    await screen.findByRole('radio', { name: /costs and charges/i })
    await user.click(screen.getByRole('button', { name: /describe in your own words/i }))
    await user.type(screen.getByLabelText('Describe your situation'), 'the weather')
    await user.click(continueBtn())
    expect(
      await screen.findByRole('heading', { name: /could not match your question/i }),
    ).toBeInTheDocument()
  })

  it('walks result → next steps → feedback and acknowledges instantly', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    renderApp()
    await gotoResult(user)
    await user.click(continueBtn()) // -> next steps
    await screen.findByRole('heading', { name: /your next steps/i })
    await user.click(continueBtn()) // -> feedback
    await screen.findByRole('heading', { name: /was this helpful/i })
    await user.click(screen.getByRole('button', { name: /^yes$/i }))
    expect(await screen.findByText('Thanks for your feedback.')).toBeInTheDocument()
  })

  it('preserves the situation selection when going Back from the result', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    renderApp()
    await gotoResult(user)
    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(
      await screen.findByRole('checkbox', { name: /my service charge bill/i }),
    ).toBeChecked()
  })
})

describe('adviser callback', () => {
  it('submits and shows acknowledgement', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    renderApp()
    await gotoResult(user)
    await user.click(continueBtn())
    await user.type(screen.getByLabelText('Your name'), 'Sam')
    await user.type(screen.getByLabelText('Your email address'), 'sam@example.com')
    await user.click(screen.getByRole('button', { name: /request a callback/i }))
    expect(await screen.findByText(/an adviser can follow up/i)).toBeInTheDocument()
  })

  it('shows a message when the email is invalid', async () => {
    installFetch(() => jsonResponse(MATCHED), {
      callback: () =>
        jsonResponse(
          { error: { code: 'email_invalid', field: 'email' } },
          { ok: false, status: 400 },
        ),
    })
    const user = userEvent.setup()
    renderApp()
    await gotoResult(user)
    await user.click(continueBtn())
    await user.type(screen.getByLabelText('Your name'), 'Sam')
    await user.type(screen.getByLabelText('Your email address'), 'nope')
    await user.click(screen.getByRole('button', { name: /request a callback/i }))
    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument()
  })
})

describe('accessibility', () => {
  it('has no axe violations on the topic step', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const { container } = renderApp()
    await screen.findByRole('radio', { name: /costs and charges/i })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations on the result step', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    const { container } = renderApp()
    await gotoResult(user)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations on the free-text screen (incl. example association)', async () => {
    installFetch(() => jsonResponse(MATCHED))
    const user = userEvent.setup()
    const { container } = renderApp()
    await screen.findByRole('radio', { name: /costs and charges/i })
    await user.click(screen.getByRole('button', { name: /describe in your own words/i }))
    expect(await axe(container)).toHaveNoViolations()
  })
})
