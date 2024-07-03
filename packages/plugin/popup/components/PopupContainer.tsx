import { ChangeEvent, useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import UploadPageForm from './UploadPageForm'

function PopupContainer() {
  const [activeTab, setActiveTab] = useState<'page' | 'setting'>('page')
  const tabs = {
    page: <SavePageTab />,
    setting: <SettingTab />,
  }

  return (
    <div className="h-sm w-xs p-sm space-y-2">
      <div className="">
        {
          activeTab === 'setting'
            ? (
              <button
                type="button"
                onClick={() => setActiveTab('page')}
                className="rounded-lg p-2"
              >
                <div className="i-mdi-arrow-left"></div>
              </button>
              )
            : (
              <button
                type="button"
                onClick={() => setActiveTab('setting')}
                className="rounded-lg p-2"
              >
                <div className="i-mdi-settings"></div>
              </button>
              )
        }
      </div>
      {tabs[activeTab]}
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

function SettingTab() {
  const [serverUrl, setServerUrl] = useState('')
  useEffect(() => {
    sendMessage('get-server-url', {}).then(({ serverUrl }) => {
      setServerUrl(serverUrl)
    })
  }, [])

  function handleSaveServerUrl(e: ChangeEvent<HTMLInputElement>) {
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
