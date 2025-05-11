import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { COLORS } from '../constants';
import RosterSlot from "@/components/roster/roster-list-view/roster-slot";

describe('RosterSlot', () => {
    it('renders the time text', () => {
        render(<RosterSlot time="08:30" status={Object.keys(COLORS)[0] as any} />);
        expect(screen.getByText('08:30')).toBeInTheDocument();
    });

    const statuses = Object.keys(COLORS) as Array<keyof typeof COLORS>;

    statuses.forEach((status) => {
        it(`applies the correct color class for status ${status}`, () => {
            const time = '09:00';
            render(<RosterSlot time={time} status={status as any} />);
            const slot = screen.getByText(time);
            ['min-w-[4rem]', 'text-center', 'py-1.5', 'rounded-lg', 'font-medium', 'text-xs'].forEach((cls) => {
                expect(slot).toHaveClass(cls);
            });
            expect(slot).toHaveClass(COLORS[status]);
            cleanup();
        });
    });

    it('combines base and color classes in the className attribute', () => {
        const status = statuses[1];
        const time = '10:15';
        render(<RosterSlot time={time} status={status as any} />);
        const slot = screen.getByText(time);
        const expectedClasses = [
            'min-w-[4rem]',
            'text-center',
            'py-1.5',
            'rounded-lg',
            'font-medium',
            'text-xs',
            COLORS[status],
        ].join(' ');
        expect(slot).toHaveAttribute('class', expectedClasses);
    });
});