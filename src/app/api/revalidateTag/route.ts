import { Logger } from '@/lib/logger'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const tag = searchParams.get('tag')

        if (!tag) {
            return NextResponse.json({ error: 'Missing "tag" query parameter' }, { status: 400 })
        }

        revalidateTag(tag, 'max')
        return NextResponse.json({ revalidated: true, tag })
    } catch (error) {
        Logger.error('tryCatch Error in revalidateTag API', error)
        return NextResponse.json({ error: 'Failed to revalidate tag' }, { status: 500 })
    }
}
