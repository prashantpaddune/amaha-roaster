import React from "react";
import {
    startOfWeek,
    format,
    differenceInMinutes,
} from "date-fns";
import { CalEvent } from "@/ui/calender/types";
import { getWeekDays } from "@/ui/calender/utils";
import { isPresentDay } from "@/utils/time-slot";

type WeeklyViewProps = {
    date: Date;
    events: CalEvent[];
    slotHeight: number;
};

type Raw = CalEvent & {
    startDate: Date;
    endDate: Date;
    top: number;
    height: number;
};

type Positioned = Raw & { left: string; width: string };

const WeeklyView = ({
   date,
   events,
   slotHeight,
}: WeeklyViewProps)=> {
    const HEADER_HEIGHT = 32;
    const WEEK_START = startOfWeek(date, { weekStartsOn: 0 });
    const weekdays = getWeekDays(WEEK_START);

    const dayBuckets: Raw[][] = weekdays.map((d) =>
        events
            .filter(ev => new Date(ev.start).getDay() === d.getDay())
            .map(ev => {
                const startDate = new Date(ev.start);
                const endDate = new Date(ev.end);
                const mins = startDate.getHours() * 60 + startDate.getMinutes();
                const top = (mins / 60) * slotHeight + HEADER_HEIGHT;
                const height = (differenceInMinutes(endDate, startDate) / 60) * slotHeight;
                return { ...ev, startDate, endDate, top, height };
            })
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    );

    const positioned: Positioned[] = [];
    dayBuckets.forEach((bucket, dayIndex) => {
        const columns: Raw[][] = [];
        bucket.forEach(ev => {
            let placed = false;
            for (const col of columns) {
                if (ev.startDate >= col[col.length - 1].endDate) {
                    col.push(ev);
                    placed = true;
                    break;
                }
            }
            if (!placed) columns.push([ev]);
        });
        const colCount = columns.length;
        const dayPct = 100 / 7;

        bucket.forEach(ev => {
            const colIndex = columns.findIndex(col => col.includes(ev));
            const width = `${dayPct / colCount}%`;
            const left = `calc(60px + ${dayIndex * dayPct}% + ${colIndex * (dayPct / colCount)}%)`;
            positioned.push({ ...ev, left, width });
        });
    });

    return (
        <div className="relative overflow-x-auto">
            <div className="grid grid-cols-[60px_repeat(7,1fr)]">
                <div style={{ height: HEADER_HEIGHT }} />
                {weekdays.map(d => (
                    <div
                        key={d.toString()}
                        className="h-8 text-center text-sm"
                    >
                        <div className="uppercase text-xs text-gray-500">
                            {format(d, "EEE")}
                        </div>
                        <div className="font-medium">{format(d, "d")}</div>
                    </div>
                ))}

                {Array.from({ length: 24 }, (_, hour) => hour).map(hour => (
                    <React.Fragment key={hour}>
                        <div
                            style={{ height: slotHeight }}
                            className="border-t border-gray-200 text-xs text-gray-400 flex items-start pt-1 px-1"
                        >
                            {format(new Date().setHours(hour, 0, 0, 0), "ha")}
                        </div>
                        {weekdays.map(d => (
                            <div
                                key={d.toString() + hour}
                                style={{ height: slotHeight }}
                                className="border-t border-l border-gray-200 relative"
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {isPresentDay(date) && (
                <div className="absolute inset-0 pointer-events-none">
                    {positioned.map(ev => (
                        <div
                            key={ev.id}
                            className={`absolute rounded-md text-xs p-1 truncate ${ev.colorClass}`}
                            style={{
                                top: ev.top,
                                height: ev.height,
                                left: ev.left,
                                width: ev.width,
                            }}
                        >
                            {ev.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeeklyView;