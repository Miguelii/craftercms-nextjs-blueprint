import { ClientEnv } from '@/env/client'
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

    return {
        baseUrl: ClientEnv.NEXT_PUBLIC_CRAFTERCMS_HOST_NAME,
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
