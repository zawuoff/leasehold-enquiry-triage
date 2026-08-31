import { useEffect, useRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import { tokens } from '../theme'
import { ChevronLeft, ChevronRight } from './icons'

interface Props {
  title: string
  subtitle?: string
  children: ReactNode
  onBack?: () => void
  onContinue?: () => void
  continueLabel?: string
  continueDisabled?: boolean
  busy?: boolean
}

export default function StepCard({
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  continueLabel = copy.nav.continueLabel,
  continueDisabled,
  busy,
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 720,
        mx: 'auto',
        border: `1px solid ${tokens.border}`,
        borderRadius: '16px',
        boxShadow: `0 1px 2px ${tokens.navy}0A`,
        px: { xs: 3, sm: 6 },
        py: { xs: 4, sm: 5 },
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        tabIndex={-1}
        ref={headingRef}
        sx={{ outline: 'none' }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: 16, lineHeight: '24px' }}>
          {subtitle}
        </Typography>
      )}

      <Box sx={{ mt: 3.5 }}>{children}</Box>

      {(onBack || onContinue) && (
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            {onBack && (
              <Button
                onClick={onBack}
                disabled={busy}
                variant="text"
                startIcon={<ChevronLeft />}
                sx={{ color: 'text.secondary', fontWeight: 600, px: 1 }}
              >
                {copy.nav.back}
              </Button>
            )}
          </Box>
          {onContinue && (
            <Button
              onClick={onContinue}
              disabled={continueDisabled || busy}
              variant="contained"
              endIcon={<ChevronRight />}
            >
              {busy ? 'Checking…' : continueLabel}
            </Button>
          )}
        </Box>
      )}
    </Paper>
  )
}
