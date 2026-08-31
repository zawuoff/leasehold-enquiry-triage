import { Fragment } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { tokens } from '../theme'

export interface StepDef {
  label: string
  sub: string
}

interface Props {
  steps: StepDef[]
  activeStep: number
}

// Small tick badge shown on the corner of a completed step's number.
function DoneBadge() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: -3,
        right: -3,
        width: 17,
        height: 17,
        borderRadius: '50%',
        bgcolor: tokens.cyan,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 0 2px ${tokens.page}`,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M5 12.5L10 17.5L19 7"
          fill="none"
          stroke={tokens.navy}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
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
              <Box sx={{ position: 'relative', width: 38, height: 38, mx: 'auto' }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
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
                  {index + 1}
                </Box>
                {state === 'done' && <DoneBadge />}
                {state === 'done' && (
                  <Box component="span" sx={visuallyHidden}>
                    Completed
                  </Box>
                )}
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
