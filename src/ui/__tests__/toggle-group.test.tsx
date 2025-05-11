import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToggleButtonGroup, ToggleOption } from "@/ui/toggle-group";

describe('ToggleButtonGroup', () => {
    const options: ToggleOption<string>[] = [
        { key: 'opt1', value: 'one', content: 'One', ariaLabel: 'Option One' },
        { key: 'opt2', value: 'two', content: 'Two', ariaLabel: 'Option Two' },
    ];

    it('renders a button for each option', () => {
        render(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={() => {}}
            />
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(options.length);
        expect(screen.getByText('One')).toBeInTheDocument();
        expect(screen.getByText('Two')).toBeInTheDocument();
    });

    it('applies default variant and base classes', () => {
        render(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={() => {}}
            />
        );
        const container = screen.getByText('One').parentElement!;
        expect(container).toHaveClass('flex', 'items-center', 'rounded-lg', 'divide-x', 'overflow-hidden');
        expect(container).toHaveClass('bg-gray-50', 'divide-gray-200');
    });

    it('applies primary variant when specified', () => {
        render(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={() => {}}
                variant="primary"
            />
        );
        const container = screen.getByText('One').parentElement!;
        expect(container).toHaveClass('border', 'border-navbar-border', 'divide-event-moss-green');
    });

    it('applies size variants to items', () => {
        const { rerender } = render(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={() => {}}
                size="sm"
            />
        );
        const [btn1, btn2] = screen.getAllByRole('button');
        expect(btn1).toHaveClass('w-5', 'h-5');
        expect(btn2).toHaveClass('w-5', 'h-5');

        rerender(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={() => {}}
                size="lg"
            />
        );
        const [btn1lg, btn2lg] = screen.getAllByRole('button');
        expect(btn1lg).toHaveClass('w-[60px]', 'h-[60px]');
        expect(btn2lg).toHaveClass('w-[60px]', 'h-[60px]');
    });

    it('marks the selected option as active', () => {
        render(
            <ToggleButtonGroup
                options={options}
                selectedValue="two"
                onChange={() => {}}
            />
        );
        const btnOne = screen.getByLabelText('Option One');
        const btnTwo = screen.getByLabelText('Option Two');

        // Option Two should have active class, Option One hover class
        expect(btnTwo).toHaveClass('bg-event-moss-green');
        expect(btnOne).toHaveClass('hover:bg-gray-100');
    });

    it('calls onChange with correct value when an option is clicked', () => {
        const onChange = vi.fn();
        render(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={onChange}
            />
        );
        const btnTwo = screen.getByLabelText('Option Two');
        fireEvent.click(btnTwo);
        expect(onChange).toHaveBeenCalledWith('two');
    });

    it('forwards additional className to container', () => {
        render(
            <ToggleButtonGroup
                options={options}
                selectedValue="one"
                onChange={() => {}}
                className="custom-container"
            />
        );
        const container = screen.getByText('One').parentElement!;
        expect(container).toHaveClass('custom-container');
    });
});
