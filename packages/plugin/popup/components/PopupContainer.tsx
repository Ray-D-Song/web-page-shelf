import { ChangeEvent, useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import Browser from 'webextension-polyfill'

function PopupContainer() {
  const [showUploadForm, setShowUploadForm] = useState(false)

  const handleClcickSave = async () => {
    setShowUploadForm(true)
  }

  return (
    <div className="h-sm w-xs p-sm space-y-sm">
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
            保存页面
          </button>
          )}
    </div>
  )
}

function UploadPageForm({ setShowUploadForm }: { setShowUploadForm: (show: boolean) => void }) {
  const [showLoading, setShowLoading] = useState(true)
  const [uploadPageData, setUploadPageData] = useState({
    title: '',
    pageDesc: '',
    content: '',
    href: '',
    folderPath: '',
  })

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target
    setUploadPageData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  useEffect(() => {
    const getPageData = async () => {
      const tabs = await Browser.tabs.query({ active: true, currentWindow: true })
      const tab = tabs[0]
      const pageData = await sendMessage('get-current-page-data', {}, `content-script@${tab.id}`)
      setUploadPageData({
        title: pageData.title,
        pageDesc: pageData.pageDesc,
        content: pageData.content,
        href: pageData.href,
        folderPath: '/',
      })
    }
    getPageData().finally(() => {
      setShowLoading(false)
    })
  }, [])

  function handleCancle() {
    setShowUploadForm(false)
  }

  async function handleSavePage() {
    console.log('save page', uploadPageData)
    const { success } = await sendMessage('save-page', uploadPageData)
    if (success) {
      console.log('save success')
    }
    else {
      console.log('save failed')
    }
    setShowUploadForm(false)
  }

  const folderOptions = [
    { value: '/', label: '/' },
    { value: '/folder2', label: '/Folder2' },
  ]

  if (showLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-2">
      <label
        className="block p-x-1 text-sm text-black font-bold"
        htmlFor="title"
      >
        Title
      </label>
      <input
        type="text"
        className="block w-full border-1 border-gray-200 rounded-md p-2 text-sm shadow-sm"
        id="title"
        name="title"
        value={uploadPageData.title}
        onChange={handleChange}
      />
      <label
        className="block p-x-1 text-sm text-black font-bold"
        htmlFor="pageDesc"
      >
        Page Description
      </label>
      <textarea
        className="block w-full border-1 border-gray-200 rounded-md p-2 text-sm shadow-sm"
        id="pageDesc"
        name="pageDesc"
        value={uploadPageData.pageDesc}
        rows={3}
        onChange={handleChange}
      >
      </textarea>
      <label
        className="block p-x-1 text-sm text-black font-bold"
        htmlFor="folderPath"
      >
        Folder
      </label>
      <div className="relative">
        <select
          className="block w-full appearance-none border-1 border-gray-200 rounded-md p-2 text-sm shadow-sm"
          id="folderPath"
          name="folderPath"
          value={uploadPageData.folderPath}
          onChange={handleChange}
        >
          {folderOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <div className="flex justify-end space-x-xs">
        <button
          type="button"
          onClick={handleCancle}
          className="block rounded-lg p-1.5 px-5 text-center text-sm text-gray-400 font-medium"
        >
          取消
        </button>
        <button
          type="button"
          onClick={handleSavePage}
          className="block rounded-lg bg-gray-900 p-1.5 px-5 text-center text-sm text-white font-medium"
        >
          保存
        </button>
      </div>
    </div>
  )
}

export default PopupContainer
