import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
          // target: 'http://localhost:3000/',
          target: 'https://booking-web-backend-398712.de.r.appspot.com/',
          changeOrigin: true,
          secure: false,      
       }
    }
  }
})
