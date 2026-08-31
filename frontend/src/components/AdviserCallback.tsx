import { useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import { postCallback, TriageValidationError } from '../api/triage'

interface Props {
  topic?: string
}

type Status = 'idle' | 'sending' | 'done' | 'error'

export default function AdviserCallback({ topic }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setStatus('sending')
    setError(null)
    try {
      await postCallback({ name, email, topic })
      setStatus('done')
    } catch (err) {
      if (err instanceof TriageValidationError) {
        setError(copy.validation[err.code] ?? copy.validation.invalid_request)
        setStatus('idle')
      } else {
        setError('Sorry, that could not be sent. Please try again.')
        setStatus('idle')
      }
    }
  }

  return (
    <Box component="section" aria-labelledby="callback-heading" sx={{ mt: 4 }}>
      <Typography
        id="callback-heading"
        variant="h3"
        component="h3"
        sx={{ mb: 1 }}
      >
        {copy.callback.heading}
      </Typography>

      {status === 'done' ? (
        <Alert severity="success" role="status">
          {copy.callback.success}
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <Typography component="p" sx={{ mb: 2 }}>
            {copy.callback.intro}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label={copy.callback.nameLabel}
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            disabled={status === 'sending'}
          />
          <TextField
            label={copy.callback.emailLabel}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            disabled={status === 'sending'}
          />
          <Button type="submit" variant="outlined" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : copy.callback.submit}
          </Button>
        </form>
      )}
    </Box>
  )
}
