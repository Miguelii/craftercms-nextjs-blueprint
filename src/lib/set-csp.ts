import { ServerEnv } from '@/env/server'
import type { NextResponse } from 'next/server'

/**
 * Sets the page Content-Security-Policy and Cache-Control on a proxy response.
 * Only runs for page/document requests — static assets are excluded from the
 * proxy via matcher and get their headers from next.config.ts headers().
 *
 * Note: This is a simplified version for blueprint purposes (just basic security headers)
 * In a real application, a proper CSP should be created.
 *
 * @param response - The proxy response to decorate.
 */
export const setCSP = (response: NextResponse) => {
    response.headers.set('Content-Security-Policy', generateCSP())
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')

    return response
}

const generateCSP = () => {
    // 'unsafe-eval' is only required in development (React Fast Refresh)
    const scriptEvalDirective = ServerEnv.NODE_ENV === 'production' ? '' : "'unsafe-eval'"

    const csp = `
        default-src 'self';
        style-src 'self' 'unsafe-inline';
        script-src 'self'
            https://*.vercel-scripts.com
            'unsafe-inline' ${scriptEvalDirective};
        img-src 'self';
        font-src 'self';
        frame-src 'self';
        object-src 'none';
        media-src 'self';
        base-uri 'self';
        connect-src 'self';
        form-action 'self';
        frame-ancestors 'none';
    `

    return csp.replaceAll(/\s{2,}/g, ' ').trim()
}
