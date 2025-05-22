import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8', // or 'istanbul'
      include: ['src/**/*'],
    },
    setupFiles: ['./setup.ts'],
    include: ['./src/**/*.test.tsx', './src/**/*.test.ts'],
  },
})
