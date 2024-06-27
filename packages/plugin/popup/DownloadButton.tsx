function DownloadButton() {
  const handleDownload = async () => {
    console.log("Download button clicked");
    // Add your download logic here
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
      groupDuplicateImages: true
    });
    console.log(content, title, filename);
  }

  return (
    <div >
      <button onClick={handleDownload}>
        Download
      </button>
    </div>
  )
}

export default DownloadButton
