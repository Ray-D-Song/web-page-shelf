import honoBuild from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { UserConfig, defineConfig } from 'vite'
import UnoCSS from '@unocss/postcss'
import React from '@vitejs/plugin-react'

export default defineConfig(({ mode }): UserConfig => {
  /**
   *
   */
  if (mode === 'client') {
    return {
      css: {
        postcss: {
          plugins: [
            UnoCSS(),
          ],
        },
      },
      build: {
        rollupOptions: {
          input: 'src/client.tsx',
          output: {
            dir: 'dist',
            entryFileNames: 'static/client.js',
            assetFileNames: '[name].[ext]',
          },
        },
      },
      plugins: [
        React(),
      ],
    }
  }

  return {
    css: {
      postcss: {
        plugins: [
          UnoCSS(),
        ],
      },
    },
    plugins: [
      honoBuild({
        entry: 'src/server.tsx',
        external: ['react', 'react-dom'],
        minify: false,
      }),
      devServer({
        adapter,
        entry: 'src/server.tsx',
      }),
    ],
  }
})
