import '../lib/browser-polyfill.min.js'
import '../lib/single-file-background.js'

import { onMessage } from 'webext-bridge/background'

onMessage('save-page', async ({ data }) => {
  const { href, title, pageDesc, folderPath, content } = data

  const form = new FormData()
  form.append('title', title)
  form.append('pageDesc', pageDesc)
  form.append('pageUrl', href)
  form.append('folderPath', folderPath)
  form.append('pageFile', new Blob([content], { type: 'text/html' }))

  const response = await fetch('http://localhost:5173/pages/uploadNewPage', {
    method: 'PUT',
    body: form,
  })
  if (response.ok) {
    const json = await response.json()
    return { success: json.status === 'ok' }
  }
  return { success: false }
})

onMessage('get-pages', async () => {
  const response = await fetch('http://localhost:5173/pages/getPages')
  if (response.ok) {
    const json = await response.json()
    return json
  }
  return []
})
