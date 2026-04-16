import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Ei line-ti thaka chai

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
})