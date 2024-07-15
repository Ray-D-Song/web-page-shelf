import { deleteCookie, getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import result from '@/utils/result'

export default createMiddleware(async (c, next) => {
  const token = getCookie(c, 'token')
  if (!token) {
    return c.json(result.error(401, 'Unauthorized'))
  }
  const JWT_SECRET = import.meta.env.MODE === 'development' ? 'dev' : c.env.JWT_SECRET
  const decodedPayload = await verify(token, JWT_SECRET)
  const userId = decodedPayload.id
  const tk = c.env.KV.get(`token:${userId}`)
  if (!tk || tk !== token) {
    deleteCookie(c, 'token')
    return c.json(result.error(401, 'Unauthorized'))
  }

  await next()
})
