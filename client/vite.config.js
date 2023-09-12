import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
          // target: 'http://localhost:3000/',
          target: 'https://api-25fmrw53mq-de.a.run.app/',
          changeOrigin: true,
          secure: false,      
       }
    }
  }
})
