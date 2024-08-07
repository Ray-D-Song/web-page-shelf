import {
  Navigate,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom'
import useNavGuard from './hooks/useNavGuard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/404'
import GlobalLayout from './layout/GlobalLayout'
import Home from './pages/Home'
import MainLayout from './layout/MainLayout'

const router = createHashRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
        ],
      },
    ],
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

export default App
