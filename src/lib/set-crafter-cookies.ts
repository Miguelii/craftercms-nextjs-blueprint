import { ClientEnv } from '@/env/client'
import type { NextRequest, NextResponse } from 'next/server'
import { CRAFTER_PREVIEW_COOKIE_NAME, CRAFTER_SITE_COOKIE_NAME } from './constants'

export const setCrafterCookies = (request: NextRequest, response: NextResponse) => {
    const hasPreviewCookie = request.cookies.has(CRAFTER_PREVIEW_COOKIE_NAME)
    const hasSiteCookie = request.cookies.has(CRAFTER_SITE_COOKIE_NAME)

    const cookieOptions = {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        /*
         * Commented out because in local we use HTTP and localhost
         * but should be enabled in non-localhost environments.
         */
        //sameSite: 'none' as const,
        //secure: true,
    }

    if (!hasPreviewCookie) {
        response.cookies.set(
            CRAFTER_PREVIEW_COOKIE_NAME,
            ClientEnv.NEXT_PUBLIC_PREVIEW_TOKEN,
            cookieOptions
        )
    }

    if (!hasSiteCookie) {
        response.cookies.set(
            CRAFTER_SITE_COOKIE_NAME,
            ClientEnv.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME,
            cookieOptions
        )
    }
}
