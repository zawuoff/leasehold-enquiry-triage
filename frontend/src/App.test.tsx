import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import App from './App'

afterEach(() => vi.unstubAllGlobals())

describe('App', () => {
  it('renders the main heading and a start button', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Leasehold enquiry triage',
    )
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
  })

  it('has no axe accessibility violations', async () => {
    const { container } = render(<App />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('shows the backend message after clicking Start', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ status: 'ok', result: null, message: 'Stub reply' }),
      }),
    )
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /start/i }))

    expect(await screen.findByText('Stub reply')).toBeInTheDocument()
  })

  it('shows an error message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /start/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })
})
