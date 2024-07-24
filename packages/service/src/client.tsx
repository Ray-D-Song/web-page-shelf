import { createRoot } from 'react-dom/client'
import App from './App'

import ('@global/style/reset.css')
if (!import.meta.env.DEV) {
  import ('./style/uno.css')
  import ('./style/util.css')
}
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <App />,
  )
}
