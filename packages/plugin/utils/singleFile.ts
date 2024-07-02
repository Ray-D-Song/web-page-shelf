import { saveFile } from './file'

declare const extension: {
  getPageData: (options: {
    removeHiddenElements: boolean
    removeUnusedStyles: boolean
    removeUnusedFonts: boolean
    removeImports: boolean
    blockScripts: boolean
    blockAudios: boolean
    blockVideos: boolean
    compressHTML: boolean
    removeAlternativeFonts: boolean
    removeAlternativeMedias: boolean
    removeAlternativeImages: boolean
    groupDuplicateImages: boolean
  }) => Promise<{
    content: string
    title: string
    filename: string
  }>
}

export async function getCurrentPageData() {
  const href = window.location.href
  const { content, title, filename } = await extension.getPageData({
    removeHiddenElements: true,
    removeUnusedStyles: true,
    removeUnusedFonts: true,
    removeImports: true,
    blockScripts: true,
    blockAudios: true,
    blockVideos: true,
    compressHTML: true,
    removeAlternativeFonts: true,
    removeAlternativeMedias: true,
    removeAlternativeImages: true,
    groupDuplicateImages: true,
  })

  const descriptionList = document.getElementsByName('description')
  const pageDesc = descriptionList?.[0]?.getAttribute('content') ?? ''

  return {
    content,
    title,
    filename,
    href,
    pageDesc,
  }
}

export async function saveCurrentPage() {
  const { content, title } = await getCurrentPageData()
  saveFile(content, title)
}
