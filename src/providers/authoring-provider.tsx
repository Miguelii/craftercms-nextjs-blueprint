'use client'

import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { fetchIsAuthoring } from '@craftercms/experience-builder'
import { getCrafterConfig } from '@/lib/utils'
import { Logger } from '@/lib/logger'

type Context = {
    isAuthoring: boolean
}

export const AuthoringContext = createContext<Context>({
    isAuthoring: false,
})

const baseConfig = getCrafterConfig()

export const AuthoringProvider = ({ children }: PropsWithChildren) => {
    const [appContext, setAppContext] = useState({
        isAuthoring: false,
    })

    useEffect(() => {
        fetchIsAuthoring(baseConfig)
            .then((res) => setAppContext({ isAuthoring: res }))
            .catch((error) => {
                Logger.error('[tryCatch Error] in fetchIsAuthoring', error)
            })
    }, [])

    const contextValue = useMemo(
        () => ({ isAuthoring: appContext.isAuthoring }),
        [appContext.isAuthoring]
    )

    return <AuthoringContext value={contextValue}>{children}</AuthoringContext>
}
