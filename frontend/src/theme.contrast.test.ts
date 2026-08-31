import { describe, it, expect } from 'vitest'
import { tokens } from './theme'

// Why this test exists:
// axe's colour-contrast rule cannot run under jsdom — jsdom does not paint pixels
// or resolve rendered colours (HTMLCanvasElement.getContext is unimplemented), so
// our vitest-axe smoke tests silently skip contrast. A low-contrast muted grey
// (#7FA1B0, 2.75:1 on white) therefore shipped and passed axe; it was only caught
// by measuring the ratios by hand. This test computes the ratios directly so a
// failing token pair breaks CI instead of slipping through.

// WCAG 2.1 relative luminance + contrast ratio.
function luminance(hex: string): number {
  const h = hex.replace('#', '')
  const channels = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  const [r, g, b] = channels
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
function ratio(a: string, b: string): number {
  const l1 = luminance(a)
  const l2 = luminance(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

const { navy, slate, muted, strapline, page, selectedTint, white } = tokens

// Text needs 4.5:1 (nothing we render is large-scale).
const TEXT_PAIRS: Array<[string, string, string]> = [
  ['navy on white', navy, white],
  ['navy on page', navy, page],
  ['navy on selected tint', navy, selectedTint],
  ['slate on white', slate, white],
  ['slate on page', slate, page],
  ['muted on white', muted, white],
  ['muted on page', muted, page],
  ['muted on selected tint', muted, selectedTint],
  ['white on navy', white, navy],
  ['strapline on navy', strapline, navy],
]

// Interactive control borders need 3:1: unchecked checkbox/radio borders (muted)
// sit on the white or selected-tint row background; the selected row uses a navy
// border on the tint.
const BORDER_PAIRS: Array<[string, string, string]> = [
  ['unchecked control border on white', muted, white],
  ['unchecked control border on selected tint', muted, selectedTint],
  ['selected control border (navy) on tint', navy, selectedTint],
]

describe('token contrast (WCAG 2.2 AA)', () => {
  it.each(TEXT_PAIRS)('%s meets 4.5:1 for text', (_label, fg, bg) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it.each(BORDER_PAIRS)('%s meets 3:1 for control borders', (_label, fg, bg) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(3)
  })
})
