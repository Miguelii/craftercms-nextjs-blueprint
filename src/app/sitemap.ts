import type { MetadataRoute } from 'next'
import { getNav } from '@/lib/crafter-api'
import { navToSitemapEntries } from '@/lib/utils.server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // This value depends on how many sub-pages exist in CrafterCMS
    // Adjust as necessary
    const SEARCH_DEPTH = 10

    const siteNav = await getNav(SEARCH_DEPTH)

    if (!siteNav) return []

    return navToSitemapEntries(siteNav)
}
