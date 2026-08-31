import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { postTriage } from './api/triage'

type Status = 'idle' | 'loading' | 'done' | 'error'

function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleStart() {
    setStatus('loading')
    setMessage('')
    try {
      const response = await postTriage({ ping: true })
      setMessage(response.message)
      setStatus('done')
    } catch {
      setMessage('Sorry, something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem' }}>
        Leasehold enquiry triage
      </Typography>
      <Typography variant="body1" gutterBottom>
        Describe your leasehold problem and get a clearer next step.
      </Typography>
      <Button
        variant="contained"
        onClick={handleStart}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Checking…' : 'Start'}
      </Button>

      {/* Announce the outcome to assistive tech as it arrives. */}
      <div role="status" aria-live="polite">
        {status === 'done' && (
          <Alert severity="info" sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
      </div>
    </Container>
  )
}

export default App
