import '../styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import DownloadButton from './DownloadButton'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <DownloadButton></DownloadButton>
  </React.StrictMode>
)
