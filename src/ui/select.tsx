'use client';

import React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from "@/utils/cn";
import { ChevronsDownIcon } from "@/icons/chevrons-down";

const selectVariants = tv({
    base: 'block w-full h-10 pl-4 pr-10 bg-white border border-davy-grey rounded-md text-grey placeholder-grey focus:outline-none appearance-none',
});

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ options, children, className, ...props }) => (
    <div className={cn('relative w-full', className)}>
        <select className={cn(selectVariants())} {...props}>
            {options
                ? options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))
                : children}
        </select>
        <ChevronsDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500" />
    </div>
);