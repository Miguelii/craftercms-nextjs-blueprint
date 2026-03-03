export enum ModelPathEnum {
    HOME_PAGE = '/site/website/index.xml',
    ABOUT_PAGE = '/site/website/about/index.xml',
    FOOTER_COMPONENT = '/site/components/footer.xml',
}

export const CRAFTER_SITE_COOKIE_NAME: string = 'crafterSite'

export const CRAFTER_PREVIEW_COOKIE_NAME: string = 'crafterPreview'

/*** GET_MODEL constants ***/
export const GET_MODEL_CACHE_KEY_PREFIX: string = 'getModel'

export const GET_MODEL_CACHE_TIME_S: number | false = 1 // 1 second

export const GET_MODEL_TIMEOUT_MS: number = 10000 // 10 seconds

// GET_NAV constants
export const GET_NAV_CACHE_KEY_PREFIX: string = 'getNav'

export const GET_NAV_CACHE_TIME_S: number | false = 1 // 1 second

export const GET_NAV_TIMEOUT_MS: number = 10000 // 10 seconds
