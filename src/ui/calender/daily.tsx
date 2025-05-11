import React from "react";
import { format } from "date-fns";
import { VideoIcon } from "@/icons/video";
import { CalEvent, RawType } from "@/ui/calender/types";
import { cn } from "@/utils/cn";
import { getHours } from "@/ui/calender/utils";
import { CALENDER_END_HOUR, CALENDER_HEADER_HEIGHT, CALENDER_START_HOUR } from "@/ui/calender/constants";
import { isPresentDay } from "@/utils/time-slot";

type DayProps = {
    date: Date;
    events: CalEvent[];
    slotHeight: number;
};

const DayView = ({ date, events, slotHeight }: DayProps)=>  {
    const raw: RawType[] = events
        .map((ev) => {
            const s = new Date(ev.start),
                e = new Date(ev.end);
            if (format(s, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")) return null;
            const startMin = s.getHours() * 60 + s.getMinutes();
            const endMin = e.getHours() * 60 + e.getMinutes();
            return { ev, startMin, endMin };
        })
        .filter((x): x is RawType => !!x)
        .filter((r) => r.endMin > CALENDER_START_HOUR * 60 && r.startMin < CALENDER_END_HOUR * 60)
        .map((r) => ({
            ev: r.ev,
            startMin: Math.max(r.startMin, CALENDER_START_HOUR * 60),
            endMin: Math.min(r.endMin, CALENDER_END_HOUR * 60),
        }));

    const buckets: Record<number, RawType[]> = {};
    raw.forEach((r) => (buckets[r.startMin] ||= []).push(r));
    const isToday = isPresentDay(date);

    return (
        <div className="relative overflow-x-auto">
            <div className="grid grid-cols-[60px_1fr]">
                <div style={{ height: CALENDER_HEADER_HEIGHT }} />
                <div className="h-8 flex items-center justify-center font-medium">
                    {format(date, "EEEE, MMM d")}
                </div>
                {getHours.map((h) => (
                    <React.Fragment key={h}>
                        <div
                            style={{ height: slotHeight }}
                            className="border-t border-gray-200 text-xs text-gray-400 flex items-start pt-1 px-1"
                        >
                            {format(new Date().setHours(h, 0, 0, 0), "ha")}
                        </div>
                        <div
                            style={{ height: slotHeight }}
                            className="border-t border-l border-gray-200 relative"
                        />
                    </React.Fragment>
                ))}
            </div>

            {isToday && (
                <div className="absolute top-0 bottom-0 left-[60px] w-full right-0 pointer-events-none">
                    {Object.values(buckets).map((group) => {
                        const count = group.length;
                        const { startMin, ev: firstEv } = group[0];
                        const offsetMin = startMin - CALENDER_START_HOUR * 60;
                        const top = (offsetMin / 60) * slotHeight + CALENDER_HEADER_HEIGHT;

                        if (count > 1) {
                            return (
                                <div key={startMin} className={cn("absolute w-4")} style={{ top }}>
                                    <div className="flex h-full">
                                        {group.map(({ ev }, i) => (
                                            <div
                                                key={ev.id + i}
                                                className={`flex-1 rounded-md bg-opacity-90 text-xs text-white ${ev.colorClass}`}
                                                style={{ marginLeft: i === 0 ? 0 : 1 }}
                                            >
                                                <div className="px-2 py-1 leading-tight flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold truncate">{ev.title}</div>
                                                        <div className="text-[10px] opacity-80">
                                                            {format(new Date(ev.start), "h:mm a")}–
                                                            {format(new Date(ev.end), "h:mm a")}
                                                        </div>
                                                    </div>
                                                    {(ev.status === "online" || ev.status === "onlineBooked") && (
                                                        <VideoIcon className="h-5 w-5 font-bold text-white ml-2 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        } else {
                            const ev = firstEv;
                            return (
                                <div
                                    key={ev.id}
                                    className={`absolute rounded-md bg-opacity-90 text-xs text-white ${ev.colorClass}`}
                                    style={{ top, width: `16rem` }}
                                >
                                    <div className="px-2 py-1 leading-tight flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold truncate">{ev.title}</div>
                                            <div className="text-[10px] opacity-80">
                                                {format(new Date(ev.start), "h:mm a")}–
                                                {format(new Date(ev.end), "h:mm a")}
                                            </div>
                                        </div>
                                        {(ev.status === "online" || ev.status === "onlineBooked") && (
                                            <VideoIcon className="h-5 w-5 font-bold text-white ml-2 flex-shrink-0" />
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}
export default DayView;