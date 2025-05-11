import RosterPage from '@/components/roster/roster-page';
import { getProviders } from '@/utils/providers';
import type { FilterType, Provider } from '@/components/roster/types';

type Props = {
    readonly searchParams: Promise<FilterType>
}

const Page = async ({ searchParams }: Props) => {
    const initialProviders: Provider[] = await getProviders(await searchParams);
    return <RosterPage initialProviders={initialProviders} />;
};

export default Page;
