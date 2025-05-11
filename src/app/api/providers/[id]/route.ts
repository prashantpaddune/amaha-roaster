import { NextResponse } from 'next/server'
import { PROVIDERS_DATA } from '@/data/providers'

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id)
    const provider = PROVIDERS_DATA.find((p) => p.id === id)

    if (!provider) {
        return NextResponse.json(
            { error: `No provider found with id ${id}` },
            { status: 404 }
        )
    }

    return NextResponse.json(provider)
}
