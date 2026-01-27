import { loadSystemEnvs } from '@/lib/load-system-envs'
import type { NextConfig } from 'next'

loadSystemEnvs()

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        optimizePackageImports: [
            '@craftercms/experience-builder',
            '@craftercms/models',
            '@craftercms/classes',
            '@craftercms/content',
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
