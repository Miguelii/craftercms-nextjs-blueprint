import { loadSystemEnvs } from '@/lib/load-system-envs'
import type { NextConfig } from 'next'

loadSystemEnvs()

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        /*
         * Some of these packages are not directly installed in this project, but come as dependencies of @craftercms packages.
         * We include them here so Next.js can properly optimize and tree-shake them.
         */
        optimizePackageImports: [
            '@craftercms/experience-builder',
            '@craftercms/models',
            '@craftercms/classes',
            '@craftercms/content',
            '@craftercms/studio-ui',
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
        // As of Next.js v16, `dangerouslyAllowLocalIP` must be enabled when loading images
        // from a local IP (in this case: NEXT_PUBLIC_CRAFTERCMS_HOST_NAME).
        // This should only be enabled for local development and disabled in production environments.
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                hostname: 'localhost',
            },
        ],
    },
}

export default nextConfig
