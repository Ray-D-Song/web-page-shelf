import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

function GlobalLayout() {
  const nav = useNavigate()
  useEffect(() => {
    nav('/home')
  }, [])
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default GlobalLayout
