import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { setView } from '@/store/slices/view-slice';
import RosterNavbar from "@/components/roster-navbar";
import { VIEW_OPTIONS } from "@/components/roster/constants";

const dispatchMock = vi.fn();

vi.mock('@/store/hooks', () => ({
    useAppSelector: (fn: (arg0: { view: { view: string; }; }) => never) => fn({ view: { view: 'weekly' } }),
    useAppDispatch: () => dispatchMock,
}));

describe('RosterNavbar', () => {
    it('renders header with icon and title', () => {
        render(<RosterNavbar />);
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        expect(header.querySelector('svg')).toBeInTheDocument();
        expect(screen.getByText('Provider Calendar')).toBeInTheDocument();
    });

    it('renders toggle options from VIEW_OPTIONS', () => {
        render(<RosterNavbar />);
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(VIEW_OPTIONS.length);

        VIEW_OPTIONS.forEach((opt) => {
            expect(screen.getByLabelText(opt.ariaLabel!)).toBeInTheDocument();
        });
    });

    it('dispatches setView when a toggle is clicked', () => {
        render(<RosterNavbar />);
        const second = VIEW_OPTIONS[1];
        const btn = screen.getByLabelText(second.ariaLabel!);
        fireEvent.click(btn);
        expect(dispatchMock).toHaveBeenCalledWith(setView(second.value));
    });

    it('applies primary variant class on ToggleButtonGroup container', () => {
        render(<RosterNavbar />);
        const container = screen.getByLabelText(VIEW_OPTIONS[0].ariaLabel!).parentElement!;
        expect(container).toHaveClass('border', 'divide-event-moss-green');
    });
});