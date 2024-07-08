import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/404'
import useNavGuard from './hooks/useNavGuard'
import MainLayout from './layout/MainLayout'

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

function App() {
  useNavGuard()
  return (
    <RouterProvider router={router} />
  )
}

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
