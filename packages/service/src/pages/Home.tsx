import { useEffect, useState } from 'react'
import type { Page } from '@web-page-shelf/global'
import fetcher from '@/utils/fetcher'

function Home() {
  const [pages, setPages] = useState<Array<Page>>([])
  const [selectPage, setSelectPage] = useState<Page | null>(null)
  useEffect(() => {
    fetcher<Array<Page>>('/pages/get_pages', {
      method: 'GET',
    })().then((data) => {
      if (typeof data === 'string') {
        return
      }
      setPages(data)
    })
  }, [])

  function getIframeUrl() {
    if (!selectPage) {
      return ''
    }
    return `/shelf?pageId=${selectPage.id}`
  }

  return (
    <div className="flex">
      <div
        className="w-xl"
      >
        {
          pages.map((page) => {
            return (
              <div
                key={page.id}
                onClick={() => { setSelectPage(page) }}
              >
                {page.title}
              </div>
            )
          })
        }
        pageList
      </div>
      <div>
        pageContent
        <iframe
          // todo sandbox
          sandbox="allow-modals allow-same-origin"
          src={getIframeUrl()}
        >
        </iframe>
      </div>
    </div>
  )
}

export default Home
