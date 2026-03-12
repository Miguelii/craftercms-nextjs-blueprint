import 'server-only'

import { ClientEnv } from '@/env/client'
import type { NavigationItem } from '@craftercms/models'
import type { MetadataRoute } from 'next'
import type { NextRequest, NextResponse } from 'next/server'
import { CRAFTER_PREVIEW_COOKIE_NAME, CRAFTER_SITE_COOKIE_NAME } from '@/lib/constants'
import { unstable_cache } from 'next/cache'

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

    // In delivery we dont need the preview cookie
    if (!hasPreviewCookie && ClientEnv.NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT !== 'delivery') {
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

/**
 * Conditionally wraps a function with `unstable_cache`.
 * In delivery, applies server-side caching with the given key and TTL.
 * In authoring, returns the function as-is so editors always see fresh content.
 *
 * @param fn - The async function to optionally cache.
 * @param keyParts - Cache key segments forwarded to `unstable_cache`.
 * @param options - Cache options including `revalidate` (TTL in seconds) and `tags` for on-demand invalidation.
 * @returns The original function in authoring, or a cached version in delivery.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDeliveryCache = <T extends (...args: any[]) => Promise<unknown>>(
    fn: T,
    keyParts: string[],
    options: { revalidate: number; tags: string[] }
): T => {
    if (ClientEnv.NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT === 'delivery') {
        return unstable_cache(fn, keyParts, options)
    }
    return fn
}
