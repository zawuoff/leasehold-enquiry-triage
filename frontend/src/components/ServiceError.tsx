import { useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { copy } from '../content'

interface Props {
  onRetry: () => void
  retrying: boolean
}

export default function ServiceError({ onRetry, retrying }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div role="alert">
      <Typography
        variant="h2"
        component="h2"
        tabIndex={-1}
        ref={headingRef}
        sx={{ fontSize: '1.5rem', mb: 2, outline: 'none' }}
      >
        {copy.serviceError.heading}
      </Typography>
      <Typography component="p" gutterBottom>
        {copy.serviceError.body}
      </Typography>
      <Button
        variant="contained"
        onClick={onRetry}
        disabled={retrying}
        sx={{ mr: 2, mt: 1 }}
      >
        {retrying ? 'Checking…' : copy.serviceError.tryAgain}
      </Button>
      <Link href={copy.serviceError.contactUrl}>{copy.serviceError.contact}</Link>
    </div>
  )
}
