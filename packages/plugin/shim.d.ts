import type { ProtocolWithReturn } from 'webext-bridge'

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
      {},
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
    'get-user-info': ProtocolWithReturn<{}, { username: string, email: string, id: number } | null>
  }
}
