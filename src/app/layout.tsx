import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import '@/styles/globals.css'
import { AuthoringProvider } from '@/providers/authoring-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'

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
    return (
        <html lang="en">
            <body className={`${geistSans.variable} min-h-screen`}>
                <AuthoringProvider>
                    <Header />
                    <div className="min-h-[calc(100vh-104px)] w-full h-full">{children}</div>
                    <Footer />
                </AuthoringProvider>
            </body>
        </html>
    )
}
