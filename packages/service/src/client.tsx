import { createRoot } from 'react-dom/client'
import App from './App'

if (!import.meta.env.DEV) {
  import ('./style/reset.css')
  import ('./style/uno.css')
  import ('./style/util.css')
}
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <App />,
  )
}
