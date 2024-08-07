import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  react: true,
  ignores: [
    '**/lib',
    '**/extension',
  ],
}, {
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'unused-imports/no-unused-vars': 'warn',
  },
})
