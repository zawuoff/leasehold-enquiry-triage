import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ScenarioPicker from './components/ScenarioPicker'
import TriageResults from './components/TriageResults'
import ServiceError from './components/ServiceError'
import { copy } from './content'
import {
  getScenarios,
  postGuidedTriage,
  TriageValidationError,
  type Scenario,
  type TriageResult,
} from './api/triage'

type Step = 'picker' | 'results'

function App() {
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null)
  const [step, setStep] = useState<Step>('picker')
  const [result, setResult] = useState<TriageResult | null>(null)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [serviceError, setServiceError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lastIds, setLastIds] = useState<string[] | null>(null)

  useEffect(() => {
    void loadScenarios()
  }, [])

  async function loadScenarios() {
    setServiceError(false)
    try {
      setScenarios(await getScenarios())
    } catch {
      setServiceError(true)
    }
  }

  async function submit(ids: string[]) {
    setLoading(true)
    setValidationMessage(null)
    setServiceError(false)
    setLastIds(ids)
    try {
      const response = await postGuidedTriage(ids)
      setResult(response)
      setStep('results')
    } catch (error) {
      if (error instanceof TriageValidationError) {
        setValidationMessage(
          copy.validation[error.code] ?? copy.validation.invalid_request,
        )
        setStep('picker')
      } else {
        setServiceError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  function retry() {
    if (lastIds) void submit(lastIds)
    else void loadScenarios()
  }

  let content
  if (serviceError) {
    content = <ServiceError onRetry={retry} retrying={loading} />
  } else if (step === 'results' && result) {
    content = <TriageResults result={result} />
  } else if (scenarios) {
    content = (
      <ScenarioPicker
        scenarios={scenarios}
        onSubmit={submit}
        loading={loading}
        errorMessage={validationMessage}
      />
    )
  } else {
    content = <Typography component="p">Loading…</Typography>
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: '2rem' }}
      >
        {copy.appTitle}
      </Typography>
      {content}
    </Container>
  )
}

export default App
