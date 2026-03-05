import 'server-only'

import { ClientEnv } from '@/env/client'
import type { NavigationItem } from '@craftercms/models'
import type { MetadataRoute } from 'next'
import type { NextRequest, NextResponse } from 'next/server'
import { CRAFTER_PREVIEW_COOKIE_NAME, CRAFTER_SITE_COOKIE_NAME } from '@/lib/constants'

/**
 * Recursively traverses all navigation items and their subItems.
 *
 * @param items - Array of NavigationItem objects that may contain nested subItems.
 * @returns A flat array of MetadataRoute.Sitemap entries.
 */
export function navToSitemapEntries(items: NavigationItem[]): MetadataRoute.Sitemap {
    return items.flatMap((item) => {
        const entry: MetadataRoute.Sitemap[number] = {
            url: `${ClientEnv.NEXT_PUBLIC_HOST}${item.url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }

        if (!item.subItems || item.subItems.length === 0) {
            return [entry]
        }

        return [entry, ...navToSitemapEntries(item.subItems)]
    })
}

/**
 * Sets the CrafterCMS authentication cookies on the response if they are not already present on the request.
 * Required for the Next.js proxy route to forward credentials to the CrafterCMS server.
 *
 * @param request - The incoming Next.js request, used to check for existing cookies.
 * @param response - The outgoing Next.js response, where cookies are set if missing.
 */
export const setProxyCrafterCookies = (request: NextRequest, response: NextResponse) => {
    const hasPreviewCookie = request.cookies.has(CRAFTER_PREVIEW_COOKIE_NAME)
    const hasSiteCookie = request.cookies.has(CRAFTER_SITE_COOKIE_NAME)

    const cookieOptions = {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: 'none' as const,
        secure: true,
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
