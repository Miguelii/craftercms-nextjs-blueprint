'use client'

import { createContext, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { fetchIsAuthoring } from '@craftercms/experience-builder'
import { getCrafterConfig } from '@/lib/utils'
import { Logger } from '@/lib/logger'
import { ClientEnv } from '@/env/client'

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
        if (ClientEnv.NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT === 'delivery') {
            setAppContext({ isAuthoring: false })
            return
        }

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
