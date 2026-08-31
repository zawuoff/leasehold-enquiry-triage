import { useEffect, useRef, useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import type { Scenario } from '../api/triage'

const MAX_SELECTED = 2

interface Props {
  scenarios: Scenario[]
  onSubmit: (ids: string[]) => void
  loading: boolean
  errorMessage: string | null
}

export default function ScenarioPicker({
  scenarios,
  onSubmit,
  loading,
  errorMessage,
}: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const headingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  useEffect(() => {
    if (errorMessage) errorRef.current?.focus()
  }, [errorMessage])

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit(selected)
  }

  const atMax = selected.length >= MAX_SELECTED

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography
        variant="h2"
        component="h2"
        tabIndex={-1}
        ref={headingRef}
        sx={{ fontSize: '1.5rem', mb: 2, outline: 'none' }}
      >
        {copy.picker.heading}
      </Typography>

      {errorMessage && (
        <Alert
          severity="error"
          ref={errorRef}
          tabIndex={-1}
          sx={{ mb: 3, outline: 'none' }}
        >
          <strong>{copy.errorSummaryHeading}</strong>
          <div>{errorMessage}</div>
        </Alert>
      )}

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">{copy.picker.hint}</FormLabel>
        <FormGroup>
          {scenarios.map((scenario) => {
            const checked = selected.includes(scenario.id)
            return (
              <FormControlLabel
                key={scenario.id}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => toggle(scenario.id)}
                    disabled={loading || (!checked && atMax)}
                  />
                }
                label={scenario.label}
              />
            )
          })}
        </FormGroup>
      </FormControl>

      <div>
        <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
          {loading ? 'Checking…' : copy.picker.submit}
        </Button>
      </div>
    </form>
  )
}
