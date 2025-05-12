'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
    setService,
    setType,
    setCentre,
} from '@/store/slices/filter-slice';
import { CENTER_OPTIONS, SERVICE_OPTIONS, TYPE_OPTIONS } from '@/components/roster/constants';
import { Select } from "@/ui/select";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { SearchIcon } from "@/icons/search";
import { FilterType } from "@/components/roster/types";

type Props = {
    onSearchChange: (value: string) => void;
    onReset: () => void;
    applyFilters: () => void;
    filters: FilterType;
    showResetBtn: boolean;
}

const RosterFilters = ({ filters, onSearchChange, applyFilters, onReset, showResetBtn }: Props) => {
    const dispatch = useAppDispatch();
    const { service, type, centre, search } = filters;
    const isApplyBtnDisabled = Boolean(service || type || centre);

    return (
        <aside className="flex-shrink-0 md:w-[22.5rem] w-full pt-6 px-6 space-y-4 border-r border-gray-200 md:min-h-screen">
            <Select
                name="service"
                value={service}
                onChange={(e) => dispatch(setService(e.target.value))}
                options={SERVICE_OPTIONS}
            />

            <Select
                name="type"
                value={type}
                onChange={(e) => dispatch(setType(e.target.value))}
                options={TYPE_OPTIONS}
            />

            <Select
                name="centre"
                value={centre}
                onChange={(e) => dispatch(setCentre(e.target.value))}
                options={CENTER_OPTIONS}
            />

            <div className="flex items-center space-x-4">
                {showResetBtn && (
                    <Button onClick={onReset} variant="secondary" size="md">
                        Reset
                    </Button>
                )}
                <Button disabled={!isApplyBtnDisabled} onClick={applyFilters} variant="primary" size="md">
                    Apply
                </Button>
            </div>

            <hr className="border-t border-gray-200 my-4" />

            <Input
                name="search"
                icon={<SearchIcon className="h-6 w-6" />}
                type="text"
                value={search}
                placeholder="Search provider"
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <p className="text-sm">
                You can search up to 5 providers to view their availability specifically.
            </p>
        </aside>
    );
};

export default RosterFilters;
