import type { ReactElement } from 'react'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { tokens } from '../theme'

function Tag({ children }: { children: string }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        bgcolor: tokens.border,
        color: tokens.slate,
        fontSize: 12,
        fontWeight: 600,
        borderRadius: '20px',
        px: '10px',
        py: '4px',
      }}
    >
      {children}
    </Box>
  )
}

interface Props {
  control: ReactElement
  label: string
  tag?: string
  selected: boolean
}

// A Variant A option row: control + label (+ optional topic tag), navy border and
// tinted background when selected.
export default function OptionRow({ control, label, tag, selected }: Props) {
  return (
    <FormControlLabel
      sx={{
        m: 0,
        width: '100%',
        gap: '14px',
        px: '18px',
        py: '16px',
        borderRadius: '12px',
        border: `1.5px solid ${selected ? tokens.navy : tokens.border}`,
        bgcolor: selected ? tokens.selectedTint : tokens.white,
        '& .MuiFormControlLabel-label': { flex: 1 },
      }}
      control={control}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 600, color: tokens.navy }}>
            {label}
          </Typography>
          {tag && <Tag>{tag}</Tag>}
        </Box>
      }
    />
  )
}

// Shared custom control icons (square check for checkboxes, ringed dot for radios).
export const uncheckedIcon = (
  <Box sx={{ width: 22, height: 22, borderRadius: '6px', border: `1.5px solid ${tokens.muted}` }} />
)

export const checkedIcon = (
  <Box
    sx={{
      width: 22,
      height: 22,
      borderRadius: '6px',
      bgcolor: tokens.navy,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M5 12.5L10 17.5L19 7"
        fill="none"
        stroke={tokens.cyan}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
)

export const radioIcon = (
  <Box sx={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${tokens.muted}` }} />
)

export const radioCheckedIcon = (
  <Box
    sx={{
      width: 22,
      height: 22,
      borderRadius: '50%',
      bgcolor: tokens.navy,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: tokens.cyan }} />
  </Box>
)
