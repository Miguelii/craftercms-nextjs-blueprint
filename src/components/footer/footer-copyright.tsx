'use client'

import type { ContentInstance } from '@craftercms/models'
import { RenderField } from '@/components/craftercms/render-field'

/**
 * This component cannot be a Server Component because it uses the `render` prop
 * from RenderField, which is a function. Functions cannot be serialized
 * and passed from Server Components to Client Components (only plain objects can
 * be serialized).
 */

type Props = {
    model: ContentInstance | null
}

export function FooterCopyRight({ model }: Props) {
    return (
        <RenderField
            model={model!}
            fieldId="copy_s"
            component="span"
            render={(copy_s: string) =>
                copy_s?.replaceAll('$YEAR', String(new Date().getFullYear()))
            }
        />
    )
}
