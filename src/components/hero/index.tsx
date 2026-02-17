'use client'

import type { ContentInstance } from '@craftercms/models'
import { RenderField } from '@/components/craftercms/render-field'
import Image from 'next/image'
import { ClientEnv } from '@/env/client'
import Model from '@craftercms/experience-builder/react/Model'
import { CRAFTER_PREVIEW_COOKIE_NAME, CRAFTER_SITE_COOKIE_NAME } from '@/lib/constants'

type Props = {
    model: ContentInstance
}

export function Hero({ model }: Readonly<Props>) {
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

                    /*
                     * In order for Next.js to fetch the image, we need to create the URL
                     * with CRAFTER_SITE_COOKIE_NAME and CRAFTER_PREVIEW_COOKIE_NAME in searchParams.
                     */
                    const previewToken = encodeURIComponent(ClientEnv.NEXT_PUBLIC_PREVIEW_TOKEN)

                    const URL = `${ClientEnv.NEXT_PUBLIC_CRAFTERCMS_HOST_NAME}${imgSrc}?${CRAFTER_SITE_COOKIE_NAME}=${ClientEnv.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME}&${CRAFTER_PREVIEW_COOKIE_NAME}=${previewToken}`

                    return (
                        <Image
                            alt="Hero background image"
                            width={1536}
                            height={400}
                            sizes="100vw"
                            className="object-cover w-full h-full"
                            src={URL}
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
