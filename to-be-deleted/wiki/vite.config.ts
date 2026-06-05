import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3939,
    fs: { strict: false },
  },
  appType: 'mpa',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        shaders: path.resolve(__dirname, 'shaders/index.html'),
      }
    }
  }
})
