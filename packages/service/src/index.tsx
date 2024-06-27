import { Hono } from 'hono'
import { renderer } from './renderer'
import renderPage from './utils/renderPage'

const app = new Hono()

app.use(renderer)

app.get('/hello', (c) => {
  return c.json({
    msg: 'Hello, world',
  })
})

app.get('/login', (c) => {
  return renderPage(c, 'Login')
})

export default app
