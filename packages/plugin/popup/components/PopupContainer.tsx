import { useState } from 'react'

import LoginPage from './LoginPage'
import PluginHomePage from './PluginHomePage'

export type PageType = 'home' | 'login'

function PopupContainer() {
  const [activeTab, setActivePage] = useState<PageType>('login')
  const tabs = {
    home: <PluginHomePage />,
    login: <LoginPage setActivePage={setActivePage} />,
  }

  return (
    tabs[activeTab]
  )
}

export default PopupContainer
