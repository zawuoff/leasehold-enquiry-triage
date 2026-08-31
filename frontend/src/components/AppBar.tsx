import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { copy } from '../content'
import { tokens } from '../theme'

export default function AppBar() {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: tokens.navy,
        color: tokens.white,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2.5, sm: 6 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          aria-hidden
          sx={{
            width: 30,
            height: 30,
            flexShrink: 0,
            borderRadius: '7px',
            bgcolor: tokens.cyan,
            color: tokens.navy,
            fontWeight: 800,
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          L
        </Box>
        <Typography variant="h1" sx={{ color: tokens.white }}>
          {copy.brand}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: tokens.muted,
          fontSize: 13,
          fontWeight: 500,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {copy.strapline}
      </Typography>
    </Box>
  )
}
