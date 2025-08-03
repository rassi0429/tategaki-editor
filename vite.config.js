import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: true,
    allowedHosts: ['0.0.0.0', "localhost", "tate.kokopi.me"],
  },
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname ?? process.cwd(), './src'),
    },
  },
})
