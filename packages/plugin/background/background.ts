import Browser from 'webextension-polyfill'
import '../lib/browser-polyfill.min.js'
import '../lib/single-file-background.js'
import { onMessage } from 'webext-bridge/background'

/* global RequestInit */
async function request(url: string, options?: RequestInit | undefined) {
  const { serverUrl } = await Browser.storage.local.get('serverUrl')
  return fetch(`${serverUrl}/api${url}`, {
    credentials: 'same-origin',
    ...options,
  })
}

onMessage('set-server-url', async ({ data: { url } }) => {
  const serverUrl = url.endsWith('/') ? url.slice(0, -1) : url
  await Browser.storage.local.set({ serverUrl })
  return {
    success: true,
  }
})
onMessage('get-server-url', async () => {
  const { serverUrl } = await Browser.storage.local.get('serverUrl')
  return { serverUrl }
})

onMessage('save-page', async ({ data }) => {
  const { href, title, pageDesc, folderPath, content } = data

  const form = new FormData()
  form.append('title', title)
  form.append('pageDesc', pageDesc)
  form.append('pageUrl', href)
  form.append('folderPath', folderPath)
  form.append('pageFile', new Blob([content], { type: 'text/html' }))

  const response = await request('/pages/uploadNewPage', {
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
  try {
    const response = await request('/pages/getPages')
    if (response.ok) {
      const json = await response.json()
      return json
    }
    return []
  }
  catch (e) {
    return []
  }
})

onMessage('is-login', async () => {
  return true
})
