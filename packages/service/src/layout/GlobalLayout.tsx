import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { userStore } from '@/store/user'

function GlobalLayout() {
  const nav = useNavigate()
  useEffect(() => {
    console.log('userStore.isLogin', userStore.isLogin)
    if (!userStore.isLogin) {
      nav('/login')
    }
    else {
      nav('/home')
    }
  }, [userStore.isLogin])
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}

export default GlobalLayout
