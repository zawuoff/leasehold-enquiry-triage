import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/  ·  https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev only: forward /api to the Django backend so the browser makes
    // same-origin requests and there is no CORS to configure.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    // The axe smoke tests + userEvent make some journeys slow; give headroom
    // so runs don't flake under load / in CI.
    testTimeout: 15000,
  },
})
