import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { addDays, format, startOfDay } from 'date-fns';
import { DateSelector } from "@/ui/date-selector";

beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-05-11T12:00:00Z'));
});

describe('DateSelector', () => {
    const today = new Date('2025-05-11T12:00:00Z');
    const todayKey = format(startOfDay(today), 'yyyy-MM-dd');

    const getDayButton = (day: Date) => {
        const label = `${format(day, 'EEE')} ${format(day, 'd')}`;
        return screen.getByRole('button', { name: label });
    };

    it('disables the prev-nav on the first week and enables next-nav', () => {
        const onDateChange = vi.fn();
        render(<DateSelector selectedDate={today} onDateChange={onDateChange} />);

        const [prevNav] = screen.getAllByRole('button');
        const nextNav = screen.getAllByRole('button').at(-1)!;

        expect(prevNav).toBeDisabled();
        expect(nextNav).toBeEnabled();
    });

    it('renders seven day buttons for the current week with correct disabled/selected states', () => {
        const onDateChange = vi.fn();
        render(<DateSelector selectedDate={today} onDateChange={onDateChange} />);

        const weekStart = startOfDay(today);
        for (let i = 0; i < 7; i++) {
            const day = addDays(weekStart, i);
            const btn = getDayButton(day);

            if (i === 0) {
                expect(btn).toBeEnabled();
                expect(btn).toHaveClass('bg-event-green', 'text-white');
            } else {
                expect(btn).toBeEnabled();
                expect(btn).toHaveClass('hover:bg-gray-50');
            }
        }
    });

    it('calls onDateChange when clicking a day button', () => {
        const onDateChange = vi.fn();
        render(<DateSelector selectedDate={today} onDateChange={onDateChange} />);

        const target = addDays(startOfDay(today), 3);
        fireEvent.click(getDayButton(target));
        expect(onDateChange).toHaveBeenCalledWith(target);
    });

    it('calls onDateChange with next-week start when next-nav clicked', () => {
        const onDateChange = vi.fn();
        render(<DateSelector selectedDate={today} onDateChange={onDateChange} />);

        const nextNav = screen.getAllByRole('button').at(-1)!;
        fireEvent.click(nextNav);

        const expectedNext = addDays(startOfDay(today), 7);
        const expectedKey = format(expectedNext, 'yyyy-MM-dd');

        const calledDate: Date = onDateChange.mock.calls[0][0];
        const calledKey = format(startOfDay(calledDate), 'yyyy-MM-dd');

        expect(calledKey).toBe(expectedKey);
    });

    it('enables prev-nav when selectedDate is in the future week and clicking prev-nav goes back', () => {
        const onDateChange = vi.fn();
        const future = addDays(today, 7);
        render(<DateSelector selectedDate={future} onDateChange={onDateChange} />);

        const prevNav = screen.getAllByRole('button')[0];
        expect(prevNav).toBeEnabled();

        fireEvent.click(prevNav);

        const calledDate: Date = onDateChange.mock.calls[0][0];
        const calledKey = format(startOfDay(calledDate), 'yyyy-MM-dd');
        expect(calledKey).toBe(todayKey);
    });
});
