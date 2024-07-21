import { proxy, subscribe } from 'valtio'

interface UserStore {
  id: number
  username: string
  email: string
  folders: Record<string, any>
}

const userStore = proxy(
  JSON.parse(localStorage.getItem('user') ?? `{
    "id": 0,
    "username": "",
    "email": "",
    "folders": {}
  }`) as UserStore,
)

subscribe(userStore, () => {
  localStorage.setItem('user', JSON.stringify(userStore))
})

export {
  userStore,
}
