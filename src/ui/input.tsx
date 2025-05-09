'use client';

import React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from "@/utils/cn";

const inputVariants = tv({
    base: 'block w-full h-11 px-4 bg-white border border-davy-grey rounded-lg text-davy-grey placeholder-davy-grey focus:outline-none text-sm',
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, className, ...props }) => (
    <div className={cn('relative w-full', className)}>
        {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                {icon}
            </div>
        )}
        <input
            className={cn(inputVariants(), icon ? 'pl-11' : '', className)}
            {...props}
        />
    </div>
);