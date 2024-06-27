import '../styles'
import ReactDOM from 'react-dom/client'
import DownloadButton from './DownloadButton'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}
const div = document.createElement('div')
div.id = 'root'
ReactDOM.createRoot(root).render(
  <DownloadButton></DownloadButton>,
)
