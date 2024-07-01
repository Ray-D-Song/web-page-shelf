import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/404'

const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
])

if (!import.meta.env.DEV) {
  import ('./style/reset.css')
  import ('./style/uno.css')
  import ('./style/util.css')
}
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <RouterProvider router={router} />,
  )
}
