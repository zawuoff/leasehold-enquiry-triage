import { useEffect, useRef, useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { copy } from '../content'

interface Props {
  initialText?: string
  onSubmit: (text: string) => void
  loading: boolean
  errorMessage: string | null
}

export default function FreeTextEntry({
  initialText = '',
  onSubmit,
  loading,
  errorMessage,
}: Props) {
  const [text, setText] = useState(initialText)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  useEffect(() => {
    if (errorMessage) errorRef.current?.focus()
  }, [errorMessage])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit(text)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography
        variant="h2"
        component="h2"
        tabIndex={-1}
        ref={headingRef}
        sx={{ fontSize: '1.5rem', mb: 2, outline: 'none' }}
      >
        {copy.freeText.heading}
      </Typography>

      {errorMessage && (
        <Alert
          severity="error"
          ref={errorRef}
          tabIndex={-1}
          sx={{ mb: 3, outline: 'none' }}
        >
          <strong>{copy.errorSummaryHeading}</strong>
          <div>{errorMessage}</div>
        </Alert>
      )}

      <Typography component="p" sx={{ mb: 2 }}>
        {copy.freeText.privacy}
      </Typography>

      <TextField
        label={copy.freeText.label}
        helperText={copy.freeText.hint}
        multiline
        minRows={4}
        fullWidth
        value={text}
        onChange={(event) => setText(event.target.value)}
        slotProps={{ htmlInput: { maxLength: copy.freeText.maxLength } }}
        disabled={loading}
      />

      <div>
        <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
          {loading ? 'Checking…' : copy.freeText.submit}
        </Button>
      </div>
    </form>
  )
}
