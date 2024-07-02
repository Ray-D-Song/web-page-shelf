import { useState, useEffect } from 'react'
import { isAuth } from '../store/user'

function useNavGuard() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if(!isAuth)
      window.location.hash = '#login'
  }, [currentHash])
}

export default useNavGuard