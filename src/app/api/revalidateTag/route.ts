import { Logger } from '@/lib/logger'
import { GET_MODEL_CACHE_KEY_PREFIX, GET_NAV_CACHE_KEY_PREFIX } from '@/lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const TAG_MAP: Record<string, string[]> = {
    model: [GET_MODEL_CACHE_KEY_PREFIX],
    nav: [GET_NAV_CACHE_KEY_PREFIX],
    all: [GET_MODEL_CACHE_KEY_PREFIX, GET_NAV_CACHE_KEY_PREFIX],
}

/**
 * Example endpoint that invalidates `unstable_cache` entries via `revalidateTag`.
 *
 * Usage:
 * - `GET /api/revalidateTag?type=model` — invalidates all cached models.
 * - `GET /api/revalidateTag?type=nav`   — invalidates the cached navigation tree.
 * - `GET /api/revalidateTag?type=all`   — invalidates all models/navigation cache entries.
 *
 * In a real CrafterCMS setup, a webhook can be configured so that every time
 * content is published to the delivery environment, CrafterCMS calls this endpoint
 * to bust the relevant cache entries — ensuring visitors see fresh content without
 * waiting for the TTL to expire.
 *
 * @security This endpoint has **no authentication**. In production, you should protect it
 * (e.g. with somekind of secret / API key / External Auth) to prevent abuse — an attacker could otherwise
 * call it repeatedly to force constant cache invalidation, degrading performance.
 */
export async function GET(request: NextRequest) {
    try {
        const type = new URL(request.url).searchParams.get('type')

        if (!type) {
            return NextResponse.json({ error: 'Missing "type" query parameter' }, { status: 400 })
        }

        const tags = TAG_MAP[type]

        if (!tags) {
            return NextResponse.json({ error: `Unknown type "${type}"` }, { status: 400 })
        }

        for (const tag of tags) {
            revalidateTag(tag, 'max')
        }

        return NextResponse.json({ revalidated: true, type, tags })
    } catch (error) {
        Logger.error('tryCatch Error in revalidateTag API', error)
        return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
    }
}
