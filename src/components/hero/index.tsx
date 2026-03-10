'use client'

import type { ContentInstance } from '@craftercms/models'
import { RenderField } from '@/components/craftercms/render-field'
import Image from 'next/image'
import Model from '@craftercms/experience-builder/react/Model'
import { buildCrafterAssetUrl } from '@/lib/utils'

type Props = {
    model: ContentInstance
}

export function Hero({ model }: Props) {
    return (
        <Model
            model={model}
            component="article"
            componentProps={{
                className: 'relative w-full h-[200px] flex items-center justify-center',
            }}
        >
            <RenderField
                model={model}
                fieldId="background_s"
                component="div"
                componentProps={{
                    className: 'absolute inset-0 h-full w-full',
                }}
                render={(imgSrc: string) => {
                    if (!imgSrc) return null

                    return (
                        <Image
                            alt="Hero background image"
                            width={1536}
                            height={400}
                            sizes="100vw"
                            className="object-cover w-full h-full"
                            src={buildCrafterAssetUrl(imgSrc)}
                        />
                    )
                }}
            />

            <RenderField
                model={model}
                fieldId="title_s"
                component="h2"
                componentProps={{
                    className:
                        'relative z-10 text-white w-full text-center text-3xl font-bold px-4',
                }}
            />
        </Model>
    )
}
