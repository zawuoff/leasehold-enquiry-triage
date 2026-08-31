import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from './components/AppBar'
import JourneyStepper from './components/JourneyStepper'
import StepCard from './components/StepCard'
import DescribeStep, { type DescribeMode } from './components/steps/DescribeStep'
import SituationStep from './components/steps/SituationStep'
import ResultStep from './components/steps/ResultStep'
import NextStepsStep from './components/steps/NextStepsStep'
import FeedbackStep from './components/steps/FeedbackStep'
import ServiceError from './components/ServiceError'
import { copy } from './content'
import { tokens } from './theme'
import {
  getScenarios,
  postGuidedTriage,
  postFreeTextTriage,
  TriageValidationError,
  type Scenario,
  type Topic,
  type TriageResult,
} from './api/triage'

type Phase = 'describe' | 'situation' | 'result' | 'nextsteps' | 'feedback' | 'done'
type LastRequest =
  | { kind: 'load' }
  | { kind: 'guided'; ids: string[] }
  | { kind: 'freetext'; text: string }

// The stepper drops "Details" on the free-text path.
function stepperFor(mode: DescribeMode) {
  const s = copy.steps
  const nodes =
    mode === 'free'
      ? [s.describe, s.result, s.nextSteps, s.feedback]
      : [s.describe, s.details, s.result, s.nextSteps, s.feedback]
  const order: Phase[] =
    mode === 'free'
      ? ['describe', 'result', 'nextsteps', 'feedback', 'done']
      : ['describe', 'situation', 'result', 'nextsteps', 'feedback', 'done']
  return { nodes, order }
}

function App() {
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null)
  const [topics, setTopics] = useState<Topic[]>([])
  const [phase, setPhase] = useState<Phase>('describe')
  const [mode, setMode] = useState<DescribeMode>('guided')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [scenarioIds, setScenarioIds] = useState<string[]>([])
  const [freeText, setFreeText] = useState('')
  const [result, setResult] = useState<TriageResult | null>(null)
  const [detailsError, setDetailsError] = useState<string | null>(null)
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
      const data = await getScenarios()
      setScenarios(data.scenarios)
      setTopics(data.topics)
    } catch {
      setServiceError(true)
    }
  }

  async function runTriage(request: LastRequest, call: () => Promise<TriageResult>) {
    setLoading(true)
    setDetailsError(null)
    setServiceError(false)
    setLastRequest(request)
    try {
      setResult(await call())
      setPhase('result')
    } catch (error) {
      if (error instanceof TriageValidationError) {
        setDetailsError(copy.validation[error.code] ?? copy.validation.invalid_request)
      } else {
        setServiceError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  function submitGuided(ids: string[]) {
    setScenarioIds(ids)
    void runTriage({ kind: 'guided', ids }, () => postGuidedTriage(ids))
  }

  function submitFreeText(text: string) {
    setFreeText(text)
    void runTriage({ kind: 'freetext', text }, () => postFreeTextTriage(text))
  }

  function retry() {
    if (lastRequest.kind === 'guided') submitGuided(lastRequest.ids)
    else if (lastRequest.kind === 'freetext') submitFreeText(lastRequest.text)
    else void loadScenarios()
  }

  function startAgain() {
    setPhase('describe')
    setMode('guided')
    setSelectedTopic('')
    setScenarioIds([])
    setFreeText('')
    setResult(null)
    setDetailsError(null)
  }

  const { nodes, order } = stepperFor(mode)
  const activeStep = Math.max(0, order.indexOf(phase))
  const topicScenarios = useMemo(
    () => (scenarios ?? []).filter((s) => s.topic === selectedTopic),
    [scenarios, selectedTopic],
  )
  const topicLabel = useMemo(() => result?.topics?.[0]?.label, [result])
  // After a result, Back returns to the originating input step.
  const resultBackPhase: Phase = mode === 'free' ? 'describe' : 'situation'

  let content
  if (serviceError) {
    content = <ServiceError onRetry={retry} retrying={loading} />
  } else if (phase === 'done') {
    content = (
      <StepCard
        title={copy.stepHeadings.done}
        onContinue={startAgain}
        continueLabel={copy.nav.startAgain}
      >
        <Typography sx={{ color: 'text.secondary' }}>
          {copy.stepHeadings.doneBody}
        </Typography>
      </StepCard>
    )
  } else if (phase === 'feedback') {
    content = (
      <FeedbackStep onBack={() => setPhase('nextsteps')} onFinish={() => setPhase('done')} />
    )
  } else if (phase === 'nextsteps') {
    content = (
      <NextStepsStep
        topicLabel={topicLabel}
        onBack={() => setPhase('result')}
        onContinue={() => setPhase('feedback')}
      />
    )
  } else if (phase === 'result' && result) {
    content = (
      <ResultStep
        result={result}
        onBack={() => {
          setDetailsError(null)
          setPhase(resultBackPhase)
        }}
        onContinue={() => setPhase('nextsteps')}
      />
    )
  } else if (phase === 'situation') {
    content = (
      <SituationStep
        scenarios={topicScenarios}
        initialSelected={scenarioIds}
        loading={loading}
        errorMessage={detailsError}
        onBack={() => {
          setDetailsError(null)
          setPhase('describe')
        }}
        onSubmit={submitGuided}
      />
    )
  } else if (scenarios) {
    content = (
      <DescribeStep
        topics={topics}
        initialMode={mode}
        initialTopic={selectedTopic}
        initialText={freeText}
        loading={loading}
        errorMessage={detailsError}
        onModeChange={setMode}
        onPickTopic={(key) => {
          setSelectedTopic(key)
          setPhase('situation')
        }}
        onSubmitFree={submitFreeText}
      />
    )
  } else {
    content = <Typography component="p">Loading…</Typography>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: tokens.page }}>
      <AppBar />
      <Box component="main" sx={{ maxWidth: 960, mx: 'auto', px: 2, py: { xs: 4, sm: 6 } }}>
        <JourneyStepper steps={nodes} activeStep={activeStep} />
        <Box sx={{ mt: { xs: 4, sm: 6 } }}>{content}</Box>
      </Box>
    </Box>
  )
}

export default App
