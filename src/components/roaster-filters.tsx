// components/roaster/RoasterFilters.tsx

'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import {
    setService,
    setType,
    setCentre,
    setSearch, resetFilters,
} from '@/store/slices/filter-slice';
import { fetchProviders } from '@/store/slices/provider-slice';
import { FILTER_OPTIONS } from '@/components/constants';
import { serializeFilters } from '@/utils/filters';
import {Select} from "@/ui/select";
import {Button} from "@/ui/button";
import {Input} from "@/ui/input";
import {SearchIcon} from "@/icons/search";

const RoasterFilters = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((s) => s.filters);
    const router = useRouter();
    const { service, type, centre, search } = filters;

    const applyFilters = () => {
        const newFilters = serializeFilters(filters);
        router.replace(newFilters ? `?${newFilters}` : window.location.pathname);
        dispatch(fetchProviders(filters));
    };

    return (
        <aside className="w-[22.5rem] pt-6 px-6 space-y-4 border-r border-gray-200">
            <Select
                value={service}
                onChange={(e) => dispatch(setService(e.target.value))}
                options={[
                    { label: 'All services', value: '' },
                    ...FILTER_OPTIONS.services.map((s) => ({ label: s, value: s })),
                ]}
            />

            <Select
                value={type}
                onChange={(e) => dispatch(setType(e.target.value))}
                options={[
                    { label: 'All types', value: '' },
                    ...FILTER_OPTIONS.types.map((t) => ({
                        label: t === 'inhouse' ? 'In-house' : 'External',
                        value: t,
                    })),
                ]}
            />

            <Select
                value={centre}
                onChange={(e) => dispatch(setCentre(e.target.value))}
                options={[
                    { label: 'All centres', value: '' },
                    ...FILTER_OPTIONS.centres.map((c) => ({ label: c, value: c })),
                ]}
            />

            <div className="flex items-center space-x-4">
                <Button onClick={() => resetFilters()} variant="secondary" size="md">
                    Reset
                </Button>
                <Button onClick={applyFilters} variant="primary" size="md">
                    Apply
                </Button>
            </div>

            <hr className="border-t border-gray-200 my-4" />

            <Input
                icon={<SearchIcon className="h-6 w-6" />}
                type="text"
                value={search}
                placeholder="Search provider"
                onChange={(e) => {
                    dispatch(setSearch(e.target.value))
                    dispatch(fetchProviders(filters));
                }}
            />


            <p className="text-sm text-grey">
                You can search up to 5 providers to view their availability specifically.
            </p>
        </aside>
    );
};

export default RoasterFilters;
