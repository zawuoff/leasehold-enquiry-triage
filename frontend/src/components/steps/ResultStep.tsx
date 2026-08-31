import Typography from '@mui/material/Typography'
import StepCard from '../StepCard'
import TriageResults from '../TriageResults'
import { copy } from '../../content'
import type { TriageResult } from '../../api/triage'

interface Props {
  result: TriageResult
  onBack: () => void
  onContinue: () => void
}

export default function ResultStep({ result, onBack, onContinue }: Props) {
  if (result.outcome === 'fallback' && result.fallback) {
    const fallback = result.fallback
    return (
      <StepCard title={fallback.heading} onBack={onBack} onContinue={onContinue}>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{fallback.body}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{fallback.next_step}</Typography>
      </StepCard>
    )
  }

  return (
    <StepCard title={copy.stepHeadings.result} onBack={onBack} onContinue={onContinue}>
      <TriageResults topics={result.topics ?? []} />
    </StepCard>
  )
}
