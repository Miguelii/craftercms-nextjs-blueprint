import { ExperienceBuilder } from '@/components/craftercms/experience-builder'
import { RenderField } from '@/components/craftercms/render-field'
import { ModelPathEnum } from '@/lib/constants'
import { getModel } from '@/lib/crafter-api'

export const dynamic = 'force-dynamic'

export default async function AboutPage(props: PageProps<'/about'>) {
    const model = await getModel(ModelPathEnum.ABOUT_PAGE)

    return (
        <ExperienceBuilder model={model}>
            <main className="flex container mx-auto items-center w-full px-5 sm:px-0 mt-10 h-full justify-center">
                <RenderField
                    model={model!}
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
