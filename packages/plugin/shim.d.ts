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
    'get-current-page-data': ProtocolWithReturn<{}, {
      content: string
      title: string
      href: string
      pageDesc: string
    }>
    'get-server-url': ProtocolWithReturn<{}, { serverUrl: string }>
    'set-server-url': ProtocolWithReturn<{ url: string }, { success: boolean }>
    'is-login': ProtocolWithReturn<{}, boolean>
  }
}
