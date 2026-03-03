import Image from 'next/image'

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-full py-20 px-5 text-center gap-10">
            <div className="flex flex-col gap-3">
                <span className="text-8xl font-bold text-blue-600 leading-none tracking-tight">
                    404
                </span>
                <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
                <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                    This page does not exist or the connection to CrafterCMS may be failing.
                </p>
            </div>

            <div className="h-px w-32 bg-blue-600" />

            <div className="flex items-center gap-8 flex-wrap justify-center">
                <Image
                    src="/next.svg"
                    alt="Next.js"
                    width={394}
                    height={80}
                    style={{ height: '36px', width: 'auto' }}
                />
                <span className="text-blue-600 text-xl select-none">&times;</span>
                <Image
                    src="/Craftercms-logo.svg"
                    alt="CrafterCMS"
                    width={850}
                    height={207}
                    style={{ height: '36px', width: 'auto' }}
                />
            </div>
        </main>
    )
}
