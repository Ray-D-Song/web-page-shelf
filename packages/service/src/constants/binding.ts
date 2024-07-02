import type { D1Database, R2Bucket } from '@cloudflare/workers-types/experimental'

export type Bindings = {
  DB: D1Database
  MY_BUCKET: R2Bucket
}
