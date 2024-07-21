import { resolve } from 'node:path'
import honoBuild from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { UserConfig, defineConfig } from 'vite'
import UnoCSS from '@unocss/postcss'
import React from '@vitejs/plugin-react'

const defaultConfig: UserConfig = {
  css: {
    postcss: {
      plugins: [
        UnoCSS(),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}

export default defineConfig(({ mode }): UserConfig => {
  if (mode === 'client') {
    return {
      ...defaultConfig,
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
    ...defaultConfig,
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
