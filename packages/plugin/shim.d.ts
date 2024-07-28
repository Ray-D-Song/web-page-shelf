import type { ProtocolWithReturn } from 'webext-bridge'
import type { UserInfo } from '@web-page-shelf/global/types/users'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    'save-page': ProtocolWithReturn<{
      content: string
      title: string
      href: string
      folderPath: string
      pageDesc: string
    }, { success: boolean }>
    'get-pages': ProtocolWithReturn<
      {
        filterFolderPath?: string | null
      },
      Array<{
        id: number
        title: string
        pageDesc: string
        pageUrl: string
        folderPath: string
      }>
    >
    'delete-page': ProtocolWithReturn<{ id: number }, { success: boolean }>
    'get-current-page-data': ProtocolWithReturn<{}, {
      content: string
      title: string
      href: string
      pageDesc: string
    }>
    'get-server-url': ProtocolWithReturn<{}, { serverUrl: string }>
    'set-server-url': ProtocolWithReturn<{ url: string }, { success: boolean }>
    'get-user-info': ProtocolWithReturn<{}, UserInfo | null>
  }
}
