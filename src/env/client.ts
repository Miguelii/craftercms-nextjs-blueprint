import { createEnv } from '@t3-oss/env-nextjs'
import * as z from 'zod/mini'

export const ClientEnv = createEnv({
    client: {
        NEXT_PUBLIC_CRAFTERCMS_HOST_NAME: z.string(),
        NEXT_PUBLIC_CRAFTERCMS_SITE_NAME: z.string(),
        NEXT_PUBLIC_PREVIEW_TOKEN: z.string(),
        NEXT_PUBLIC_HOST: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_CRAFTERCMS_HOST_NAME: process.env.NEXT_PUBLIC_CRAFTERCMS_HOST_NAME,
        NEXT_PUBLIC_CRAFTERCMS_SITE_NAME: process.env.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME,
        NEXT_PUBLIC_PREVIEW_TOKEN: process.env.NEXT_PUBLIC_PREVIEW_TOKEN,
        NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    },
})
