import React from 'react'
import ReactDOM from 'react-dom/client'
import DownloadButton from '../popup/DownloadButton'

const root = document.createElement('div')
root.id = 'crx-root'
root.style.position = 'fixed'
root.style.bottom = '0'
root.style.right = '0'
document.body.appendChild(root)
console.log('content script loaded')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <DownloadButton />
  </React.StrictMode>,
)
