import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SERVICE_OPTIONS, TYPE_OPTIONS, CENTER_OPTIONS } from '../constants';
import { setService, setType, setCentre } from '@/store/slices/filter-slice';
import RosterFilters from "@/components/roster/roster-filters";

const dispatchMock = vi.fn();
vi.mock('@/store/hooks', () => ({ useAppDispatch: () => dispatchMock }));

describe('RosterFilters', () => {
    const baseProps = {
        filters: { service: '', type: '', centre: '', search: '' },
        onSearchChange: vi.fn(),
        applyFilters: vi.fn(),
        onReset: vi.fn(),
        showResetBtn: false,
    };

    it('renders three selects with correct options', () => {
        render(<RosterFilters {...baseProps} />);
        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(3);

        SERVICE_OPTIONS.forEach((opt) => {
            expect(screen.getByRole('option', { name: opt.label })).toBeInTheDocument();
        });
    });

    it('dispatches setService, setType, setCentre on select change', () => {
        render(<RosterFilters {...baseProps} />);
        const [serviceSelect, typeSelect, centreSelect] = screen.getAllByRole('combobox');

        fireEvent.change(serviceSelect, { target: { value: SERVICE_OPTIONS[1].value } });
        expect(dispatchMock).toHaveBeenCalledWith(setService(SERVICE_OPTIONS[1].value));

        fireEvent.change(typeSelect, { target: { value: TYPE_OPTIONS[0].value } });
        expect(dispatchMock).toHaveBeenCalledWith(setType(TYPE_OPTIONS[0].value));

        fireEvent.change(centreSelect, { target: { value: CENTER_OPTIONS[2].value } });
        expect(dispatchMock).toHaveBeenCalledWith(setCentre(CENTER_OPTIONS[2].value));
    });

    it('shows reset button when showResetBtn is true and calls onReset', () => {
        render(<RosterFilters {...baseProps} showResetBtn={true} />);
        const resetBtn = screen.getByRole('button', { name: /reset/i });
        expect(resetBtn).toBeInTheDocument();
        fireEvent.click(resetBtn);
        expect(baseProps.onReset).toHaveBeenCalled();
    });


    it('renders search input with icon and calls onSearchChange on input', () => {
        render(<RosterFilters {...baseProps} />);
        const input = screen.getByPlaceholderText(/search provider/i);
        expect(input).toBeInTheDocument();

        const wrapper = input.parentElement as HTMLElement;
        const searchIcon = wrapper.querySelector('svg.h-6.w-6');
        expect(searchIcon).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'test' } });
        expect(baseProps.onSearchChange).toHaveBeenCalledWith('test');
    });

    it('renders instructional text about search', () => {
        render(<RosterFilters {...baseProps} />);
        expect(
            screen.getByText(/you can search up to 5 providers to view their availability specifically\./i)
        ).toBeInTheDocument();
    });
});