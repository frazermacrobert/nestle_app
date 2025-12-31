import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nestle_app/', // THIS MUST MATCH YOUR REPO NAME
})
