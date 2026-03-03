'use client'

import { ExperienceBuilder } from '@/components/craftercms/experience-builder'
import type { ContentInstance } from '@craftercms/models'
import { use } from 'react'
import { RenderField } from '@/components/craftercms/render-field'

type Props = {
    footerModelPromise: Promise<ContentInstance | null>
}

export function Footer({ footerModelPromise }: Props) {
    const model = use(footerModelPromise)

    return (
        <ExperienceBuilder model={model}>
            <footer className="bg-blue-600 text-white shadow-md relative h-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center h-full flex">
                    <RenderField
                        model={model!}
                        fieldId="copy_s"
                        component="span"
                        render={(copy_s: string) =>
                            copy_s?.replaceAll('$YEAR', String(new Date().getFullYear()))
                        }
                    />
                </div>
            </footer>
        </ExperienceBuilder>
    )
}
