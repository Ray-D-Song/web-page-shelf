import { useEffect, useState } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import UploadPageForm from './UploadPageForm'
import FileFolderTree from './FileFolderTree'

function PluginHomePage() {
  const [showUploadForm, setShowUploadForm] = useState(false)

  return (
    <div className="grid grid-cols-5 h-sm w-xl">
      <div className="col-span-2 h-sm rounded-lg">
        <SideMenu></SideMenu>
      </div>
      <div className="col-span-3 h-sm rounded-lg">
        {showUploadForm
          ? <UploadPageForm setShowUploadForm={setShowUploadForm}></UploadPageForm>
          : (
            <PageContainer
              setShowUploadForm={setShowUploadForm}
            >
            </PageContainer>
            )}

      </div>
    </div>
  )
}

function PageContainer({ setShowUploadForm }: { setShowUploadForm: (show: boolean) => void }) {
  const [pageList, setPageList] = useState<Array<{ id: number, pageDesc: string, title: string, pageUrl: string }>>([])

  useEffect(() => {
    sendMessage('get-pages', {}).then((pages) => {
      setPageList(pages)
    })
  }, [])
  return (
    <div
      className="h-full w-full p-sm space-y-1"
    >
      <div className="h-10 flex space-x-1">
        <PageSearch></PageSearch>
        <button
          type="button"
          className="block w-20 rounded-lg bg-gray-900 px-5 py-2 text-center text-sm text-white font-medium"
          onClick={() => setShowUploadForm(true)}
        >
          Save
        </button>
      </div>
      <div className="custom-scrollbar h-[calc(100%-2.5rem)] overflow-auto p-r-1 space-y-1">
        {pageList.map(page => (
          <PageCard
            key={page.id}
            pageData={page}
          >
          </PageCard>
        ))}
      </div>
    </div>
  )
}

function PageSearch() {
  return (
    <div className="relative w-280">
      <label htmlFor="Search" className="sr-only"> Search </label>

      <input
        type="text"
        id="Search"
        placeholder="Search page"
        className="w-full b-1 border-gray-200 rounded-md py-2.5 pe-10 ps-2.5 shadow-sm sm:text-sm"
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

function PageCard({ pageData }: { pageData: { id: number, pageDesc: string, title: string, pageUrl: string } }) {
  return (
    <article
      className="border border-gray-100 rounded-lg bg-white p-2 shadow-sm transition hover:shadow-lg"
    >
      <a href="#">
        <h3 className="text-lg text-gray-900 font-medium">
          {pageData.title}
        </h3>
      </a>

      <p className="line-clamp-3 mt-2 text-sm/relaxed text-gray-500">
        {pageData.pageDesc}
      </p>
    </article>
  )
}

function SideMenu() {
  return (
    <div className="h-full w-full flex flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <button
          type="button"
          className="grid m-b-2 h-7 w-7 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
        >
          <div className="i-mdi-settings"></div>
        </button>

        <FileFolderTree
          treeData={[{
            name: 'root',
            children: [
              {
                name: 'folder1',
                children: [],
              },
            ],
          }]}
        />
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>

              <span> eric@frusciante.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default PluginHomePage
