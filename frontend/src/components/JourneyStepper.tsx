import { Fragment } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '../theme'

export interface StepDef {
  label: string
  sub: string
}

interface Props {
  steps: StepDef[]
  activeStep: number
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M5 12.5L10 17.5L19 7"
        fill="none"
        stroke={tokens.cyan}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function JourneyStepper({ steps, activeStep }: Props) {
  return (
    <Box
      component="nav"
      aria-label="Progress"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: 920,
        mx: 'auto',
        px: 2,
      }}
    >
      {steps.map((step, index) => {
        const state =
          index < activeStep ? 'done' : index === activeStep ? 'active' : 'upcoming'
        const isUpcoming = state === 'upcoming'
        return (
          <Fragment key={step.label}>
            <Box
              sx={{ width: { xs: 44, sm: 150 }, flexShrink: 0 }}
              aria-current={state === 'active' ? 'step' : undefined}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  mx: 'auto',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: isUpcoming ? 600 : 700,
                  ...(isUpcoming
                    ? {
                        bgcolor: tokens.white,
                        border: `2px solid ${tokens.border}`,
                        color: tokens.muted,
                      }
                    : {
                        bgcolor: tokens.navy,
                        color: tokens.white,
                        ...(state === 'active'
                          ? { boxShadow: `0 0 0 4px ${tokens.cyan}73` }
                          : {}),
                      }),
                }}
              >
                {state === 'done' ? <Check /> : index + 1}
              </Box>
              <Typography
                sx={{
                  mt: 1.5,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: isUpcoming ? 600 : 700,
                  color: isUpcoming ? tokens.muted : tokens.navy,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {step.label}
              </Typography>
              <Typography
                sx={{
                  mt: '2px',
                  textAlign: 'center',
                  fontSize: 12,
                  color: tokens.muted,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {step.sub}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box
                sx={{ flex: 1, height: 2, bgcolor: tokens.border, mt: '18px', minWidth: 12 }}
              />
            )}
          </Fragment>
        )
      })}
    </Box>
  )
}
