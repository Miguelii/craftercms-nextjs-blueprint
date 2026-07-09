import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setProxyCrafterCookies } from '@/lib/utils.server'
import { setCSP } from '@/lib/set-csp'

export function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    setCSP(response)

    setProxyCrafterCookies(request, response)

    return response
}

// Static assets are excluded via matcher and get their headers from
// next.config.ts headers() — served at the CDN level, no proxy invocation.
export const config = {
    matcher: ['/((?!_next|api/|favicon|images).*)'],
}
