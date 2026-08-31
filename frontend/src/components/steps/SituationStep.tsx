import { useEffect, useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import StepCard from '../StepCard'
import OptionRow, { uncheckedIcon, checkedIcon } from '../OptionRow'
import { copy } from '../../content'
import { tokens } from '../../theme'
import type { Scenario } from '../../api/triage'

const MAX_SELECTED = 2

interface Props {
  scenarios: Scenario[] // already filtered to the chosen topic
  initialSelected: string[]
  loading: boolean
  errorMessage: string | null
  onBack: () => void
  onSubmit: (ids: string[]) => void
}

export default function SituationStep({
  scenarios,
  initialSelected,
  loading,
  errorMessage,
  onBack,
  onSubmit,
}: Props) {
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errorMessage) errorRef.current?.focus()
  }, [errorMessage])

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const atMax = selected.length >= MAX_SELECTED

  return (
    <StepCard
      title={copy.situationStep.heading}
      onBack={onBack}
      onContinue={() => onSubmit(selected)}
      continueDisabled={selected.length === 0}
      busy={loading}
    >
      {errorMessage && (
        <Alert severity="error" ref={errorRef} tabIndex={-1} sx={{ mb: 3, outline: 'none' }}>
          <strong>{copy.errorSummaryHeading}</strong>
          <div>{errorMessage}</div>
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.25 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: tokens.muted }}>
          {copy.situationStep.selectUpToTwo}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {scenarios.map((scenario) => {
          const checked = selected.includes(scenario.id)
          return (
            <OptionRow
              key={scenario.id}
              selected={checked}
              label={scenario.label}
              control={
                <Checkbox
                  icon={uncheckedIcon}
                  checkedIcon={checkedIcon}
                  checked={checked}
                  onChange={() => toggle(scenario.id)}
                  disabled={loading || (!checked && atMax)}
                  sx={{ p: 0 }}
                />
              }
            />
          )
        })}
      </Box>
    </StepCard>
  )
}
