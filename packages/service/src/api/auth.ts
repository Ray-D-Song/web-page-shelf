import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { Status } from '../constants/http'

const app = new Hono()

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
      return c.json({
        status: Status.error,
      })
    }
  },
)

export default app
