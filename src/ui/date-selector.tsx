import React, { useCallback, useMemo } from "react";
import { format, addDays, startOfWeek, startOfDay } from "date-fns";
import { cn } from "@/utils/cn";
import { ChevronRightIcon } from "@/icons/chevron-right";
import { ChevronLeftIcon } from "@/icons/chevron-left";

type DateSelectorProps = {
    selectedDate: Date;
    onDateChange: (newDate: Date) => void;
};

export const DateSelector: React.FC<DateSelectorProps> = ({
      selectedDate,
      onDateChange,
}) => {
    const today = useMemo(() => startOfDay(new Date()), []);
    const weekStart = useMemo(
        () => startOfWeek(selectedDate, { weekStartsOn: 0 }),
        [selectedDate]
    );
    const selectedIso = useMemo(
        () => format(selectedDate, "yyyy-MM-dd"),
        [selectedDate]
    );

    const days = useMemo(
        () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
        [weekStart]
    );

    const changeWeek = useCallback(
        (delta: number) => {
            const newStart = addDays(weekStart, delta);
            const newDate = newStart < today ? today : newStart;
            onDateChange(newDate);
        },
        [weekStart, today, onDateChange]
    );

    const canGoPrev = weekStart > today;

    return (
        <div className="flex items-center space-x-4">
            <NavButton
                onClick={() => changeWeek(-7)}
                disabled={!canGoPrev}
                Icon={ChevronLeftIcon}
            />

            {days.map((day) => {
                const iso = format(day, "yyyy-MM-dd");
                const isSelected = iso === selectedIso;
                const isPast = day < today;

                return (
                    <DayButton
                        key={iso}
                        day={day}
                        selected={isSelected}
                        disabled={isPast}
                        onClick={() => onDateChange(day)}
                    />
                );
            })}

            <NavButton
                onClick={() => changeWeek(7)}
                disabled={false}
                Icon={ChevronRightIcon}
            />
        </div>
    );
};

type NavProps = {
    onClick: () => void;
    disabled: boolean;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const NavButton: React.FC<NavProps> = ({ onClick, disabled, Icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "p-1.5 border border-navbar-border rounded-full",
            disabled && "opacity-50 cursor-not-allowed"
        )}
    >
        <Icon className="h-6 w-6 text-gray-600" />
    </button>
);

type DayProps = {
    day: Date;
    selected: boolean;
    disabled: boolean;
    onClick: () => void;
};

const DayButton: React.FC<DayProps> = ({
   day,
   selected,
   disabled,
   onClick,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex-1 py-2 px-4 text-center rounded-lg border",
                selected
                    ? "bg-event-green text-white border-event-green"
                    : "text-gray-700 border-navbar-border hover:bg-gray-50",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className={cn("text-xs", !selected && "text-davy-grey")}>
                {format(day, "EEE")}
            </div>
            <div className="font-semibold">{format(day, "d")}</div>
        </button>
    );
};
