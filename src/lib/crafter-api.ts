import { parseDescriptor, getItem, getNavTree } from '@craftercms/content'
import { cache } from 'react'
import { firstValueFrom, map } from 'rxjs'
import type { ContentInstance, CrafterConfig, NavigationItem } from '@craftercms/models'
import {
    GET_MODEL_CACHE_KEY_PREFIX,
    GET_NAV_CACHE_KEY_PREFIX,
    ModelPathEnum,
} from '@/lib/constants'
import { getCrafterConfig } from '@/lib/get-crafter-config'
import { unstable_cache } from 'next/cache'

type ModelPath = ModelPathEnum | `/site/website/${string}/index.xml`

/**
 * `flatten` is required for correct API behavior but is missing from the
 * official `config: Partial<CrafterConfig>` type.
 * This extends the config to avoid TypeScript errors.
 */
type CrafterConfigWithFlatten = CrafterConfig & {
    flatten: boolean
}

/**
 * All crafter data-fetching functions in this file are wrapped with two layers of cache:
 *
 * 1. `unstable_cache` (Next.js Data Cache) — persists results across requests.
 *    The CrafterCMS SDK uses its own HTTP client (RxJS observables), so Next.js
 *    cannot intercept and cache these calls automatically.
 *    `unstable_cache` fills that gap, storing results server-side with a configurable TTL (`revalidate`)
 *    and supporting on-demand invalidation via tags (`revalidateTag`).
 *
 * 2. `React.cache()` — deduplicates calls within a single request's render tree.
 *    If the same function is called multiple times with the same arguments during
 *    one render (e.g. from layout and page), it only executes once per request.
 *
 * ---
 *
 * Also a note about revalidate values:
 *
 * In a real CrafterCMS setup, two separate Next.js applications are typically deployed:
 *
 * - Authoring app: connects to Preview. Content editors need to see their changes immediately, so `revalidate` must be false.
 *
 * - Delivery app: connects to published content. Content only changes when editor publishes, so it can be cached with a longer TTL.
 *   The optimal duration depends on how often content changes and how critical it is for users to see updates immediately.
 *
 * This blueprint uses `revalidate: false` since it targets the authoring/preview environment.
 **/

const baseConfig = getCrafterConfig()

export const getModel = cache(
    unstable_cache(
        async (path: ModelPath): Promise<ContentInstance | null> => {
            try {
                return await firstValueFrom(
                    getItem(path, {
                        ...baseConfig,
                        flatten: true,
                    } as CrafterConfigWithFlatten).pipe(
                        map((descriptor) =>
                            parseDescriptor(descriptor, { parseFieldValueTypes: true })
                        )
                    )
                )
            } catch (error) {
                console.error(`[tryCatch Error] in getModel`, {
                    message: error instanceof Error ? error.message : error,
                    stack: error instanceof Error ? error.stack : undefined,
                    timestamp: new Date().toISOString(),
                })
                return null
            }
        },
        [GET_MODEL_CACHE_KEY_PREFIX],
        { revalidate: false, tags: [GET_MODEL_CACHE_KEY_PREFIX] }
    )
)

export const getNav = cache(
    unstable_cache(
        async (depth: number): Promise<NavigationItem[]> => {
            try {
                return await firstValueFrom(
                    getNavTree('/site/website', depth, '/', {
                        ...baseConfig,
                        flatten: true,
                    } as CrafterConfigWithFlatten).pipe(
                        map((navigation) => [
                            {
                                label: navigation.label,
                                url: navigation.url,
                                active: navigation.active,
                                attributes: navigation.attributes,
                                subItems: [],
                            },
                            ...navigation.subItems,
                        ])
                    )
                )
            } catch (error) {
                console.error(`[tryCatch Error] in getNav`, {
                    message: error instanceof Error ? error.message : error,
                    stack: error instanceof Error ? error.stack : undefined,
                    timestamp: new Date().toISOString(),
                })
                return []
            }
        },
        [GET_NAV_CACHE_KEY_PREFIX],
        { revalidate: false, tags: [GET_NAV_CACHE_KEY_PREFIX] }
    )
)
