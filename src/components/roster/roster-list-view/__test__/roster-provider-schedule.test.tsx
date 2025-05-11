import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {ProviderState} from "@/store/slices/provider-slice";
import RosterProviderSchedule from "@/components/roster/roster-list-view/roster-provider-schedule";

vi.mock('@/utils/schedule', () => ({
    getHomeScheduleCount: (provider: any) => 5,
    getVideoScheduleCount: (provider: any) => 2,
}));

vi.mock('@/components/roster/roster-list-view/roster-provider-card', () => ({
    __esModule: true,
    default: (props: any) => (
        <div data-testid="provider-card">
            {props.name} | home:{props.homeCount} | video:{props.videoCount}
        </div>
    ),
}));

vi.mock('./roster-schedule-row', () => ({
    __esModule: true,
    RosterScheduleRow: (props: any) => (
        <div data-testid="schedule-row">{props.availability.online_slots.join(',')}</div>
    ),
}));

describe('RosterProviderSchedule', () => {
    const baseState: ProviderState = {
        list: [],
        loading: false,
        error: null,
    };

    it('renders loading state', () => {
        render(<RosterProviderSchedule {...baseState} loading={true} />);
        expect(screen.getByText('Loading…')).toBeInTheDocument();
    });

    it('renders error message', () => {
        render(
            <RosterProviderSchedule {...baseState} loading={false} error="Oops!" />
        );
        expect(screen.getByText('Error: Oops!')).toHaveClass('text-red-600');
    });

    it('renders no providers message when list is empty', () => {
        render(<RosterProviderSchedule {...baseState} />);
        expect(screen.getByText('No providers found.')).toBeInTheDocument();
    });
});
