import RosterPage from '@/components/roster/roster-page';
import { getProviders } from '@/utils/providers';
import type { FilterType, Provider } from '@/components/roster/types';

const Page = async ({ searchParams }: { searchParams: FilterType}) => {
    const initialProviders: Provider[] = await getProviders(searchParams);
    return <RosterPage initialProviders={initialProviders} />;
};

export default Page;
