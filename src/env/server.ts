import { createEnv } from '@t3-oss/env-nextjs'

export const ServerEnv = createEnv({
    server: {},
    experimental__runtimeEnv: process.env,
})
