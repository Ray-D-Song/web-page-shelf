export interface Folder {
  name: string
  children: Array<Folder>
}

export interface UserInfo {
  username: string
  email: string
  id: number
  folders: Array<Folder>
}
