import { Outlet } from 'react-router-dom'
import SideBar from '@/components/SideBar'

function MainLayout() {
  return (
    <main className="flex bg-white">
      <SideBar className="h-screen w-65 backdrop-blur-sm" />
      <Outlet />
    </main>
  )
}

export default MainLayout
