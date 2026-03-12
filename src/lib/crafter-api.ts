import { parseDescriptor, getItem, getNavTree, urlTransform } from '@craftercms/content'
import type { GetDescriptorConfig } from '@craftercms/content'
import { cache } from 'react'
import { firstValueFrom, map, switchMap, timeout } from 'rxjs'
import type { ContentInstance, NavigationItem } from '@craftercms/models'
import {
    GET_MODEL_CACHE_KEY_PREFIX,
    GET_MODEL_DELIVERY_CACHE_TIME_S,
    GET_MODEL_TIMEOUT_MS,
    GET_NAV_CACHE_KEY_PREFIX,
    GET_NAV_DELIVERY_CACHE_TIME_S,
    GET_NAV_TIMEOUT_MS,
    ModelPathEnum,
    ModelWebUrlEnum,
} from '@/lib/constants'
import { ensureModelFound, getCrafterConfig } from '@/lib/utils'
import { Logger } from './logger'
import { withDeliveryCache } from './utils.server'

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
 *
 * -- IMPORTANT note about unstable_cache:
 *
 * unstable_cache has a tricky bug: if the function returns null (or any falsy value),
 * that result gets cached and all subsequent requests will receive it until revalidation.
 * To prevent this, __Fn functions have no try/catch — errors are thrown instead of returned,
 * so unstable_cache never stores a failed response. That wrapper exists solely to catch
 * those errors and return null without polluting the cache.
 *

 * -- Note about environment-aware caching (`withDeliveryCache`):
 *
 * In a real CrafterCMS setup, two separate Next.js builds are typically deployed:
 *
 * - Authoring build: connects to Preview. Content editors need to see their changes immediately,
 *   so `withDeliveryCache` skips `unstable_cache` entirely and runs the function directly.
 *
 * - Delivery build: connects to published content. Content only changes when an editor publishes,
 *   so `withDeliveryCache` wraps the function with `unstable_cache` using a configurable TTL.
 *
 * The environment is determined at build time via `NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT`.
 * 
 * It may be a bit overkill, but the idea here is to really show the power that Next.js brings to CrafterCMS.
 **/

const baseConfig = getCrafterConfig()

export const getModel = async (path: ModelPathEnum): Promise<ContentInstance | null> => {
    try {
        return await getModelFn(path)
    } catch (error) {
        Logger.error('[tryCatch Error] in getModel', error)
        return null
    }
}
const getModelFn = cache(
    withDeliveryCache(
        async (path: ModelPathEnum): Promise<ContentInstance> => {
            return await firstValueFrom(
                getItem(path, {
                    ...baseConfig,
                    flatten: true,
                } as GetDescriptorConfig).pipe(
                    timeout(GET_MODEL_TIMEOUT_MS),
                    map((descriptor) =>
                        ensureModelFound(
                            parseDescriptor(descriptor, { parseFieldValueTypes: true })
                        )
                    )
                )
            )
        },
        [GET_MODEL_CACHE_KEY_PREFIX],
        { revalidate: GET_MODEL_DELIVERY_CACHE_TIME_S, tags: [GET_MODEL_CACHE_KEY_PREFIX] }
    )
)

export const getModelByUrl = async (webUrl: ModelWebUrlEnum): Promise<ContentInstance | null> => {
    try {
        return await getModelByUrlFn(webUrl)
    } catch (error) {
        Logger.error('[tryCatch Error] in getModelByUrl', error)
        return null
    }
}
const getModelByUrlFn = cache(
    withDeliveryCache(
        async (webUrl: ModelWebUrlEnum): Promise<ContentInstance> => {
            return await firstValueFrom(
                urlTransform('renderUrlToStoreUrl', webUrl, baseConfig).pipe(
                    switchMap((path) =>
                        getItem(path, {
                            ...baseConfig,
                            flatten: true,
                        } as GetDescriptorConfig).pipe(
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
        },
        [GET_MODEL_CACHE_KEY_PREFIX],
        { revalidate: GET_MODEL_DELIVERY_CACHE_TIME_S, tags: [GET_MODEL_CACHE_KEY_PREFIX] }
    )
)

export const getNav = async (depth: number): Promise<NavigationItem[]> => {
    try {
        return await getNavFn(depth)
    } catch (error) {
        Logger.error('[tryCatch Error] in getNav', error)
        return []
    }
}
const getNavFn = cache(
    withDeliveryCache(
        async (depth: number): Promise<NavigationItem[]> => {
            return await firstValueFrom(
                getNavTree('/site/website', depth, '/', {
                    ...baseConfig,
                    flatten: true,
                } as GetDescriptorConfig).pipe(
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
        },
        [GET_NAV_CACHE_KEY_PREFIX],
        { revalidate: GET_NAV_DELIVERY_CACHE_TIME_S, tags: [GET_NAV_CACHE_KEY_PREFIX] }
    )
)
