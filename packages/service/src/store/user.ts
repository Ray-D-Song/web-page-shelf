import { proxy, subscribe } from 'valtio'

interface Folder {
  name: string
  children: Folder[]
}

interface UserStore {
  id: number
  username: string
  email: string
  folders: {
    name: 'root',
    children: Folder[]
  }
}

const userStore = proxy(
  JSON.parse(localStorage.getItem('user') ?? `{
    "id": 0,
    "username": "",
    "email": "",
    "folders": {"name": "root", "children": []}
  }`) as UserStore,
)

subscribe(userStore, () => {
  localStorage.setItem('user', JSON.stringify(userStore))
})

export {
  userStore,
}
