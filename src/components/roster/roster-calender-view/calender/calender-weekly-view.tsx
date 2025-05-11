import React from "react";
import { format, startOfWeek } from "date-fns";
import CalenderTimeGrid from "@/components/roster/roster-calender-view/calender/calender-time-grid";
import CalenderEventsOverlay from "@/components/roster/roster-calender-view/calender/calender-events-overlay";

import { CalEvent, RawType } from "./types";
import {
    CALENDER_START_HOUR,
    CALENDER_END_HOUR,
} from "./constants";
import { isPresentDay } from "@/utils/time-slot";

type WeeklyViewProps = {
    date: Date;
    events: CalEvent[];
    slotHeight: number;
};

const CalenderWeeklyView = ({
   date,
   events,
   slotHeight,
}: WeeklyViewProps) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 });
    const weekdays = Array.from({ length: 7 }).map((_, i) =>
        new Date(
            weekStart.getFullYear(),
            weekStart.getMonth(),
            weekStart.getDate() + i
        )
    );

    const raw: (RawType & { dayIndex: number })[] = events
        .map((ev) => {
            const s = new Date(ev.start),
                e = new Date(ev.end);
            const dayIndex = (s.getDay() - weekStart.getDay() + 7) % 7;
            if (dayIndex < 0 || dayIndex > 6) return null;
            const startMin = s.getHours() * 60 + s.getMinutes();
            const endMin = e.getHours() * 60 + e.getMinutes();
            if (
                endMin <= CALENDER_START_HOUR * 60 ||
                startMin >= CALENDER_END_HOUR * 60
            )
                return null;
            return {
                ev,
                dayIndex,
                startMin: Math.max(startMin, CALENDER_START_HOUR * 60),
                endMin: Math.min(endMin, CALENDER_END_HOUR * 60),
            };
        })
        .filter((x): x is RawType & { dayIndex: number } => !!x);

    const buckets: Record<
        number,
        (RawType & { dayIndex: number })[]
    >[] = weekdays.map(() => ({}));
    raw.forEach((r) => {
        (buckets[r.dayIndex][r.startMin] ||= []).push(r);
    });

    const isToday = isPresentDay(date);

    return (
        <CalenderTimeGrid
            dates={weekdays}
            slotHeight={slotHeight}
            renderHeaderCell={(d) => (
                <>
                    <div className="uppercase text-xs text-gray-500">
                        {format(d, "EEE")}
                    </div>
                    <div className="font-medium">{format(d, "d")}</div>
                </>
            )}
        >
            <CalenderEventsOverlay
                buckets={buckets}
                slotHeight={slotHeight}
                isTodayView={isToday}
            />
        </CalenderTimeGrid>
    );
};

export default CalenderWeeklyView;
