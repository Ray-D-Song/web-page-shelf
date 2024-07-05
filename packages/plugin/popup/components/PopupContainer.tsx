import { ChangeEvent, useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import UploadPageForm from './UploadPageForm'

function PopupContainer() {
  const [activeTab, setActiveTab] = useState<'page' | 'setting' | 'login'>('login')
  const tabs = {
    page: <SavePageTab />,
    setting: <SettingTab />,
    login: <LoginTab />,
  }
  const tabsHeader = {
    page: (
      <button
        type="button"
        onClick={() => setActiveTab('page')}
        className="rounded-lg p-2"
      >
        <div className="i-mdi-arrow-left"></div>
      </button>
    ),
    setting: (
      <button
        type="button"
        onClick={() => setActiveTab('setting')}
        className="rounded-lg p-2"
      >
        <div className="i-mdi-settings"></div>
      </button>
    ),
    login: (
      <div></div>
    ),
  }

  return (
    <div className="h-sm w-xs p-sm space-y-2">
      <div className="">
        {tabsHeader[activeTab]}
      </div>
      {tabs[activeTab]}
    </div>
  )
}

function LoginTab() {
  const [serverUrl, saveServerUrl] = useServerUrl()

  function redirectToLoginPage() {
    // open server url in new tab
    window.open(serverUrl, '_blank')
  }
  return (
    <div className="space-y-2">
      <label>
        Server URL
      </label>
      <input
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

function SavePageTab() {
  const [showUploadForm, setShowUploadForm] = useState(false)

  const handleClcickSave = async () => {
    setShowUploadForm(true)
  }
  return (
    <div className="h-full w-full space-y-sm">
      {showUploadForm
        ? (
          <UploadPageForm
            setShowUploadForm={setShowUploadForm}
          />
          )
        : (
          <button
            type="button"
            className="block h-10% rounded-lg bg-gray-900 px-5 text-center text-sm text-white font-medium"
            onClick={handleClcickSave}
          >
            Save Page
          </button>
          )}
    </div>

  )
}

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

function SettingTab() {
  const [serverUrl, handleSaveServerUrl] = useServerUrl()
  return (
    <div className="space-y-2">
      <label>
        Server URL
      </label>
      <input
        type="text"
        value={serverUrl}
        onChange={handleSaveServerUrl}
        className="block w-full border-1 border-gray-200 rounded-md p-2 text-sm shadow-sm"
      />
    </div>
  )
}

export default PopupContainer
