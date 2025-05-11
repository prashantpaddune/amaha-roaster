import {NextRequest, NextResponse} from 'next/server'
import { PROVIDERS_DATA } from '@/data/providers'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const provider = PROVIDERS_DATA.find((p) => p.id === Number(id))

    if (!provider) {
        return NextResponse.json({ error: `Provider ${id} not found` }, { status: 404 })
    }

    return NextResponse.json(provider)
}
