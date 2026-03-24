import type { NextResponse } from 'next/server'

/**
 * Note: This is a simplified version for blueprint purposes (just basic security headers)
 * In a real application, a proper CSP should be created.
 *
 * @param response - The outgoing Next.js response
 * @returns The same response with CSP headers applied.
 */
export const setCSP = (response: NextResponse) => {
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'no-referrer')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Ua-Compatible', 'IE=edge')
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
    )
    response.headers.set('X-Xss-Protection', '1; mode=block')

    return response
}
