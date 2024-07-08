import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function MainLayout() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default MainLayout