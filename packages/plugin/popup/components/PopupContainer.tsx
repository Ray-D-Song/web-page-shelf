import { useState } from 'react'

import LoginPage from './LoginPage'
import PluginHomePage from './PluginHomePage'
import SettingsPage from './SettingsPage'

export type PageType = 'home' | 'login' | 'settings'

function PopupContainer() {
  const [activeTab, setActivePage] = useState<PageType>('login')
  const tabs = {
    home: <PluginHomePage setActivePage={setActivePage} />,
    login: <LoginPage setActivePage={setActivePage} />,
    settings: <SettingsPage setActivePage={setActivePage}></SettingsPage>,
  }

  return (
    tabs[activeTab]
  )
}

export default PopupContainer
