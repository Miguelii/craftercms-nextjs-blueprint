import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setProxyCrafterCookies } from '@/lib/set-proxy-crafter-cookies'

export async function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    setProxyCrafterCookies(request, response)

    return response
}
