import React from "react";
import { ChevronLeftIcon } from "@/icons/chevron-left";
import { ChevronRightIcon } from "@/icons/chevron-right";
import DayView from "./daily";
import WeeklyView from "./weekly";
import MonthlyView from "./monthly";
import { CalEvent, ViewType } from "@/ui/calender/types";
import { Select } from "@/ui/select";
import { CALENDER_VIEW_OPTIONS } from "@/ui/calender/constants";

export type CalendarProps = {
    view: ViewType;
    title: string;
    events: CalEvent[];
    onPrev: () => void;
    onNext: () => void;
    onViewChange: (v: ViewType) => void;
    activeDate: Date;
    onDateSelect: (d: Date) => void;
    slotHeight?: number;
};

export const Calender = ({
    view,
    title,
    events,
    onPrev,
    onNext,
    onViewChange,
    activeDate,
    slotHeight = 100,
}: CalendarProps) => (
    <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <button onClick={onPrev} className="flex-shrink-0 p-1 md:p-1.5 border rounded-full border-navbar-border">
                    <ChevronLeftIcon  className="h-5 w-5 md:h-6 md:w-6 text-davy-green" />
                </button>
                <button onClick={onNext} className="flex-shrink-0 p-1 md:p-1.5 border rounded-full border-navbar-border">
                    <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 text-davy-green" />
                </button>
                <span className="text-grey font-semibold text-base">{title}</span>
            </div>
            <Select
                value={view}
                onChange={(e) => onViewChange(e.target.value as ViewType)}
                options={CALENDER_VIEW_OPTIONS}
                className="w-32"
            />
        </div>

        {view === "daily" ? (
            <DayView date={activeDate} events={events} slotHeight={slotHeight} />
        ) : view === "weekly" ? (
            <WeeklyView date={activeDate} events={events} slotHeight={slotHeight} />
        ) : (
            <MonthlyView date={activeDate} events={events} />
        )}
    </div>
);
