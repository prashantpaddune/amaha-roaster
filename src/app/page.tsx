import RoasterPage from '@/components/roaster-page';
import { getProviders } from '@/utils/providers';
import type { FilterType, Provider } from '@/components/types';

const Page = async ({ searchParams }: { searchParams: FilterType}) => {
    const initialProviders: Provider[] = await getProviders(searchParams);
    return <RoasterPage initialProviders={initialProviders} />;
};

export default Page;
