import type { MetadataRoute } from 'next'
import { getNav } from '@/lib/crafter-api'
import { ClientEnv } from '@/env/client'

export const revalidate = 86400 // 24h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteNav = await getNav()

    if (!siteNav) return []

    const sitemapEntries: MetadataRoute.Sitemap = []

    siteNav.forEach((item) => {
        sitemapEntries.push({
            url: `${ClientEnv.NEXT_PUBLIC_HOST}${item.url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        })
    })

    return sitemapEntries
}
