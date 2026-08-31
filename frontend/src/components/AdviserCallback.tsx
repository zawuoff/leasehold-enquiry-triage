import { useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { copy } from '../content'

// Prototype stub: both fields are optional, an email is format-checked only if
// one is given, and nothing is sent anywhere or stored.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export default function AdviserCallback() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      setError(copy.validation.email_invalid)
      return
    }
    setError(null)
    setDone(true)
  }

  return (
    <Box component="section" aria-labelledby="callback-heading" sx={{ mt: 4 }}>
      <Typography id="callback-heading" variant="h3" component="h3" sx={{ mb: 1 }}>
        {copy.callback.heading}
      </Typography>

      {done ? (
        <Alert severity="success" role="status">
          {copy.callback.success}
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <Typography component="p" sx={{ mb: 1 }}>
            {copy.callback.intro}
          </Typography>
          <Typography component="p" sx={{ mb: 2, color: 'text.secondary', fontSize: 14 }}>
            {copy.callback.stub}
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
          />
          <TextField
            label={copy.callback.emailLabel}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="outlined">
            {copy.callback.submit}
          </Button>
        </form>
      )}
    </Box>
  )
}
