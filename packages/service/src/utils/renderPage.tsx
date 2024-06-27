import { Context } from 'hono'

function renderPage(c: Context, pageName: string) {
  return c.render(
    <>
      <div id="root"></div>
      {
        import.meta.env.PROD
        ? <script type="module" src=""></script>
        : <script type="module" src={`/src/pages/${pageName}.tsx`}></script>
      }
    </>
  )
}

export default renderPage