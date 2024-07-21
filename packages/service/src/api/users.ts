import { Hono } from 'hono'
import { HonoTypeUserInformation } from '@/constants/binding'
import result from '@/utils/result'
import { User } from '@/sql/types'

const app = new Hono<HonoTypeUserInformation>()

app.get(
  '/getUserInfo',
  async (c) => {
    const userInfo = c.get('userInfo')
    const userResult = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userInfo.id).first() as User
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

export default app
