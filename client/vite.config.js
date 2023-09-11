import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
          // localhost:3000 
          target: 'https://booking-web-backend.vercel.app',
          changeOrigin: true,
          secure: false,      
       }
    }
  }
})
