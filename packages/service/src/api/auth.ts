import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { sign } from 'hono/jwt'
import { Bindings } from '@/constants/binding'
import result from '@/utils/result'
import { User } from '@/sql/types'

const app = new Hono<{ Bindings: Bindings }>()

app.post(
  '/signup',
  validator('json', (value) => {
    if (!value.email || typeof value.email !== 'string') {
      return 'Email is required'
    }
    if (!value.password || typeof value.password !== 'string') {
      return 'Password is required'
    }
    if (!value.repeatPassword || typeof value.repeatPassword !== 'string') {
      return 'Repeat password is required'
    }
    if (value.password !== value.repeatPassword) {
      return 'Password and repeat password must be the same'
    }

    return {
      email: value.email,
      password: value.password,
    }
  }),
  async (c) => {
    const formData = c.req.valid('json')
    if (typeof formData === 'string') {
      return c.json(result.error(500, formData))
    }
    const { email, password } = formData
    const sql = c.env.DB
      .prepare(`INSERT INTO users (email, password) VALUES (?, ?)`)
      .bind(email, password)
    try {
      const user = await sql.run()
      if (user.error) {
        throw user.error
      }
    }
    catch (e) {
      console.error(e)
      return c.json(result.error(500, 'Failed to create user'))
    }

    return c.json(result.success({ email }))
  },
)

app.post(
  '/login',
  validator('json', (value) => {
    if (!value.email || typeof value.email !== 'string') {
      return 'Email is required'
    }
    if (!value.password || typeof value.password !== 'string') {
      return 'Password is required'
    }

    return {
      email: value.email,
      password: value.password,
    }
  }),
  async (c) => {
    const formData = c.req.valid('json')
    if (typeof formData === 'string') {
      return c.json(result.error(500, formData))
    }
    const sql = c.env.DB
      .prepare(`SELECT * FROM users WHERE email = ? AND password = ?`)
      .bind(formData.email, formData.password)

    try {
      const user = await sql.first<User>()
      if (!user) {
        return c.json(result.error(401, 'Invalid email or password'))
      }
      const payload = {
        id: user.id,
        email: user.email,
      }
      const JWT_SECRET = import.meta.env.MODE === 'development' ? 'dev' : c.env.JWT_SECRET
      const token = await sign(payload, JWT_SECRET)
      await c.env.KV.put(`token:${user.id}`, token, {
        expirationTtl: 60 * 60 * 24 * 14,
      })
      console.log(await c.env.KV.get(`token:${user.id}`))
      return c.json(result.success({
        id: user.id,
        token,
        username: user.username,
        email: user.email,
        folders: JSON.parse(user.folders),
      }))
    }
    catch (e) {
      console.error(e)
      return c.json(result.error(500, 'Failed to login'))
    }
  },
)

export default app
