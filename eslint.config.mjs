import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  react: true,
  ignores: [
    '**/lib',
    '**/extension',
  ],
})
