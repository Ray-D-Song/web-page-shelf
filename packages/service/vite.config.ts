import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import UnoCSS from '@unocss/postcss'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        UnoCSS(),
      ]
    }
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx',
    }),
  ],
})
