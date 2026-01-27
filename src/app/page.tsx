import { getModel } from '@/lib/crafter-api'
import RenderField from '@/components/craftercms/render-field'
import ExperienceBuilder from '@/components/craftercms/experience-builder'
import HomeContent from '@/components/home-content'
import { ModelPathEnum } from '@/lib/constants'

export const dynamic = 'force-dynamic'

type Props = PageProps<'/'>

export default async function Home(props: Props) {
    const model = await getModel(ModelPathEnum.HOME_PAGE)

    return (
        <ExperienceBuilder model={model}>
            <main className="flex flex-col gap-10 container mx-auto items-center w-full px-5 sm:px-0 mt-10 h-full justify-center">
                <RenderField
                    model={model!}
                    fieldId="title_s"
                    componentProps={{
                        component: 'h1',
                        className: 'text-2xl font-bold w-full text-center',
                    }}
                />
                <HomeContent model={model!} />
            </main>
        </ExperienceBuilder>
    )
}
