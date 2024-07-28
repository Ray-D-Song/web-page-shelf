import { ChangeEvent, useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import { useServerUrl } from '../composable/server'
import { PageType } from './PopupContainer'

function LoginPage({ setActivePage }: { setActivePage: (tab: PageType) => void }) {
  const [serverUrl, saveServerUrl] = useServerUrl()

  useEffect(() => {
    sendMessage('get-user-info', {}).then((userInfo) => {
      if (userInfo !== null) {
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
      sendMessage('get-user-info', {}).then((userInfo) => {
        if (userInfo !== null) {
          clearInterval(checkLoginInterval)
          setActivePage('home')
        }
      })
    }, 200)
  }
  return (
    <div className="w-70 p-sm space-y-2 dark:bg-gray-900">
      <label
        htmlFor="serverUrl"
        className="block text-xs text-gray-700 font-medium dark:text-white"
      >
        Server URL
      </label>
      <input
        id="serverUrl"
        type="text"
        value={serverUrl}
        onChange={saveServerUrl}
        className="block w-full border-1 border-gray-200 rounded-md p-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="button"
        className="block w-full rounded-lg bg-gray-900 px-5 py-2 text-center text-sm text-white font-medium dark:bg-gray-800 dark:text-gray-200"
        onClick={redirectToLoginPage}
      >
        Redirect to login page
      </button>
    </div>
  )
}

export default LoginPage
