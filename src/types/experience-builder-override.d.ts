import '@craftercms/experience-builder/react'

declare module '@craftercms/experience-builder/react' {
    /** @deprecated Import from '@/components/craftercms/render-field' instead to allow Server-Side-Rendering (SSR) */
    export const RenderField: never

    /** @deprecated Import from '@/components/craftercms/experience-builder' instead to allow Server-Side-Rendering SSR */
    export const ExperienceBuilder: never
}
