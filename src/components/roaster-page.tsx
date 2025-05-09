'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProviders } from '@/store/slices/provider-slice';
import Filters from './roaster-filters';
import { Provider } from '@/components/types';
import { applyUrlFilters } from "@/utils/filters";
import RoasterListView from "@/components/roaster-list-view";
import RoasterCalenderView from "@/components/roaster-calender-view";

type Props = {
    initialProviders: Provider[];
}

export default function RoasterPage({ initialProviders }: Props) {
    const dispatch = useAppDispatch();
    const view = useAppSelector((s) => s.view.view);
    const searchParams = useSearchParams();

    useEffect(() => {
        dispatch(setProviders(initialProviders));
        applyUrlFilters(searchParams, dispatch);
    }, [dispatch, initialProviders, searchParams]);

    return (
        <div className="flex h-max">
            <div className="w-full">
                <Filters />
            </div>
            <div className="p-4">
                {view === 'list' && <RoasterListView />}
                {view === 'calendar' && <RoasterCalenderView />}
            </div>
        </div>
    );
}
