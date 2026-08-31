import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import App from './App'

describe('App', () => {
  it('renders the main heading and a start button', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('heading', { level: 1 })).toHaveTextContent(
      'Leasehold enquiry triage',
    )
    expect(getByRole('button', { name: /start/i })).toBeInTheDocument()
  })

  it('has no axe accessibility violations', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
