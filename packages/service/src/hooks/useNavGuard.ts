import { useEffect, useState } from 'react'
import { isAuth } from '../store/user'
import { whiteList } from '@/constants/route'

function useNavGuard() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    if (whiteList.includes(currentHash))
      return
    if (!isAuth)
      window.location.hash = '#login'
  }, [currentHash])
}

export default useNavGuard
