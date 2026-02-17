'use client'

import RenderComponents from '@craftercms/experience-builder/react/RenderComponents'
import type { ContentInstance } from '@craftercms/models'
import { Hero } from '@/components/hero'
import { RichText } from '@/components/rich-text'

type Props = {
    model: ContentInstance
}

const contentTypeMap = {
    '/component/rte': RichText,
    '/component/hero': Hero,
} as const

export function HomeContent({ model }: Readonly<Props>) {
    if (!model) return null

    return (
        <RenderComponents
            contentTypeMap={contentTypeMap}
            model={model}
            fieldId="content_o"
            componentProps={{
                className: 'w-full',
            }}
            contentTypeProps={{
                className: 'w-full',
            }}
        />
    )
}
