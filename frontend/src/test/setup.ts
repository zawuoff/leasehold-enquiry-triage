import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'vitest-axe/matchers'

// vitest-axe ships types only via extend-expect; wire the runtime matcher here.
expect.extend({ toHaveNoViolations })
