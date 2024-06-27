import { defineConfig } from 'unocss'
import { presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons()
  ]
})