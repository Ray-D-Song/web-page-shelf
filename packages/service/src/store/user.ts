import { proxy, subscribe } from 'valtio'

interface UserStore {
  id: number
  token: string
  username: string
  email: string
  folders: Record<string, any>
}

const userStore = proxy(
  JSON.parse(localStorage.getItem('user') ?? `{
    "id": 0,
    "token": "",
    "username": "",
    "email": "",
    "folders": {}
  }`) as UserStore
)

subscribe(userStore, () => {
  localStorage.setItem('user', JSON.stringify(userStore))
})

const isAuth = userStore.token.length !== 0

export {
  userStore,
  isAuth
}