type Page = {
  id: number
  title: string
  content_url: string
  page_url: string
  folder_path: string
  page_desc: string
  user_id: number
  is_deleted: boolean
  deleted_at: Date | null
  created_at: Date
  updated_at: Date
}

type User = {
  id: number
  username: string
  password: string
  email: string
  created_at: Date
  updated_at: Date
  folders: string // JSON string, ideally should be parsed to a more specific type
}

export type { Page, User }
