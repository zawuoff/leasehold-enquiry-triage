import { useEffect, useRef } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import type { TriageTopic } from '../api/triage'

interface Props {
  topics: TriageTopic[]
}

export default function TriageResults({ topics }: Props) {
  const firstHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    firstHeadingRef.current?.focus()
  }, [])

  return (
    <div>
      {topics.map((topic, index) => (
        <Box
          component="section"
          key={topic.topic}
          aria-label={topic.label}
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h2"
            component="h2"
            tabIndex={-1}
            ref={index === 0 ? firstHeadingRef : undefined}
            sx={{ fontSize: '1.5rem', mb: 2, outline: 'none' }}
          >
            {topic.heading}
          </Typography>

          {topic.warning && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {topic.warning.text}
            </Alert>
          )}

          {topic.cards.map((card, cardIndex) => (
            <Box
              component="article"
              key={card.scenario_id ?? `${topic.topic}-${cardIndex}`}
              sx={{ mb: 3 }}
            >
              {card.scenario && (
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontSize: '1.15rem', mb: 1 }}
                >
                  {card.scenario}
                </Typography>
              )}

              <Typography component="p" sx={{ fontWeight: 700 }}>
                {copy.card.whyHeading}
              </Typography>
              <Typography component="p" gutterBottom>
                {card.why}
              </Typography>

              <Typography component="p" sx={{ fontWeight: 700 }}>
                {copy.card.nextHeading}
              </Typography>
              <Typography component="p" gutterBottom>
                {card.next_step}
              </Typography>

              <Link href={card.link.url}>{card.link.label}</Link>

              <Typography
                component="p"
                variant="body2"
                sx={{ mt: 1, color: 'text.secondary' }}
              >
                {copy.card.verifiedPrefix}: {card.verified}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </div>
  )
}
