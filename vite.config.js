import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute base: the site is served from the root of its custom domain, and
// clean URLs (/projects) need asset paths that resolve the same at any
// route depth — a relative base would break them on nested routes.
export default defineConfig({
  base: '/',
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
