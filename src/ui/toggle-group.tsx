import React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/utils/cn";

export interface ToggleOption<T> {
    key: string;
    value: T;
    content: React.ReactNode;
    ariaLabel?: string;
}

export interface ToggleButtonGroupProps<T> {
    options: ToggleOption<T>[];
    selectedValue: T;
    onChange: (value: T) => void;
    variant?: "default" | "primary";
    size?: "sm" | "md" | "lg";
    className?: string;
}

const toggleGroup = tv({
    base: "flex items-center rounded-lg divide-x overflow-hidden",
    variants: {
        variant: {
            default: "bg-gray-50 divide-gray-200",
            primary: "border border-navbar-border divide-event-moss-green",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const toggleItem = tv({
    base: "flex items-center justify-center transition cursor-pointer",
    variants: {
        active: {
            true: "bg-event-moss-green",
            false: "hover:bg-gray-100",
        },
        size: {
            sm: "w-5 h-5",
            md: "w-10 h-10",
            lg: "w-[60px] h-[60px]",
        },
    },
    defaultVariants: {
        active: false,
        size: "md",
    },
});

export function ToggleButtonGroup<T>({
     options,
     selectedValue,
     onChange,
     variant = "default",
     size = "md",
     className = "",
}: ToggleButtonGroupProps<T>) {
    return (
        <div className={cn(toggleGroup({ variant }), className)}>
            {options.map(({ key, value, content, ariaLabel }) => {
                const isActive = value === selectedValue;
                return (
                    <button
                        key={key}
                        onClick={() => onChange(value)}
                        aria-label={ariaLabel}
                        className={cn(toggleItem({ active: isActive, size }))}
                    >
                        {content}
                    </button>
                );
            })}
        </div>
    );
}
