import { useEffect, useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import StepCard from '../StepCard'
import OptionRow, { radioIcon, radioCheckedIcon } from '../OptionRow'
import { copy } from '../../content'
import { tokens } from '../../theme'
import type { Topic } from '../../api/triage'

export type DescribeMode = 'guided' | 'free'

interface Props {
  topics: Topic[]
  initialMode: DescribeMode
  initialTopic: string
  initialText: string
  loading: boolean
  errorMessage: string | null
  onModeChange: (mode: DescribeMode) => void
  onPickTopic: (topicKey: string) => void
  onSubmitFree: (text: string) => void
}

export default function DescribeStep({
  topics,
  initialMode,
  initialTopic,
  initialText,
  loading,
  errorMessage,
  onModeChange,
  onPickTopic,
  onSubmitFree,
}: Props) {
  const [mode, setMode] = useState<DescribeMode>(initialMode)
  const [topic, setTopic] = useState(initialTopic)
  const [text, setText] = useState(initialText)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errorMessage) errorRef.current?.focus()
  }, [errorMessage])

  function chooseMode(next: DescribeMode) {
    setMode(next)
    onModeChange(next)
  }

  function handleContinue() {
    if (mode === 'guided') onPickTopic(topic)
    else onSubmitFree(text)
  }

  const continueDisabled = mode === 'guided' ? !topic : !text.trim()

  return (
    <StepCard
      title={copy.describe.heading}
      subtitle={copy.describe.subtitle}
      onContinue={handleContinue}
      continueDisabled={continueDisabled}
      busy={loading}
    >
      {errorMessage && (
        <Alert severity="error" ref={errorRef} tabIndex={-1} sx={{ mb: 3, outline: 'none' }}>
          <strong>{copy.errorSummaryHeading}</strong>
          <div>{errorMessage}</div>
        </Alert>
      )}

      {/* Guided / free-text tab toggle */}
      <Box
        role="group"
        aria-label="Choose how to describe your problem"
        sx={{
          display: 'flex',
          gap: '10px',
          p: '5px',
          bgcolor: tokens.page,
          border: `1px solid ${tokens.border}`,
          borderRadius: '12px',
        }}
      >
        {([
          ['guided', copy.describe.toggleGuided],
          ['free', copy.describe.toggleFree],
        ] as const).map(([value, label]) => {
          const active = mode === value
          return (
            <Box
              key={value}
              component="button"
              type="button"
              aria-pressed={active}
              onClick={() => chooseMode(value)}
              sx={{
                flex: 1,
                py: '12px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '8px',
                fontFamily: 'inherit',
                fontSize: 15,
                fontWeight: 600,
                bgcolor: active ? tokens.navy : 'transparent',
                color: active ? tokens.white : tokens.slate,
              }}
            >
              {label}
            </Box>
          )
        })}
      </Box>

      {mode === 'guided' ? (
        <Box sx={{ mt: 3.5 }}>
          <Typography sx={{ fontWeight: 600, color: tokens.navy, mb: 1.5 }}>
            {copy.describe.topicLabel}
          </Typography>
          <RadioGroup
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            sx={{ gap: '10px' }}
          >
            {topics.map((item) => (
              <OptionRow
                key={item.key}
                selected={topic === item.key}
                label={item.label}
                control={
                  <Radio
                    value={item.key}
                    icon={radioIcon}
                    checkedIcon={radioCheckedIcon}
                    disabled={loading}
                    sx={{ p: 0 }}
                  />
                }
              />
            ))}
          </RadioGroup>
        </Box>
      ) : (
        <Box sx={{ mt: 3.5 }}>
          <Typography sx={{ mb: 2, color: 'text.secondary' }}>
            {copy.freeText.privacy}
          </Typography>
          <TextField
            id="freetext"
            label={copy.freeText.label}
            helperText={copy.freeText.hint}
            multiline
            minRows={4}
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
            slotProps={{
              htmlInput: {
                maxLength: copy.freeText.maxLength,
                'aria-describedby': 'freetext-helper-text freetext-examples',
              },
            }}
            disabled={loading}
          />
          <Box id="freetext-examples" sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 600, color: tokens.navy, mb: 0.5 }}>
              {copy.freeText.examplesLabel}
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              {copy.freeText.examples.map((example) => (
                <Typography component="li" key={example} sx={{ mb: 0.5 }}>
                  {example}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </StepCard>
  )
}
