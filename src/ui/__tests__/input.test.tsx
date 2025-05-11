import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from "@/ui/input";

describe('Input', () => {
    it('renders a text input by default with base classes', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Enter text');
        expect(input).toHaveClass(
            'block',
            'w-full',
            'h-11',
            'px-4',
            'bg-white',
            'border',
            'border-davy-grey',
            'rounded-lg',
            'text-davy-grey',
            'placeholder-davy-grey',
            'focus:outline-none',
            'text-sm'
        );
    });

    it('forwards HTML input props (type, value, onChange)', () => {
        const handleChange = vi.fn();
        render(
            <Input
                type="email"
                value="test@example.com"
                onChange={(e) => handleChange(e.currentTarget.value)}
            />
        );
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input).toHaveAttribute('type', 'email');
        expect(input.value).toBe('test@example.com');
        fireEvent.change(input, { target: { value: 'new@example.com' } });
        expect(handleChange).toHaveBeenCalledWith('new@example.com');
    });

    it('applies custom className to both wrapper and input', () => {
        render(<Input className="my-wrapper-class" placeholder="X" />);
        const wrapper = screen.getByPlaceholderText('X').parentElement!;
        const input = screen.getByRole('textbox');
        expect(wrapper).toHaveClass('relative', 'w-full', 'my-wrapper-class');
        expect(input).toHaveClass('my-wrapper-class');
    });

    it('renders an icon when provided and adds left padding', () => {
        render(
            <Input
                icon={<span data-testid="icon">🔍</span>}
                placeholder="Search"
            />
        );
        const iconEl = screen.getByTestId('icon');
        const input = screen.getByRole('textbox');

        expect(iconEl).toBeInTheDocument();
        expect(iconEl.parentElement).toHaveClass(
            'pointer-events-none',
            'absolute',
            'left-3',
            'top-1/2',
            '-translate-y-1/2'
        );

        expect(input).toHaveClass('pl-11');
    });
});
