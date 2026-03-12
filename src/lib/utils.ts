import { ClientEnv } from '@/env/client'
import { CRAFTER_PREVIEW_COOKIE_NAME, CRAFTER_SITE_COOKIE_NAME } from '@/lib/constants'
import type { ContentInstance, CrafterConfig } from '@craftercms/models'

/**
 * Builds the CrafterCMS SDK config from environment variables.
 * Includes the preview token header required for authenticated requests.
 *
 * @returns A {@link CrafterConfig} object.
 */
export const getCrafterConfig = (): CrafterConfig => {
    const requestHeaders: HeadersInit = {
        'X-Crafter-Preview': ClientEnv.NEXT_PUBLIC_PREVIEW_TOKEN,
    }


    console.log("getCrafterCurrentEnvironmentHost", getCrafterCurrentEnvironmentHost());

    return {
        baseUrl: getCrafterCurrentEnvironmentHost(),
        site: ClientEnv.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME,
        fetchConfig: {
            mode: 'cors',
            headers: requestHeaders,
            credentials: 'include',
        },
        headers: requestHeaders,
    }
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
export const ensureModelFound = (model: ContentInstance): ContentInstance => {
    if (
        model.craftercms?.id === null ||
        (typeof model.message === 'string' &&
            model.message.toUpperCase().startsWith('NO ITEM FOUND'))
    ) {
        throw new Error(typeof model.message === 'string' ? model.message : 'Model not found')
    }
    return model
}

/**
 * Returns the CrafterCMS host URL for the current environment, i.e., delivery or authoring.
 *
 * @returns The base URL of the active CrafterCMS environment.
 */
export const getCrafterCurrentEnvironmentHost = () => {
    return ClientEnv.NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT === 'delivery'
        ? ClientEnv.NEXT_PUBLIC_CRAFTERCMS_DELIVERY_HOST_NAME
        : ClientEnv.NEXT_PUBLIC_CRAFTERCMS_AUTHORING_HOST_NAME
}

/**
 * Builds a CrafterCMS asset URL for the current environment.
 * Appends the site name and preview token as query params so that
 *
 * @param path - The asset path (e.g. `/static-assets/images/hero.jpg`).
 * @returns The absolute URL string with authentication query params.
 */
export const buildCrafterAssetUrl = (path: string): string => {
    const url = new URL(path, getCrafterCurrentEnvironmentHost())

    url.searchParams.set(CRAFTER_SITE_COOKIE_NAME, ClientEnv.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME)

    if (ClientEnv.NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT === 'authoring') {
        url.searchParams.set(CRAFTER_PREVIEW_COOKIE_NAME, ClientEnv.NEXT_PUBLIC_PREVIEW_TOKEN)
    }

    return url.toString()
}
