'use client'

import RenderComponents from '@craftercms/experience-builder/react/RenderComponents'
import RichText from '../rich-text'
import type { ContentInstance } from '@craftercms/models'
import Hero from '../hero'

type Props = {
    model: ContentInstance
}

const contentTypeMap = {
    '/component/rte': RichText,
    '/component/hero': Hero,
} as const

export default function HomeContent({ model }: Readonly<Props>) {
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
