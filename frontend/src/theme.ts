import { createTheme } from '@mui/material/styles'

// Palette from the Paper "Variant A — Clarity" frame.
//
// Contrast note: the original muted grey (#7FA1B0) failed WCAG 2.2 AA — 2.75:1 as
// text on white and 4.18:1 as the strapline on navy. One token can't serve both a
// light and a navy ground, so it's split: `muted` (dark enough for light
// backgrounds) and `strapline` (light enough for navy). See theme.contrast.test.ts.
export const tokens = {
  navy: '#003A6D',
  slate: '#45607A',
  muted: '#54737F', // on light bg: 5.08:1 on white, 4.82:1 on #F9F9F8 (text + control borders)
  strapline: '#93B2C0', // on navy: 5.13:1 (app-bar strapline only)
  cyan: '#77D5EA',
  border: '#DDE2E9', // decorative container/card/stepper borders only (not a control indicator)
  page: '#F9F9F8',
  selectedTint: '#F4FAFC',
  white: '#FFFFFF',
}

const theme = createTheme({
  palette: {
    primary: { main: tokens.navy, contrastText: tokens.white },
    secondary: { main: tokens.cyan, contrastText: tokens.navy },
    background: { default: tokens.page, paper: tokens.white },
    text: { primary: tokens.navy, secondary: tokens.slate },
    divider: tokens.border,
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    // app-bar brand
    h1: { fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: '20px' },
    // step card heading
    h2: { fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: '34px' },
    h3: { fontSize: '18px', fontWeight: 700, lineHeight: '24px' },
    body1: { fontSize: '16px', lineHeight: '24px' },
    button: { textTransform: 'none', fontWeight: 700, fontSize: '16px' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingBlock: '13px', paddingInline: '28px' },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiLink: {
      styleOverrides: {
        root: {
          color: tokens.navy,
          fontWeight: 600,
          textUnderlineOffset: '3px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
  },
})

export default theme
