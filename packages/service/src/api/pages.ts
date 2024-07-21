import { Hono } from 'hono'
import { validator } from 'hono/validator'
import type { D1Database } from '@cloudflare/workers-types/experimental'
import { HonoTypeUserInformation } from '../constants/binding'
import result from '@/utils/result'

const app = new Hono<HonoTypeUserInformation>()

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

app.post(
  '/upload_new_page',
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
    const uploadFileResult = await c.env.BUCKET.put(contentUrl, pageFile)
    if (uploadFileResult === null) {
      return c.json({ status: 'error', message: 'Failed to upload file' })
    }
    const userInfo = c.get('userInfo')
    const insertPageResult = await insertPage(c.env.DB, {
      title,
      pageDesc,
      pageUrl,
      contentUrl,
      folderPath: folderPathWithRoot,
      userId: userInfo.id,
    })
    if (!insertPageResult) {
      return c.json(result.success(null))
    }
    return c.json(result.error(500, 'Failed to insert page'))
  },
)

app.get(
  '/get_pages',
  async (c) => {
    const userInfo = c.get('userInfo')
    const { results } = await c.env.DB.prepare(
      `SELECT 
        id, 
        page_desc AS pageDesc,
        title,
        page_url AS pageUrl,
        folder_path AS folderPath
      FROM pages
      WHERE user_id = ?`,
    )
      .bind(userInfo.id)
      .all()
    return c.json(result.success(results))
  },
)

export default app
