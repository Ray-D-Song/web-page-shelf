import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'
import bcrypt from 'bcrypt'
import { HonoTypeUserInformation } from '@/constants/binding'
import result from '@/utils/result'
import { User } from '@/sql/types'

const app = new Hono<HonoTypeUserInformation>()

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
    const selectUser = c.env.DB
      .prepare(`SELECT * FROM users WHERE email = ?`)
      .bind(email)
    const user = await selectUser.first<User>()
    if (user) {
      return c.json(result.error(400, 'Email already exists'))
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const sql = c.env.DB
      .prepare(`INSERT INTO users (email, password) VALUES (?, ?)`)
      .bind(email, encryptedPassword)
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
      .prepare(`SELECT * FROM users WHERE email = ?`)
      .bind(formData.email)

    try {
      const user = await sql.first<User>()
      if (!user) {
        return c.json(result.error(401, 'Invalid email or password'))
      }
      const isPasswordMatch = await bcrypt.compare(formData.password, user.password)
      if (!isPasswordMatch) {
        return c.json(result.error(401, 'Invalid email or password'))
      }
      const payload = {
        id: user.id,
        email: user.email,
      }
      const JWT_SECRET = import.meta.env.MODE === 'development' ? 'dev' : c.env.JWT_SECRET
      const token = await sign(payload, JWT_SECRET)
      const expirationTtl = 60 * 60 * 24 * 14
      await c.env.KV.put(`token:${user.id}`, token, {
        expirationTtl,
      })
      console.log(await c.env.KV.get(`token:${user.id}`))
      setCookie(c, 'token', token, {
        expires: new Date(Date.now() + expirationTtl * 1000),
      })
      return c.json(result.success({
        id: user.id,
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
