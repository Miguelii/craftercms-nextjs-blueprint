'use client'

import type { ContentInstance } from '@craftercms/models'
import RenderField from '@/components/craftercms/render-field'
import Model from '@craftercms/experience-builder/react/Model'

type Props = {
    model: ContentInstance
}

export default function RichText({ model }: Props) {
    return (
        <Model
            model={model}
            component="article"
            componentProps={{
                className: 'px-4 py-5',
            }}
        >
            <RenderField
                model={model}
                fieldId="content_html"
                componentProps={{
                    className: 'prose [&_*]:text-primary mx-auto max-w-[800px]',
                }}
                renderTarget="dangerouslySetInnerHTML"
                render={(__html: string) => ({ __html })}
            />
        </Model>
    )
}
