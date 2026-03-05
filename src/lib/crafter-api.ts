import { parseDescriptor, getItem, getNavTree, urlTransform } from '@craftercms/content'
import { cache } from 'react'
import { firstValueFrom, map, switchMap, timeout } from 'rxjs'
import type { ContentInstance, CrafterConfig, NavigationItem } from '@craftercms/models'
import {
    GET_MODEL_CACHE_KEY_PREFIX,
    GET_MODEL_CACHE_TIME_S,
    GET_MODEL_TIMEOUT_MS,
    GET_NAV_CACHE_KEY_PREFIX,
    GET_NAV_CACHE_TIME_S,
    GET_NAV_TIMEOUT_MS,
    ModelPathEnum,
    ModelWebUrlEnum,
} from '@/lib/constants'
import { getCrafterConfig } from '@/lib/get-crafter-config'
import { unstable_cache } from 'next/cache'
import { ensureModelFound } from './utils'

/**
 * There is a type mismatch in the getItem and getNavTree functions from the CrafterCMS SDK:
 *
 * - getItem expects a `config: Partial<CrafterConfig>` but requires a `flatten` property in that config to work correctly,
 * which is not included in the official `CrafterConfig` type definition.
 *
 * - getNavTree has the same issue, expects a `config: CrafterConfig` but also requires a `flatten` property.
 *
 * This extends the config to avoid TypeScript errors.
 **/
type CrafterConfigWithFlatten = CrafterConfig & {
    flatten: boolean
}

/**
 * Crafter data-fetching functions in this file are wrapped with two layers of cache:
 *
 * 1. `unstable_cache` — persists results across requests.
 *    The CrafterCMS SDK uses its own HTTP client (RxJS observables), so Next.js
 *    cannot intercept and cache these calls automatically.
 *    `unstable_cache` solves that gap, storing results server-side with a configurable TTL (`revalidate`).
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
 * - Authoring app: connects to Preview. Content editors need to see their changes immediately, so `revalidate` must be 1 (lowest possible value).
 *
 * - Delivery app: connects to published content. Content only changes when editor publishes, so it can be cached with a longer TTL.
 *   The optimal duration depends on how often content changes and how critical it is for users to see updates immediately.
 *
 * This blueprint uses `revalidate: 1` since it targets the authoring/preview environment.
 *
 * It may be a bit overkill, but the idea here is to really show the power that Next.js brings to CrafterCMS.
 **/

const baseConfig = getCrafterConfig()

export const getModel = cache(
    unstable_cache(
        async (path: ModelPathEnum): Promise<ContentInstance | null> => {
            try {
                return await firstValueFrom(
                    getItem(path, {
                        ...baseConfig,
                        flatten: true,
                    } as CrafterConfigWithFlatten).pipe(
                        timeout(GET_MODEL_TIMEOUT_MS),
                        map((descriptor) =>
                            ensureModelFound(
                                parseDescriptor(descriptor, { parseFieldValueTypes: true })
                            )
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
        { revalidate: GET_MODEL_CACHE_TIME_S, tags: [GET_MODEL_CACHE_KEY_PREFIX] }
    )
)

export const getModelByUrl = cache(
    unstable_cache(
        async (webUrl: ModelWebUrlEnum): Promise<ContentInstance | null> => {
            try {
                return await firstValueFrom(
                    urlTransform('renderUrlToStoreUrl', webUrl, baseConfig).pipe(
                        switchMap((path) =>
                            getItem(path, {
                                ...baseConfig,
                                flatten: true,
                            } as CrafterConfigWithFlatten).pipe(
                                map((descriptor) =>
                                    ensureModelFound(
                                        parseDescriptor(descriptor, {
                                            parseFieldValueTypes: true,
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            } catch (error) {
                console.error(`[tryCatch Error] in getModelByUrl`, {
                    message: error instanceof Error ? error.message : error,
                    stack: error instanceof Error ? error.stack : undefined,
                    timestamp: new Date().toISOString(),
                })
                return null
            }
        },
        [GET_MODEL_CACHE_KEY_PREFIX],
        { revalidate: GET_MODEL_CACHE_TIME_S, tags: [GET_MODEL_CACHE_KEY_PREFIX] }
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
                        timeout(GET_NAV_TIMEOUT_MS),
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
        { revalidate: GET_NAV_CACHE_TIME_S, tags: [GET_NAV_CACHE_KEY_PREFIX] }
    )
)
