import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/freepik-api': {
        target: 'https://api.freepik.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/freepik-api/, ''),
      },
      '/hf-api': {
        target: 'https://api-inference.huggingface.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf-api/, ''),
      },
    },
  },
})
