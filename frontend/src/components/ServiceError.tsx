import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import StepCard from './StepCard'
import { copy } from '../content'

interface Props {
  onRetry: () => void
  retrying: boolean
}

// Uses StepCard so it shares the Paper card, themed heading, and focus-on-mount
// pattern used by every step (instead of a bare div with a hardcoded size).
export default function ServiceError({ onRetry, retrying }: Props) {
  return (
    <StepCard title={copy.serviceError.heading}>
      <Typography component="p" sx={{ color: 'text.secondary' }}>
        {copy.serviceError.body}
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" onClick={onRetry} disabled={retrying}>
          {retrying ? 'Checking…' : copy.serviceError.tryAgain}
        </Button>
        <Link href={copy.serviceError.contactUrl}>{copy.serviceError.contact}</Link>
      </Box>
    </StepCard>
  )
}
