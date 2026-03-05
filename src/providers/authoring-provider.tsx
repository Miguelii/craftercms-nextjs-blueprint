'use client'

import { createContext, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { fetchIsAuthoring } from '@craftercms/experience-builder'
import { getCrafterConfig } from '@/lib/utils'

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
                console.error(`[tryCatch Error] in fetchIsAuthoring`, {
                    message: error instanceof Error ? error.message : error,
                    stack: error instanceof Error ? error.stack : undefined,
                    timestamp: new Date().toISOString(),
                })
            })
    }, [])

    const contextValue = useMemo(
        () => ({ isAuthoring: appContext.isAuthoring }),
        [appContext.isAuthoring]
    )

    return <AuthoringContext value={contextValue}>{children}</AuthoringContext>
}
