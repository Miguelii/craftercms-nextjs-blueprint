export default function NotFound() {
    return (
        <main className="flex flex-col gap-6 container mx-auto items-center justify-center w-full px-5 sm:px-0 mt-10 h-full text-center">
            <span className="text-6xl font-bold text-blue-600">404</span>
            <h1 className="text-2xl font-bold">Page not found</h1>
            <p className="text-gray-500 max-w-xl">
                This page does not exist or the connection to CrafterCMS may be failing.
            </p>
        </main>
    )
}
