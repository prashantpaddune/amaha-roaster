import React from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameMonth,
} from "date-fns";

import { isPresentDay } from "@/utils/time-slot";
import { CalEvent } from "./types";

type MonthlyViewProps = {
    date: Date;
    events: CalEvent[];
};

const CalenderMonthlyView = ({ date, events }: MonthlyViewProps) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
    const days: Date[] = [];
    for (let d = start; d <= end; d = addDays(d, 1)) days.push(d);

    const eventsByDate: Record<string, CalEvent[]> = {};
    events.forEach((ev) => {
        const key = format(new Date(ev.start), "yyyy-MM-dd");
        (eventsByDate[key] ||= []).push(ev);
    });

    return (
        <div className="grid grid-cols-7 border-t border-l border-gray-200">
            {days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const evs = eventsByDate[key] || [];
                return (
                    <div
                        key={key}
                        className={`h-32 border-b border-r p-1 text-xs ${
                            isSameMonth(day, date)
                                ? "bg-white border-gray-200"
                                : "bg-gray-50 text-gray-400 border-gray-200"
                        }`}
                    >
                        <div className="text-sm font-medium mb-1">
                            {format(day, "d")}
                        </div>
                        {isPresentDay(date) && (
                            <>
                                {evs.slice(0, 3).map((ev) => (
                                    <div
                                        key={ev.id}
                                        className={`truncate rounded px-1 mb-0.5 ${ev.colorClass} text-white`}
                                    >
                                        {ev.title}
                                    </div>
                                ))}
                                {evs.length > 3 && (
                                    <div className="text-xs text-gray-500">
                                        +{evs.length - 3} more
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CalenderMonthlyView;
