import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { Folder } from '@web-page-shelf/global'
import { HonoTypeUserInformation } from '@/constants/binding'
import result from '@/utils/result'
import { User } from '@/sql/types'

const app = new Hono<HonoTypeUserInformation>()

app.get(
  '/get_user_info',
  async (c) => {
    const userInfo = c.get('userInfo')
    const userResult = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userInfo.id).first<User>()
    if (!userResult) {
      return c.json(result.error(500, 'Failed to get user info'))
    }

    return c.json(result.success({
      id: userResult.id,
      email: userResult.email,
      username: userResult.username,
      folders: JSON.parse(userResult.folders),
    }))
  },
)

app.put(
  '/update_user_folders',
  validator('json', (value) => {
    if (!value.folders) {
      return 'Folders is required'
    }
    const parsedFolder = value.folders
    if (!Array.isArray(parsedFolder)) {
      return 'Folders should be an array'
    }

    const errorMessageList: Array<string> = []
    function checkFolder(folder: Folder) {
      if (!folder.name) {
        errorMessageList.push('Folder name is required')
      }
      if (!folder.children) {
        folder.children = []
      }
      else if (!Array.isArray(folder.children)) {
        errorMessageList.push('Folder children should be an array')
      }
      else {
        folder.children.forEach((child) => {
          checkFolder(child)
        })
      }
    }
    parsedFolder.forEach((folder) => {
      checkFolder(folder)
    })
    if (errorMessageList.length > 0) {
      return errorMessageList.join(',')
    }

    return {
      folders: parsedFolder as Array<Folder>,
    }
  }),
  async (c) => {
    const userInfo = c.get('userInfo')
    const json = c.req.valid('json')
    if (typeof json === 'string') {
      return c.json(result.error(400, json))
    }
    const { folders } = json
    const updateResult = await c.env.DB.prepare('UPDATE users SET folders = ? WHERE id = ?').bind(JSON.stringify(folders), userInfo.id).run()
    // todo remove pages in deleted folders
    if (!updateResult) {
      return c.json(result.error(500, 'Failed to update user folders'))
    }
    return c.json(result.success(null))
  },
)

export default app
