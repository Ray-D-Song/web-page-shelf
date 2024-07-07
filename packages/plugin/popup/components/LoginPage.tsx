import { ChangeEvent, useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import { PageType } from './PopupContainer'

function useServerUrl() {
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

function LoginPage({ setActivePage }: { setActivePage: (tab: PageType) => void }) {
  const [serverUrl, saveServerUrl] = useServerUrl()

  useEffect(() => {
    sendMessage('is-login', {}).then((isLogin) => {
      if (isLogin) {
        setActivePage('home')
      }
    })
  }, [setActivePage])

  let checkLoginInterval: any

  useEffect(() => {
    return () => {
      clearInterval(checkLoginInterval)
    }
  })
  function redirectToLoginPage() {
    // open server url in new tab
    window.open(serverUrl, '_blank')

    checkLoginInterval = setInterval(() => {
      sendMessage('is-login', {}).then((isLogin) => {
        if (isLogin) {
          clearInterval(checkLoginInterval)
          setActivePage('home')
        }
      })
    }, 200)
  }
  return (
    <div className="w-70 p-sm space-y-2">
      <label
        htmlFor="serverUrl"
        className="block text-xs text-gray-700 font-medium"
      >
        Server URL
      </label>
      <input
        id="serverUrl"
        type="text"
        value={serverUrl}
        onChange={saveServerUrl}
        className="block w-full border-1 border-gray-200 rounded-md p-2 text-sm shadow-sm"
      />
      <button
        type="button"
        className="block w-full rounded-lg bg-gray-900 px-5 py-2 text-center text-sm text-white font-medium"
        onClick={redirectToLoginPage}
      >
        Redirect to login page
      </button>
    </div>
  )
}

export default LoginPage
