import { ChangeEvent, useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'

export function useServerUrl() {
  const [serverUrl, setServerUrl] = useState('')
  useEffect(() => {
    sendMessage('get-server-url', {}).then(({ serverUrl }) => {
      setServerUrl(serverUrl)
    })
  }, [])

  function saveServerUrl(e: ChangeEvent<HTMLInputElement>) {
    setServerUrl(e.target.value)
    sendMessage('set-server-url', { url: e.target.value }).then(({ success }) => {
      if (success) {
        console.log('save server url success')
      }
      else {
        console.log('save server url failed')
      }
    })
  }
  return [serverUrl, saveServerUrl] as const
}
