import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    crx({ manifest }),
  ],
  build: {
    outDir: 'extension',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@global': resolve(__dirname, '../global'),
    },
  },
  server: {
    strictPort: true,
    port: 5174,
    hmr: {
      clientPort: 5174,
    },
  },
})
