import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2rem' }}>
        Leasehold enquiry triage
      </Typography>
      <Typography variant="body1" gutterBottom>
        Describe your leasehold problem and get a clearer next step.
      </Typography>
      <Button variant="contained">Start</Button>
    </Container>
  )
}

export default App
