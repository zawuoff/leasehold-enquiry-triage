import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import StepCard from '../StepCard'
import { copy, MAX_TEXT_LENGTH } from '../../content'
import { postFeedback } from '../../api/triage'

interface Props {
  onBack: () => void
  onFinish: () => void
}

export default function FeedbackStep({ onBack, onFinish }: Props) {
  const [choice, setChoice] = useState<boolean | null>(null)
  const [comment, setComment] = useState('')

  function finish() {
    if (choice !== null) {
      // Not stored, so failures are non-blocking for the prototype.
      void postFeedback({ helpful: choice, comment: comment || undefined }).catch(
        () => {},
      )
    }
    onFinish()
  }

  return (
    <StepCard
      title={copy.stepHeadings.feedback}
      onBack={onBack}
      onContinue={finish}
      continueLabel={copy.nav.finish}
    >
      <Box role="group" aria-label={copy.stepHeadings.feedback} sx={{ display: 'flex', gap: 1.5 }}>
        {([
          [copy.feedback.yes, true],
          [copy.feedback.no, false],
        ] as const).map(([label, value]) => (
          <Button
            key={label}
            onClick={() => setChoice(value)}
            aria-pressed={choice === value}
            variant={choice === value ? 'contained' : 'outlined'}
            sx={{ minWidth: 96 }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {choice !== null && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="success" role="status" sx={{ mb: 2 }}>
            {copy.feedback.success}
          </Alert>
          <TextField
            label={copy.feedback.commentLabel}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            multiline
            minRows={2}
            fullWidth
            slotProps={{ htmlInput: { maxLength: MAX_TEXT_LENGTH } }}
          />
        </Box>
      )}
    </StepCard>
  )
}
