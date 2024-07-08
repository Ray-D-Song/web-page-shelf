import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { Bindings } from '@/constants/binding'

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
      return c.newResponse(formData, 500)
    }
    const { email, password } = formData
    const user = await c.env.DB
      .prepare(`INSERT INTO users (email, password) VALUES (?, ?)`)
      .bind(email, password)
      .run()
    if (user.error) {
      return c.json({
        message: 'Failed to create user',
      })
    }
    return c.json({
      message: 'User created',
    })
  },
)

app.post(
  '/login',
  validator('form', (value) => {
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
    const formData = c.req.valid('form')
    if (typeof formData === 'string') {
      return c.newResponse(formData, 500)
    }
  },
)

export default app
