import { sendMessage } from "webext-bridge/content-script";
import { getCurrentPageData, saveCurrentPage } from "../utils/singleFile";

function DownloadButton() {
  const handleDownload = async () => {
    console.log("Download button clicked");
    saveCurrentPage()
    const pageData = await getCurrentPageData()
    sendMessage('save-page', {data: pageData})
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
