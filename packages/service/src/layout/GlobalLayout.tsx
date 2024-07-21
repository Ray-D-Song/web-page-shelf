import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function GlobalLayout() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default GlobalLayout
