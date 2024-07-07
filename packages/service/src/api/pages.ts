import { Hono } from 'hono'
import { validator } from 'hono/validator'
import type { D1Database } from '@cloudflare/workers-types/experimental'
import { Bindings } from '../constants/binding'

const app = new Hono<{ Bindings: Bindings }>()

interface InsertPageOptions {
  title: string
  pageDesc: string
  pageUrl: string
  contentUrl: string
  folderPath: string
  userId: number
}

async function insertPage(DB: D1Database, pageOptions: InsertPageOptions) {
  const { title, pageDesc, pageUrl, contentUrl, folderPath, userId } = pageOptions
  const insertResult = await DB
    .prepare(
      'INSERT INTO pages (title, page_desc, page_url, content_url, folder_path, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    )
    .bind(title, pageDesc, pageUrl, contentUrl, folderPath, userId)
    .run()
  return insertResult.error
}

app.put(
  '/uploadNewPage',
  validator('form', (value) => {
    if (!value.title || typeof value.title !== 'string') {
      return 'Title is required'
    }
    if (typeof value.pageDesc !== 'string') {
      return 'Description is required'
    }
    if (!value.pageUrl || typeof value.pageUrl !== 'string') {
      return 'URL is required'
    }
    if (!value.pageFile || typeof value.pageFile !== 'object') {
      return 'File is required'
    }
    if (typeof value.folderPath !== 'string') {
      return 'Folder path should be a string'
    }

    return {
      title: value.title,
      pageDesc: value.pageDesc,
      pageUrl: value.pageUrl,
      pageFile: value.pageFile,
      folderPath: value.folderPath,
    }
  }),
  async (c) => {
    const formData = c.req.valid('form')
    if (typeof formData === 'string') {
      return c.json({ status: 'error', message: formData })
    }
    const { title, pageDesc, pageUrl, pageFile, folderPath } = formData
    const folderPathWithRoot = `root/${folderPath ?? ''}`
    const contentUrl = crypto.randomUUID()
    const uploadFileResult = await c.env.MY_BUCKET.put(contentUrl, pageFile)
    if (uploadFileResult === null) {
      return c.json({ status: 'error', message: 'Failed to upload file' })
    }
    const insertPageResult = await insertPage(c.env.DB, {
      title,
      pageDesc,
      pageUrl,
      contentUrl,
      folderPath: folderPathWithRoot,
      userId: 1,
    })
    if (!insertPageResult) {
      return c.json({ status: 'ok' })
    }
    return c.json({ status: 'error', message: 'Failed to insert page' })
  },
)

app.get(
  '/getPages',
  async (c) => {
    const { results } = await c.env.DB.prepare(
      `SELECT 
        id, 
        page_desc AS pageDesc,
        title,
        page_url AS pageUrl,
        folder_path AS folderPath
      FROM pages`,
    ).all()
    return c.json(results)
  },
)

export default app
