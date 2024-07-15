import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import pages from './api/pages'
import { Bindings } from './constants/binding'
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

app.use('/api/*', token)

const api = new Hono<{ Bindings: Bindings }>()
api.route('/pages', pages)
api.route('/auth', auth)

app.route('/api', api)

export default app
