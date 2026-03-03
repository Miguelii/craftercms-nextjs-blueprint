import { loadSystemEnvs } from '@/lib/load-system-envs'
import type { NextConfig } from 'next'

loadSystemEnvs()

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        /*
         * Some of these packages are not directly installed in this project, but come as dependencies of @craftercms packages.
         * We include them here so Next.js can properly optimize and tree-shake them.
         * @see PR #7 https://github.com/Miguelii/craftercms-nextjs-blueprint/pull/7 to see the impact of this optimization
         */
        optimizePackageImports: [
            '@craftercms/experience-builder',
            '@craftercms/models',
            '@craftercms/classes',
            '@craftercms/content',
            '@craftercms/studio-ui',
            'rxjs',
            '@popperjs',
            '@mui/system',
            '@mui/material',
            '@mui/utils',
            'lodash',
            'slugify',
            'immer',
            'query-string',
            '@uppy/xhr-upload',
        ],
    },
    images: {
        // As of Next.js v16, `dangerouslyAllowLocalIP` must be enabled when loading images from a local IP.
        // Required in this blueprint because `NEXT_PUBLIC_CRAFTERCMS_HOST_NAME` points to a local IP.
        // In production, CrafterCMS is typically served behind a CDN or reverse proxy with a proper hostname, making this option unnecessary.
        // TODO remove.
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                hostname: 'localhost',
            },
        ],
    },
}

export default nextConfig
