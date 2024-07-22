import { Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'

function MainLayout() {
  return (
    <main className='flex'>
      <SideBar className="h-screen w-55 backdrop-blur-sm" />
      <Outlet />
    </main>
  )
}

export default MainLayout
