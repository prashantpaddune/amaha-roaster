import type { Provider } from '@/components/roster/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export async function getRosterDetails(id: string): Promise<Provider> {
    const res = await fetch(`${BASE_URL}/api/providers/${id}`)
    if (!res.ok) {
        throw new Error(`Failed to load provider ${id}: ${res.statusText}`)
    }
    return res.json()
}
