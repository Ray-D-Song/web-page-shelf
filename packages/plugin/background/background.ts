import '../lib/browser-polyfill.min.js'
import '../lib/single-file-background.js'

import { onMessage } from 'webext-bridge/background'

onMessage('save-page', ({ data }) => {
  console.log('save-page', data)
})
