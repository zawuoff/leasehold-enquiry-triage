import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import StepCard from '../StepCard'
import AdviserCallback from '../AdviserCallback'
import { copy } from '../../content'

interface Props {
  onBack: () => void
  onContinue: () => void
}

export default function NextStepsStep({ onBack, onContinue }: Props) {
  return (
    <StepCard title={copy.stepHeadings.nextSteps} onBack={onBack} onContinue={onContinue}>
      <Link href={copy.results.contactUrl}>{copy.results.contact} →</Link>
      <Divider sx={{ my: 3 }} />
      <AdviserCallback />
    </StepCard>
  )
}
