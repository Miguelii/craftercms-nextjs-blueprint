import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setProxyCrafterCookies } from '@/lib/utils.server'
import { setCSP } from '@/lib/setCSP'

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
