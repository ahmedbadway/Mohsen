import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works on GitHub Pages project pages
// (username.github.io/<repo>/) without hardcoding the repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the rarely-changing vendor libraries into their own chunk so
        // browsers keep them cached across app deploys.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'motion'],
        },
      },
    },
  },
})
