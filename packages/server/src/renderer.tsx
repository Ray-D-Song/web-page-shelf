import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        {
          import.meta.env.PROD
            ? (<link href="/static/style.css" rel="stylesheet" />)
            : (<link href="/src/style.css" rel="stylesheet" />)
        }
        <link href="/static/reset.css" rel="stylesheet" />
        <link href="/static/util.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body className="bg-gray-100 grid-background">{children}</body>
    </html>
  )
})
