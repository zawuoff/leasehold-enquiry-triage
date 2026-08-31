import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ScenarioPicker from './components/ScenarioPicker'
import FreeTextEntry from './components/FreeTextEntry'
import TriageResults from './components/TriageResults'
import Fallback from './components/Fallback'
import ServiceError from './components/ServiceError'
import { copy } from './content'
import {
  getScenarios,
  postGuidedTriage,
  postFreeTextTriage,
  TriageValidationError,
  type Scenario,
  type TriageFallback,
  type TriageResult,
  type TriageTopic,
} from './api/triage'

type Step = 'picker' | 'freetext' | 'results' | 'fallback'
type LastRequest =
  | { kind: 'load' }
  | { kind: 'guided'; ids: string[] }
  | { kind: 'freetext'; text: string }

function App() {
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null)
  const [step, setStep] = useState<Step>('picker')
  const [topics, setTopics] = useState<TriageTopic[]>([])
  const [fallback, setFallback] = useState<TriageFallback | null>(null)
  const [freeText, setFreeText] = useState('')
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [serviceError, setServiceError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lastRequest, setLastRequest] = useState<LastRequest>({ kind: 'load' })

  useEffect(() => {
    void loadScenarios()
  }, [])

  async function loadScenarios() {
    setServiceError(false)
    setLastRequest({ kind: 'load' })
    try {
      setScenarios(await getScenarios())
    } catch {
      setServiceError(true)
    }
  }

  async function runTriage(
    request: LastRequest,
    call: () => Promise<TriageResult>,
  ) {
    setLoading(true)
    setValidationMessage(null)
    setServiceError(false)
    setLastRequest(request)
    try {
      const result = await call()
      if (result.outcome === 'fallback' && result.fallback) {
        setFallback(result.fallback)
        setStep('fallback')
      } else {
        setTopics(result.topics ?? [])
        setStep('results')
      }
    } catch (error) {
      if (error instanceof TriageValidationError) {
        setValidationMessage(
          copy.validation[error.code] ?? copy.validation.invalid_request,
        )
      } else {
        setServiceError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  function submitGuided(ids: string[]) {
    void runTriage({ kind: 'guided', ids }, () => postGuidedTriage(ids))
  }

  function submitFreeText(text: string) {
    setFreeText(text)
    void runTriage({ kind: 'freetext', text }, () => postFreeTextTriage(text))
  }

  function chooseFreeText() {
    setValidationMessage(null)
    setServiceError(false)
    setStep('freetext')
  }

  function retry() {
    if (lastRequest.kind === 'guided') submitGuided(lastRequest.ids)
    else if (lastRequest.kind === 'freetext') submitFreeText(lastRequest.text)
    else void loadScenarios()
  }

  let content
  if (serviceError) {
    content = <ServiceError onRetry={retry} retrying={loading} />
  } else if (step === 'results') {
    content = <TriageResults topics={topics} />
  } else if (step === 'fallback' && fallback) {
    content = (
      <Fallback
        fallback={fallback}
        onEdit={() => {
          setValidationMessage(null)
          setStep('freetext')
        }}
        onChooseScenarios={() => {
          setValidationMessage(null)
          setStep('picker')
        }}
      />
    )
  } else if (step === 'freetext') {
    content = (
      <FreeTextEntry
        initialText={freeText}
        onSubmit={submitFreeText}
        loading={loading}
        errorMessage={validationMessage}
      />
    )
  } else if (scenarios) {
    content = (
      <ScenarioPicker
        scenarios={scenarios}
        onSubmit={submitGuided}
        onChooseFreeText={chooseFreeText}
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
