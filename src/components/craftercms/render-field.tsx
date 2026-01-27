'use client'

import type { FieldProps } from '@craftercms/experience-builder/react'
import { RenderField as CMSField } from '@craftercms/experience-builder/react/RenderField'
import type { RenderFieldProps } from '@craftercms/experience-builder/react/RenderField'
import type { ContentInstance } from '@craftercms/models'

interface CMSFieldProps<V = unknown, F = V> extends Omit<
    RenderFieldProps<unknown, V, F>,
    'component'
> {
    model: ContentInstance
    component?: FieldProps['component']
}

/**
 * Client-side wrapper for CrafterCMS RenderField component.
 *
 * This wrapper isolates the 'use client' directive required by the CrafterCMS RenderField,
 * allowing the parent components to remain as Server Components.
 *
 * **Important:** When using the `render` prop, the consuming component must also be client-side.
 * Functions cannot be serialized and passed from Server to Client Components - only plain objects
 * can cross the server/client boundary.
 *
 * @example
 * ```tsx
 * // Server Component
 * export default async function ServerComponent() {
 *   const model = await getModel()
 *   const data = await fetchSomeDataFromSSR()
 *
 *   return (
 *     <div>
 *       <RenderField
 *         model={model}
 *         fieldId="title_s"
 *       />
 *       // Allows to render a Server Component
 *       <ServerComponent data={data} />
 *     </div>
 *   )
 * }
 * ```
 *
 *
 * @example
 * ```tsx
 * // Using render prop - component must be client-side
 * 'use client'
 * export default function ClientComponent({ model }) {
 *   return (
 *     <RenderField
 *       model={model}
 *       fieldId="title_s"
 *       render={(title_s: string) =>
 *         title_s?.replaceAll('_TOKEN_', 'REPLACED')
 *       }
 *     />
 *   )
 * }
 * ```
 */
export default function RenderField<V = unknown, F = V>(props: Readonly<CMSFieldProps<V, F>>) {
    if (!props.model) return null
    return <CMSField {...props} />
}
