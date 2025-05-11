import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Availability } from '@/components/roster/types';
import {RosterScheduleRow} from "@/components/roster/roster-list-view/roster-schedule-row";

vi.mock('@/utils/schedule', () => {
    const mockCols = [['08:00', '09:00'], ['10:00']];
    return {
        chunkIntoColumns: () => mockCols,
        getStatusForSlot: (_availability: any, time: string) =>
            time === '08:00' ? 'online' : 'offline',
    };
});

const availability: Availability = {
    online_slots: ['08:00'],
    offline_slots: ['09:00'],
    both_slots: [],
    online_booked_slots: [],
    offline_booked_slots: [],
    blocked_slots: [],
};

describe('RosterScheduleRow', () => {
    let scrollableDiv!: HTMLElement;

    beforeEach(() => {
        const { container } = render(
            <RosterScheduleRow availability={availability} />
        );
        scrollableDiv = container.querySelector(
            '.relative.overflow-hidden')! as HTMLElement;
        scrollableDiv.scrollBy = vi.fn();
    });

    it('renders navigation buttons with chevron icons', () => {
        const buttons = screen.getAllByRole('button');
        expect(buttons[0].querySelector('svg')).toBeInTheDocument();
        expect(buttons[buttons.length - 1].querySelector('svg')).toBeInTheDocument();
    });

    it('renders slots for each time in mockCols', () => {
        const times = ['08:00', '09:00', '10:00'];
        times.forEach((time) => {
            expect(screen.getByText(time)).toBeInTheDocument();
        });
    });
});
