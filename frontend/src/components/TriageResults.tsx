import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import { tokens } from '../theme'
import type { TriageTopic } from '../api/triage'

interface Props {
  topics: TriageTopic[]
}

export default function TriageResults({ topics }: Props) {
  return (
    <div>
      {topics.map((topic) => (
        <Box
          component="section"
          key={topic.topic}
          aria-label={topic.label}
          sx={{ mb: 3, '&:last-of-type': { mb: 0 } }}
        >
          <Typography variant="h3" component="h3" sx={{ color: tokens.navy, mb: 1 }}>
            {topic.heading}
          </Typography>

          {topic.warning && (
            <Alert severity="warning" sx={{ my: 2 }}>
              {topic.warning.text}
            </Alert>
          )}

          {topic.cards.map((card, index) => (
            <Box
              component="article"
              key={card.scenario_id ?? `${topic.topic}-${index}`}
              sx={{ mt: 2 }}
            >
              {card.scenario && (
                <Typography sx={{ fontWeight: 700, color: tokens.navy, mb: 0.5 }}>
                  {card.scenario}
                </Typography>
              )}
              <Typography sx={{ fontWeight: 700, color: tokens.navy, mt: 1 }}>
                {copy.card.whyHeading}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{card.why}</Typography>
              <Typography sx={{ fontWeight: 700, color: tokens.navy, mt: 1.5 }}>
                {copy.card.nextHeading}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{card.next_step}</Typography>
              <Box sx={{ mt: 1 }}>
                <Link href={card.link.url}>{card.link.label} →</Link>
              </Box>
              <Typography sx={{ mt: 1, fontSize: 13, color: tokens.muted }}>
                {copy.card.verifiedPrefix}: {card.verified}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </div>
  )
}
