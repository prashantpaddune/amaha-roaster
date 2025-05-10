'use client';

import Filters from './roster-filters';
import { Provider } from '@/components/roster/types';
import RosterListView from "@/components/roster/roster-list-view/roster-list-view";
import RosterCalenderView from "@/components/roster/roster-calender-view";
import useGetProvidersFilters from "@/hooks/use-get-providers-filters";
import { useAppSelector } from "@/store/hooks";

type Props = {
    initialProviders: Provider[];
}

export default function RosterPage({ initialProviders }: Props) {
    const view = useAppSelector((s) => s.view.view);
    const {
        onSearchChange,
        onReset,
        applyFilters,
        filters,
        showResetBtn
    } = useGetProvidersFilters({ initialProviders });

    return (
        <div className="flex flex-col md:flex-row flex-1 overflow-scroll md:overflow-hidden">
            <Filters
                filters={filters}
                applyFilters={applyFilters}
                onSearchChange={onSearchChange}
                onReset={onReset}
                showResetBtn={showResetBtn}
            />
            <main className="flex-1 min-w-0 p-4 md:overflow-y-auto">
                {view === 'list' && <RosterListView/>}
                {view === 'calendar' && <RosterCalenderView/>}
            </main>
        </div>
    );
}
