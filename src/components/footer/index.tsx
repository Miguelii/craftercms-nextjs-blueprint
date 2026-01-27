import { CMSModelPath } from '@/lib/constants'
import { getModel } from '@/lib/crafter-api'
import FooterCopyRight from './footer-copyright'
import ExperienceBuilder from '../craftercms/experience-builder'

export default async function Footer() {
    const model = await getModel(CMSModelPath.FOOTER_COMPONENT)

    return (
        <ExperienceBuilder model={model}>
            <footer className="bg-blue-600 text-white shadow-md relative h-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center h-full flex">
                    <FooterCopyRight model={model} />
                </div>
            </footer>
        </ExperienceBuilder>
    )
}
