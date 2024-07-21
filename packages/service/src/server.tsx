import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { Bindings, HonoTypeUserInformation } from './constants/binding'
import { Page } from './sql/types'
import pages from '@/api/pages'
import users from '@/api/users'
import token from '@/middlewares/token'
import auth from '@/api/auth'

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          {
            import.meta.env.PROD
              ? (
                  <script type="module" src="/static/client.js"></script>
                )
              : (
                  <>
                    <link type="text/css" rel="stylesheet" href="/src/style/reset.css" />
                    <link type="text/css" rel="stylesheet" href="/src/style/uno.css" />
                    <link type="text/css" rel="stylesheet" href="/src/style/util.css" />
                    <script type="module" src="/src/client.tsx"></script>
                  </>
                )
          }
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
          <title>Web Page Shelf</title>
        </head>
        <body className="grid-background bg-gray-100">
          <div id="root"></div>
        </body>
      </html>,
    ),
  )
})

app.use('/shelf', token)
app.get('/shelf', async (c) => {
  const pageId = c.req.query('pageId')
  console.log(pageId)
  // rdirect to 404
  if (!pageId) {
    return c.redirect('/error')
  }

  const pageListResult = await c.env.DB.prepare('SELECT * FROM pages WHERE id = ?')
    .bind(pageId)
    .all()
  if (!pageListResult.success) {
    return c.redirect('/error')
  }

  const page = pageListResult.results?.[0] as Page
  if (!page) {
    return c.redirect('/error')
  }

  const content = await c.env.BUCKET.get(page.content_url)
  if (!content) {
    return c.redirect('/error')
  }

  return c.html(
    await content?.text(),
  )
})

app.use('/api/*', token)

const api = new Hono<HonoTypeUserInformation>()
api.route('/pages', pages)
api.route('/auth', auth)
api.route('/users', users)

app.route('/api', api)

export default app
