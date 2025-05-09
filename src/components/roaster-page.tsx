'use client';

import Filters from './roaster-filters';
import { Provider } from '@/components/types';
import RoasterListView from "@/components/roaster-list-view";
import RoasterCalenderView from "@/components/roaster-calender-view";
import useGetProvidersFilters from "@/hooks/use-get-providers-filters";
import { useAppSelector } from "@/store/hooks";

type Props = {
    initialProviders: Provider[];
}

export default function RoasterPage({ initialProviders }: Props) {
    const view = useAppSelector((s) => s.view.view);
    const {
        onSearchChange,
        onReset,
        applyFilters,
        filters,
        showResetBtn
    } = useGetProvidersFilters({ initialProviders });

    return (
        <div className="flex flex-col md:flex-row h-full">
            <Filters
                filters={filters}
                applyFilters={applyFilters}
                onSearchChange={onSearchChange}
                onReset={onReset}
                showResetBtn={showResetBtn}
            />
            <main className="flex-1 p-4">
                {view === 'list' && <RoasterListView/>}
                {view === 'calendar' && <RoasterCalenderView/>}
            </main>
        </div>
    );
}
