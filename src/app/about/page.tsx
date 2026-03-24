import { ExperienceBuilder } from '@/components/craftercms/experience-builder'
import { RenderField } from '@/components/craftercms/render-field'
import { ModelWebUrlEnum } from '@/lib/constants'
import { getModelByUrl } from '@/lib/crafter-api'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

// oxlint-disable-next-line no-unused-vars - just to show an example of type page props
export default async function AboutPage(props: PageProps<'/about'>) {
    const model = await getModelByUrl(ModelWebUrlEnum.ABOUT_PAGE)

    if (!model) return notFound()

    return (
        <ExperienceBuilder model={model}>
            <main className="flex container mx-auto items-center w-full px-5 sm:px-0 mt-10 h-full justify-center">
                <RenderField
                    model={model}
                    fieldId="title_s"
                    componentProps={{
                        component: 'h1',
                        className: 'text-2xl font-bold w-full text-center',
                    }}
                />
            </main>
        </ExperienceBuilder>
    )
}
