import { useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import type { TriageFallback } from '../api/triage'

interface Props {
  fallback: TriageFallback
  onEdit: () => void
  onChooseScenarios: () => void
}

export default function Fallback({ fallback, onEdit, onChooseScenarios }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div>
      <Typography
        variant="h2"
        component="h2"
        tabIndex={-1}
        ref={headingRef}
        sx={{ fontSize: '1.5rem', mb: 2, outline: 'none' }}
      >
        {fallback.heading}
      </Typography>
      <Typography component="p" gutterBottom>
        {fallback.body}
      </Typography>
      <Typography component="p" gutterBottom>
        {fallback.next_step}
      </Typography>
      <div>
        <Button variant="contained" onClick={onEdit} sx={{ mr: 2, mt: 1 }}>
          {copy.fallbackActions.edit}
        </Button>
        <Button variant="outlined" onClick={onChooseScenarios} sx={{ mr: 2, mt: 1 }}>
          {copy.fallbackActions.choose}
        </Button>
        <Link href={fallback.contact_url}>{copy.fallbackActions.contact}</Link>
      </div>
    </div>
  )
}
