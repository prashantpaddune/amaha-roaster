import { FilterType, Provider } from "@/components/roster/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const getProviders = async (searchParams: FilterType) => {
    const params = new URLSearchParams();

    if (searchParams.service) params.append('service', searchParams.service);
    if (searchParams.type)    params.append('type',    searchParams.type);
    if (searchParams.centre)  params.append('centre',  searchParams.centre);
    if (searchParams.search)  params.append('search',  searchParams.search);

    const res = await fetch(
        `${BASE_URL}/api/providers?${params.toString()}`,
        { cache: 'no-store' }
    );
    return  await res.json() as Provider[];
}