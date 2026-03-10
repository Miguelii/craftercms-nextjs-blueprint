export enum ModelPathEnum {
    HOME_PAGE = '/site/website/index.xml',
    ABOUT_PAGE = `/site/website/about/index.xml`,
    FOOTER_COMPONENT = '/site/components/footer.xml',
}

export enum ModelWebUrlEnum {
    HOME_PAGE = '/',
    ABOUT_PAGE = '/about',
}

/*** CRAFTER COOKIE constants ***/
export const CRAFTER_SITE_COOKIE_NAME = 'crafterSite' as const

export const CRAFTER_PREVIEW_COOKIE_NAME = 'crafterPreview' as const

/*** GET_MODEL constants ***/
export const GET_MODEL_CACHE_KEY_PREFIX = 'getModel' as const

export const GET_MODEL_DELIVERY_CACHE_TIME_S = 1800 as const // 30 minutes

export const GET_MODEL_TIMEOUT_MS = 10000 as const // 10 seconds

/*** GET_NAV constants ***/
export const GET_NAV_CACHE_KEY_PREFIX = 'getNav' as const

export const GET_NAV_DELIVERY_CACHE_TIME_S = 1800 as const // 30 minutes

export const GET_NAV_TIMEOUT_MS = 10000 as const // 10 seconds
