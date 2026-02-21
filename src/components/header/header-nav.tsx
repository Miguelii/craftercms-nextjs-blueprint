'use client'

import type { NavigationItem } from '@craftercms/models'
import Link from 'next/link'
import { use, useState } from 'react'

type Props = {
    navPromise: Promise<NavigationItem[]>
}

export function HeaderNav({ navPromise }: Props) {
    const navigation = use(navPromise)

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="hidden md:flex space-x-4">
                {navigation?.map((page) => (
                    <Link
                        key={page.url}
                        href={page.url}
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        {page.label}
                    </Link>
                ))}
            </div>

            <div className="flex md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    className="cursor-pointer inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white text-black shadow-xl md:hidden z-50">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((page) => (
                            <Link
                                key={page.url}
                                href={page.url}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                {page.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
