import { getNav } from '@/lib/crafter-api'
import { Suspense } from 'react'
import { HeaderNav } from '@/components/header/header-nav'

export function Header() {
    const navPromise = getNav(1)

    return (
        <nav className="bg-blue-600 text-white shadow-md relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex shrink-0">
                        <span className="text-xl font-bold">Logo</span>
                    </div>

                    <Suspense fallback={<NavLoading />}>
                        <HeaderNav navPromise={navPromise} />
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}

const NavLoading = () => (
    <div className="flex w-fit flex-row gap-4 items-center">
        <div className="flex h-8 w-20 bg-background rounded animate-pulse shrink-0" />
        <div className="flex h-8 w-20 bg-background rounded animate-pulse shrink-0" />
    </div>
)
