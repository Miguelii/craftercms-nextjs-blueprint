import { ClientEnv } from '@/env/client'
import type { ContentInstance, NavigationItem } from '@craftercms/models'
import type { MetadataRoute } from 'next'

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
 * When an item is not found, the CrafterCMS SDK returns a body like:
 * `{ craftercms: { id: null, ... }, message: "No item found at ..." }`.
 * This function detects that case and throws so that the calling function can handle it uniformly.
 *
 * @param model - The ContentInstance returned by the CrafterCMS SDK.
 * @returns The model, unchanged.
 * @throws {Error} If `model.craftercms.id` is null or `model.message` starts with "No item found".
 */
export function ensureModelFound(model: ContentInstance): ContentInstance {
    if (
        model.craftercms?.id === null ||
        (typeof model.message === 'string' &&
            model.message.toUpperCase().startsWith('NO ITEM FOUND'))
    ) {
        throw new Error(typeof model.message === 'string' ? model.message : 'Model not found')
    }
    return model
}
