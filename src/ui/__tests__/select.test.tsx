import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from "@/ui/select";

describe('Select', () => {
    const defaultOptions = [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
    ];

    it('renders a select with base classes', () => {
        render(<Select options={defaultOptions} />);
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(select).toHaveClass(
            'block',
            'w-full',
            'h-10',
            'pl-4',
            'pr-10',
            'bg-white',
            'border',
            'border-davy-grey',
            'rounded-md',
            'text-grey',
            'placeholder-grey',
            'focus:outline-none',
            'appearance-none'
        );
    });

    it('renders passed options', () => {
        render(<Select options={defaultOptions} />);
        defaultOptions.forEach((opt) => {
            expect(screen.getByRole('option', { name: opt.label })).toHaveValue(opt.value);
        });
    });

    it('renders children when no options prop is provided', () => {
        render(
            <Select>
                <option value="x">X</option>
                <option value="y">Y</option>
            </Select>
        );
        expect(screen.getByRole('option', { name: 'X' })).toHaveValue('x');
        expect(screen.getByRole('option', { name: 'Y' })).toHaveValue('y');
    });

    it('forwards HTML select props (value, onChange)', () => {
        const handleChange = vi.fn();
        render(
            <Select
                options={defaultOptions}
                value="b"
                onChange={(e) => handleChange(e.currentTarget.value)}
            />
        );
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe('b');
        fireEvent.change(select, { target: { value: 'a' } });
        expect(handleChange).toHaveBeenCalledWith('a');
    });

    it('applies custom className to wrapper', () => {
        render(<Select options={defaultOptions} className="my-wrapper" />);
        const wrapper = screen.getByRole('combobox').parentElement!;
        expect(wrapper).toHaveClass('relative', 'w-full', 'my-wrapper');
    });

    it('renders the dropdown icon inside the wrapper', () => {
        render(<Select options={defaultOptions} />);
        const wrapper = screen.getByRole('combobox').parentElement!;
        const svg = wrapper.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass(
            'pointer-events-none',
            'absolute',
            'right-3',
            'top-1/2',
            '-translate-y-1/2',
            'h-6',
            'w-6',
            'text-gray-500'
        );
    });
});
