'use client';

import React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@/utils/cn';

const buttonVariants = tv({
    base: 'inline-flex items-center justify-center font-medium cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-davy-grey disabled:cursor-not-allowed',
    variants: {
        variant: {
            primary: 'bg-button-primary text-white',
            secondary: 'bg-button-secondary text-button-primary',
        },
        size: {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-6.5 py-2 text-sm',
            lg: 'px-5 py-3 text-lg',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant, size, className, children, disabled, ...props }) => (
    <button
        disabled={disabled}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
    >
        {children}
    </button>
);
