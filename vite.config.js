import { fileURLToPath } from "url";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@img', replacement: fileURLToPath(new URL('./src/assets/img', import.meta.url)) },
    ],
  }
})
