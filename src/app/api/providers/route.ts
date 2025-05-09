import { NextRequest, NextResponse } from 'next/server';
import { PROVIDERS_DATA } from "@/data/providers";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const service = searchParams.get('service') || '';
    const type = searchParams.get('type') || '';
    const centre = searchParams.get('centre') || '';
    const search = searchParams.get('search')?.toLowerCase() || '';

    let filtered = PROVIDERS_DATA.slice();

    if (service) {
        filtered = filtered.filter((p) => p.provider_usertype === service);
    }
    if (type) {
        if (type === 'inhouse') filtered = filtered.filter((p) => p.is_inhouse);
        else if (type === 'external') filtered = filtered.filter((p) => !p.is_inhouse);
    }
    if (centre) {
        filtered = filtered.filter((p) => p.clinic_details.name === centre);
    }
    if (search) {
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));
    }

    return NextResponse.json(filtered);
}
