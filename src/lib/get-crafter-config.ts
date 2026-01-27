import { ClientEnv } from '@/env/client'
import type { CrafterConfig } from '@craftercms/models'

export default function getCrafterConfig(): CrafterConfig {
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
