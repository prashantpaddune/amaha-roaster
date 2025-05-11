import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from "@/ui/button";

describe('Button', () => {
    it('renders its children', () => {
        render(<Button>Submit</Button>);
        expect(screen.getByRole('button')).toHaveTextContent('Submit');
    });

    it('applies the primary variant by default', () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('bg-button-primary', 'text-white');
    });

    it('applies the secondary variant when specified', () => {
        render(<Button variant="secondary">Click me</Button>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('bg-button-secondary', 'text-button-primary');
    });

    it('applies the appropriate size classes', () => {
        const { rerender } = render(<Button size="sm">Click me</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');

        rerender(<Button size="md">Click me</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-6.5', 'py-2', 'text-sm');

        rerender(<Button size="lg">Click me</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-5', 'py-3', 'text-lg');
    });

    it('forwards custom className', () => {
        render(<Button className="custom-class">Click me</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('handles the disabled state styles and attribute', () => {
        render(<Button disabled>Click me</Button>);
        const btn = screen.getByRole('button');
        expect(btn).toBeDisabled();
        expect(btn).toHaveClass('disabled:bg-davy-grey', 'disabled:cursor-not-allowed');
    });

    it('calls onClick when clicked', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('does not call onClick when disabled', () => {
        const onClick = vi.fn();
        render(
            <Button onClick={onClick} disabled>
                Click me
            </Button>
        );
        fireEvent.click(screen.getByRole('button'));
        expect(onClick).not.toHaveBeenCalled();
    });

    it('includes focus ring classes when focused', () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole('button');
        fireEvent.focus(btn);
        expect(btn).toHaveClass('focus:ring-2', 'focus:ring-offset-1');
    });
});
