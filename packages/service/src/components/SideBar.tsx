import { MouseEvent, useState } from 'react'
import NewFolderDialog from './NewFolderDialog'
import { userStore } from '@/store/user'

interface SideBarProps {
  className: string
}

function SideBar({ className }: SideBarProps) {
  const [dialogVisible, setDialogVisible] = useState(false)

  return (
    <div className={`${className} flex`}>
      <NewFolderDialog visible={dialogVisible} onClose={() => setDialogVisible(false)} />
      <div className="h-screen w-16 flex flex-col justify-between border-e bg-white">
        <div>
          <div className="size-16 inline-flex items-center justify-center">
            <span
              className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
            >
              {userStore.username[0]}
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <div className="py-4">
                <a
                  href="#"
                  className="group t relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span
                    className="invisible absolute start-full top-1/2 ms-4 rounded bg-gray-900 px-2 py-1.5 text-xs text-white font-medium group-hover:visible -translate-y-1/2"
                  >
                    Setting
                  </span>
                </a>
              </div>

              <ul className="border-t border-gray-100 pt-4 space-y-1">
                <li>
                  <a
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:cursor-pointer hover:bg-gray-50 hover:text-gray-700"
                    onClick={() => setDialogVisible(true)}
                  >
                    <div className="i-mdi:create-new-folder-outline h-1.3rem w-1.3rem"></div>

                    <span
                      className="invisible absolute start-full top-1/2 ms-4 rounded bg-gray-900 px-2 py-1.5 text-xs text-white font-medium group-hover:visible -translate-y-1/2"
                    >
                      New folder
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <div className="i-mdi:archive-add-outline h-1.3rem w-1.3rem"></div>

                    <span
                      className="invisible absolute start-full top-1/2 ms-4 rounded bg-gray-900 px-2 py-1.5 text-xs text-white font-medium group-hover:visible -translate-y-1/2"
                    >
                      Download page
                    </span>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="#">
            <button
              type="submit"
              className="group relative w-full flex justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span
                className="invisible absolute start-full top-1/2 ms-4 rounded bg-gray-900 px-2 py-1.5 text-xs text-white font-medium group-hover:visible -translate-y-1/2"
              >
                Logout
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="h-screen flex flex-1 flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">
          <ul className="mt-14 space-y-1">
            <li>
              <a
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium"
              >
                Root
              </a>
            </li>

            {
              userStore.folders.children.map(folder => (
                <li key={folder.name}>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="text-sm font-medium"> Teams </span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 px-4 space-y-1">
                      <li>
                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 font-medium hover:bg-gray-100 hover:text-gray-700"
                        >
                          Banned Users
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 font-medium hover:bg-gray-100 hover:text-gray-700"
                        >
                          Calendar
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
              ))
            }

          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
