import React from "react";
import { format } from "date-fns";
import { CalEvent, RawType } from "./types";
import {
    CALENDER_START_HOUR,
    CALENDER_END_HOUR,
} from "./constants";
import { isPresentDay } from "@/utils/time-slot";
import CalenderEventsOverlay from "@/components/roster/roster-calender-view/calender/calender-events-overlay";
import CalenderTimeGrid from "@/components/roster/roster-calender-view/calender/calender-time-grid";

type DayViewProps = {
    date: Date;
    events: CalEvent[];
    slotHeight: number;
};

const CalenderDayView = ({ date, events, slotHeight }: DayViewProps) => {
    const raw: RawType[] = events
        .map((ev) => {
            const s = new Date(ev.start),
                e = new Date(ev.end);
            if (format(s, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"))
                return null;
            const startMin = s.getHours() * 60 + s.getMinutes();
            const endMin = e.getHours() * 60 + e.getMinutes();
            return { ev, startMin, endMin };
        })
        .filter((x): x is RawType => !!x)
        .filter(
            (r) =>
                r.endMin > CALENDER_START_HOUR * 60 &&
                r.startMin < CALENDER_END_HOUR * 60
        )
        .map((r) => ({
            ev: r.ev,
            startMin: Math.max(r.startMin, CALENDER_START_HOUR * 60),
            endMin: Math.min(r.endMin, CALENDER_END_HOUR * 60),
        }));

    const bucket: Record<number, RawType[]> = {};
    raw.forEach((r) => (bucket[r.startMin] ||= []).push(r));
    const buckets = [bucket];
    const isToday = isPresentDay(date);

    return (
        <CalenderTimeGrid
            dates={[date]}
            slotHeight={slotHeight}
            renderHeaderCell={(d) => <>{format(d, "EEEE, MMM d")}</>}
        >
            <CalenderEventsOverlay
                buckets={buckets}
                slotHeight={slotHeight}
                isTodayView={isToday}
            />
        </CalenderTimeGrid>
    );
};

export default CalenderDayView;
