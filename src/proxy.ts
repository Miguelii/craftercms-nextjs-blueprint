import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setCrafterCookies } from './lib/set-crafter-cookies'

export async function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    setCrafterCookies(request, response)

    return response
}
