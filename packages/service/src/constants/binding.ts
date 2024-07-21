import type { D1Database, KVNamespace, R2Bucket } from '@cloudflare/workers-types/experimental'

export type Bindings = {
  JWT_SECRET: string
  DB: D1Database
  KV: KVNamespace
  MY_BUCKET: R2Bucket
}

export type Variables = {
  userInfo: {
    id: number
    email: string
  }
}

export type HonoTypeUserInformation = {
  Bindings: Bindings
  Variables: Variables
}
