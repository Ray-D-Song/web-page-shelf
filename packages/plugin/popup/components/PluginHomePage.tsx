import React, { useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import type { UserInfo } from '@web-page-shelf/global'
import { useServerUrl } from '../composable/server'
import UploadPageForm from './UploadPageForm'
import FileFolderTree, { FolderTreeNode } from './FileFolderTree'
import { PageType } from './PopupContainer'
import Dialog from './Dialog'

function PluginHomePage({ setActivePage }: { setActivePage: (pageType: PageType) => void }) {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [filterFolderPath, setFilterFolderPath] = useState<string | null>(null)
  useEffect(() => {
    sendMessage('get-user-info', {}).then((userInfo) => {
      setUserInfo(userInfo)
    })
  }, [])

  function handleFolderClick(folder: FolderTreeNode) {
    setFilterFolderPath(folder.path)
  }

  return (
    <div className="grid grid-cols-5 h-sm w-xl dark:bg-gray-800">
      <div className="col-span-2 h-sm rounded-lg">
        <SideMenu
          setActivePage={setActivePage}
          userInfo={userInfo}
          onFolderClick={handleFolderClick}
        >
        </SideMenu>
      </div>
      <div className="col-span-3 h-sm rounded-lg">
        {showUploadForm
          ? (
            <UploadPageForm
              setShowUploadForm={setShowUploadForm}
              userInfo={userInfo}
            >
            </UploadPageForm>
            )
          : (
            <PageContainer
              setShowUploadForm={setShowUploadForm}
              filterFolderPath={filterFolderPath}
            >
            </PageContainer>
            )}

      </div>
    </div>
  )
}

interface PageContainerProps {
  setShowUploadForm: (show: boolean) => void
  filterFolderPath?: string | null
}

function PageContainer({ setShowUploadForm, filterFolderPath }: PageContainerProps) {
  const [pageList, setPageList] = useState<Array<{ id: number, pageDesc: string, title: string, pageUrl: string }>>([])
  const [searchKeyWord, setSearchKeyWord] = useState('')

  useEffect(() => {
    sendMessage('get-pages', { filterFolderPath, search: searchKeyWord }).then((pages) => {
      setPageList(pages)
    })
  }, [filterFolderPath, searchKeyWord])

  function removePageById(id: number) {
    setPageList(pageList.filter(page => page.id !== id))
  }

  return (
    <div
      className="h-full w-full p-sm space-y-1 dark:bg-gray-900"
    >
      <div className="h-10 flex space-x-1">
        <PageSearch
          setSearchKeyWord={setSearchKeyWord}
        >
        </PageSearch>
        <button
          type="button"
          className="block w-20 rounded-lg bg-gray-900 px-5 py-2 text-center text-sm text-white font-medium dark:bg-gray-800 dark:text-gray-200"
          onClick={() => setShowUploadForm(true)}
        >
          Save
        </button>
      </div>
      <div className="custom-scrollbar dark:dark-scrollbar h-[calc(100%-2.5rem)] overflow-auto p-r-1 space-y-1">
        {pageList.map(page => (
          <PageCard
            key={page.id}
            pageData={page}
            removePageById={removePageById}
          >
          </PageCard>
        ))}
      </div>
    </div>
  )
}

interface PageSearchProps {
  setSearchKeyWord: (keyWord: string) => void
}

function PageSearch({ setSearchKeyWord }: PageSearchProps) {
  const [keyWord, setKeyWord] = useState('')
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyWord(event.target.value)
  }
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      setSearchKeyWord(keyWord)
    }
  }
  return (
    <div className="relative w-280">
      <label htmlFor="Search" className="sr-only"> Search </label>

      <input
        type="text"
        id="Search"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setSearchKeyWord(keyWord)}
        placeholder="Search page"
        className="w-full b-1 border-gray-200 rounded-md py-2.5 pe-10 ps-2.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:text-sm dark:text-white"
      />

      <span className="absolute end-0 inset-y-0 grid w-10 place-content-center">
        <button type="button" className="bg-transparent text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  )
}

function PageCard({ pageData, removePageById }: { pageData: { id: number, pageDesc: string, title: string, pageUrl: string }, removePageById: (id: number) => void }) {
  async function handleClickPageCard() {
    const { serverUrl } = await sendMessage('get-server-url', {})
    window.open(`${serverUrl}/shelf?pageId=${pageData.id}`, '_blank')
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  function openDialog() {
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
  }

  function openComfirmRemoveDialog(event: React.MouseEvent) {
    event.stopPropagation()
    openDialog()
  }

  async function removePage() {
    removePageById(pageData.id)
    closeDialog()
    await sendMessage('delete-page', { id: pageData.id })
  }

  return (
    <article
      onClick={handleClickPageCard}
      className="border border-gray-100 rounded-lg bg-white p-2 shadow-sm transition dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-900 font-medium dark:text-white">
          {pageData.title}
        </h3>
        <div
          className="i-mdi-delete cursor-pointer"
          onClick={openComfirmRemoveDialog}
        >
        </div>
        <Dialog isOpen={isDialogOpen} title="" onClose={closeDialog}>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to remove this page?
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 dark:bg-gray-800 dark:text-gray-200"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-lg bg-red-500 px-4 py-2 text-white"
              onClick={removePage}
            >
              Remove
            </button>
          </div>
        </Dialog>
      </div>

      <p className="line-clamp-3 mt-2 text-sm/relaxed text-gray-500 dark:text-gray-400">
        {pageData.pageDesc}
      </p>
    </article>
  )
}

interface SideMenuProps {
  setActivePage: (pageType: PageType) => void
  userInfo: UserInfo | null
  onFolderClick?: (folder: FolderTreeNode) => void
}

function SideMenu({ setActivePage, userInfo, onFolderClick }: SideMenuProps) {
  const [serverUrl] = useServerUrl()
  function handleClickNode(node: FolderTreeNode) {
    onFolderClick && onFolderClick(node)
  }
  return (
    <div className="h-full w-full flex flex-col justify-between border-e bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-1 flex-col overflow-hidden px-2 py-3">
        <button
          type="button"
          onClick={() => setActivePage('settings')}
          className="grid m-b-2 h-7 w-7 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-200"
        >
          <div className="i-mdi-settings"></div>
        </button>

        <div className="custom-scrollbar flex-1 overflow-auto">
          <FileFolderTree
            treeData={userInfo?.folders ?? []}
            onClickNode={handleClickNode}
          />
        </div>

      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-800">
        <a href={serverUrl} className="flex items-center gap-2 bg-white p-4 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-200">
          <div>
            <p className="select-none text-xs dark:text-white">
              <strong className="block font-medium">{userInfo?.username}</strong>

              <span>
                {userInfo?.email}
              </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default PluginHomePage
