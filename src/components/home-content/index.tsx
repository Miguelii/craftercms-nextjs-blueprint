'use client'

import RenderComponents from '@craftercms/experience-builder/react/RenderComponents'
import RichText from '../rich-text'
import type { ContentInstance } from '@craftercms/models'
import Hero from '../hero'
import { useMemo } from 'react'

type Props = {
    model: ContentInstance
}

export default function HomeContent({ model }: Props) {
    const contentTypeMap = useMemo(
        () => ({
            '/component/rte': RichText,
            '/component/hero': Hero,
        }),
        []
    )

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
