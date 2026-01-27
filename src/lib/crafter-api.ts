import { parseDescriptor, getItem, getNavTree } from '@craftercms/content'
import { cache } from 'react'
import { firstValueFrom, map } from 'rxjs'
import getCrafterConfig from './get-crafter-config'
import type { ContentInstance, CrafterConfig, NavigationItem } from '@craftercms/models'
import { ModelPathEnum } from '@/lib/constants'

type CrafterPath = ModelPathEnum | `/site/website/${string}/index.xml`

/**
 * `flatten` is required for correct API behavior but is missing from the
 * official `config: Partial<CrafterConfig>` type.
 * This extends the config to avoid TypeScript errors.
 */
type CrafterConfigWithFlatten = CrafterConfig & {
    flatten: boolean
}

export const getModel = cache(async (path: CrafterPath): Promise<ContentInstance | null> => {
    const baseConfig = getCrafterConfig()

    try {
        return await firstValueFrom(
            getItem(path, { ...baseConfig, flatten: true } as CrafterConfigWithFlatten).pipe(
                map((descriptor) => parseDescriptor(descriptor, { parseFieldValueTypes: true }))
                // Can use this for debugging purposes.
                // tap(console.log)
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
})

export const getNav = cache(async (depth: number): Promise<NavigationItem[]> => {
    const baseConfig = getCrafterConfig()

    try {
        return await firstValueFrom(
            getNavTree('/site/website', depth, '/', {
                ...baseConfig,
                flatten: true,
            } as CrafterConfigWithFlatten).pipe(
                // Flatten the nav so that home shows at the same level as the children.
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
})
