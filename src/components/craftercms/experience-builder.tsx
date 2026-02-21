'use client'

import { AuthoringContext } from '@/providers/authoring-provider'
import { ExperienceBuilder as CMSBuilder } from '@craftercms/experience-builder/react/ExperienceBuilder'
import type { ContentInstance } from '@craftercms/models'
import { use, type PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    model: ContentInstance | null
}>

/**
 * Client-side wrapper for CrafterCMS ExperienceBuilder component.
 *
 * This wrapper isolates the 'use client' directive required by the CrafterCMS ExperienceBuilder,
 * allowing the parent components to remain as Server Components.
 *
 * @example
 * ```tsx
 * // Server Component
 * export default async function ServerComponent() {
 *  const [model, data] = await Promise.all([
 *      getModel(),
 *      fetchSomeDataFromSSR()
 *  ])
 *
 *   return (
 *     <ExperienceBuilder model={model}>
 *       // Server Components can be used alongside ExperienceBuilder
 *       <ServerComponent data={data} />
 *     </ExperienceBuilder>
 *   )
 * }
 * ```
 */
export function ExperienceBuilder({ model, children }: Props) {
    const { isAuthoring } = use(AuthoringContext)

    if (!model) return children

    return (
        <CMSBuilder model={model} isAuthoring={isAuthoring}>
            {children}
        </CMSBuilder>
    )
}
