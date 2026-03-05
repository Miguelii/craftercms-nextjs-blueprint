import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import '@/styles/globals.css'
import { AuthoringProvider } from '@/providers/authoring-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getModel, getNav } from '@/lib/crafter-api'
import { ModelPathEnum } from '@/lib/constants'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
})

export const viewport: Viewport = {
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
    height: 'device-height',
}

export const metadata: Metadata = {
    title: 'CrafterCMS Next.js Blueprint',
    description: 'Created by @miguelgoncalves.dev',
    authors: [{ name: 'Miguel Gonçalves', url: 'https://www.miguelgoncalves.dev' }],
}

type Props = LayoutProps<'/'>

export default async function RootLayout({ children }: Props) {
    // Promises are intentionally not awaited — both fetches start in parallel and are
    // passed down to child components, which resolve them independently.
    // This avoids blocking the layout render until both fetches complete.
    const navPromise = getNav(1)
    const footerModelPromise = getModel(ModelPathEnum.FOOTER_COMPONENT)

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} min-h-screen flex flex-col bg-background font-sans antialiased text-primary`}
            >
                <AuthoringProvider>
                    <Header navPromise={navPromise} />
                    <div className="flex-1 w-full">{children}</div>
                    <Footer footerModelPromise={footerModelPromise} />
                </AuthoringProvider>
            </body>
        </html>
    )
}
