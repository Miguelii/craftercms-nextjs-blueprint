import type { MetadataRoute } from 'next'
import { getNav } from '@/lib/crafter-api'
import { ClientEnv } from '@/env/client'
import type { NavigationItem } from '@craftercms/models'

export const revalidate = 86400 // 24h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // This value depends on how many sub-pages exist in CrafterCMS
    // Adjust as necessary
    const SEARCH_DEPTH = 10

    const siteNav = await getNav(SEARCH_DEPTH)

    if (!siteNav) return []

    return navToSitemapEntries(siteNav)
}

/**
 * Recursively traverses all navigation items and their subItems.
 *
 * @param items - Array of NavigationItem objects that may contain nested subItems.
 * @returns A flat array of MetadataRoute.Sitemap entries.
 */
function navToSitemapEntries(items: NavigationItem[]): MetadataRoute.Sitemap {
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
