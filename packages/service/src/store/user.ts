import { UserInfo } from '@web-page-shelf/global'
import { proxy, subscribe } from 'valtio'
import { deleteCookie } from '@/utils/cookie'

const userInfo = JSON.parse(localStorage.getItem('user') ?? `{
  "id": -1,
  "username": "",
  "email": "",
  "folders": []
}`)

interface UserStore extends UserInfo {
  isLogin: boolean
  logout: () => void
}

const userStore = proxy(
  {
    ...userInfo,
    get isLogin() {
      return userStore.id !== -1
    },
    logout: () => {
      Object.assign(userStore, {
        id: -1,
        username: '',
        email: '',
        folders: [],
      })
      deleteCookie('token')
    },
  } as UserStore,
)

subscribe(userStore, () => {
  localStorage.setItem('user', JSON.stringify(userStore))
})

export {
  userStore,
}
