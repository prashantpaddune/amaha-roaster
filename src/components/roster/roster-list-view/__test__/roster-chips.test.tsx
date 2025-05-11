import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RosterChips from '../roster-chips';
import { LEGEND_ITEMS } from '../constants';

describe('RosterChips', () => {
    const testDate = new Date('2025-01-01T00:00:00Z');

    it('renders formatted date in heading', () => {
        render(<RosterChips date={testDate} />);
        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toHaveTextContent('Showing full schedules for Wed, 1 Jan 2025');
    });

    it('renders descriptive paragraph', () => {
        render(<RosterChips date={testDate} />);
        expect(
            screen.getByText('Showing slots in the 8 am to 12 am window.')
        ).toBeInTheDocument();
    });

    it('renders all legend items with correct labels and color classes', () => {
        render(<RosterChips date={testDate} />);
        LEGEND_ITEMS.forEach(({ label, colorClass }) => {
            const labelEl = screen.getByText(label);
            expect(labelEl).toBeInTheDocument();
            const spanEl = labelEl.previousSibling as HTMLElement;
            expect(spanEl).toHaveClass('w-4', 'h-2', 'rounded-full', 'flex-shrink-0', colorClass);
        });
    });
});