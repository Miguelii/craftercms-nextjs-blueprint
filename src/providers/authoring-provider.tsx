'use client'

import {
    createContext,
    useEffect,
    useEffectEvent,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react'
import getCrafterConfig from '@/lib/get-crafter-config'
import { fetchIsAuthoring } from '@craftercms/experience-builder'
import { crafterConf } from '@craftercms/classes'

type Context = {
    isAuthoring: boolean
}

export const AuthoringContext = createContext<Context>({
    isAuthoring: false,
})

const baseConfig = getCrafterConfig()

crafterConf.configure(baseConfig)

export const AuthoringProvider = ({ children }: PropsWithChildren) => {
    const [appContext, setAppContext] = useState({
        isAuthoring: false,
    })

    const onConnect = useEffectEvent(() => {
        fetchIsAuthoring()
            .then((res) => {
                setAppContext({ isAuthoring: res })
            })
            .catch((error) => {
                console.error(`[tryCatch Error] in fetchIsAuthoring`, {
                    message: error instanceof Error ? error.message : error,
                    stack: error instanceof Error ? error.stack : undefined,
                    timestamp: new Date().toISOString(),
                })
            })
    })

    useEffect(() => {
        onConnect()
    }, [])

    const contextValue = useMemo(
        () => ({ isAuthoring: appContext.isAuthoring }),
        [appContext.isAuthoring]
    )

    return <AuthoringContext value={contextValue}>{children}</AuthoringContext>
}
