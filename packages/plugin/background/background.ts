import Browser from 'webextension-polyfill'
import '../lib/browser-polyfill.min.js'
import '../lib/single-file-background.js'
import { onMessage } from 'webext-bridge/background'

/* global RequestInit */
async function request(url: string, options?: RequestInit | undefined) {
  const { serverUrl } = await Browser.storage.local.get('serverUrl')
  const res = await fetch(`${serverUrl}/api${url}`, {
    credentials: 'same-origin',
    ...options,
  })
  if (res.ok) {
    const json = await res.json()
    if (json.code === 200) {
      return json.data
    }

    throw new Error(json.message)
  }
  throw new Error('Failed to fetch')
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

  try {
    await request('/pages/upload_new_page', {
      method: 'POST',
      body: form,
    })
    return { success: true }
  }
  catch {
    return { success: false }
  }
})

onMessage('get-pages', async () => {
  try {
    const pageList = await request('/pages/get_pages')
    return pageList
  }
  catch {
    return []
  }
})

onMessage('get-user-info', async () => {
  try {
    const userInfo = await request('/users/get_user_info')
    return userInfo
  }
  catch {
    return null
  }
})
