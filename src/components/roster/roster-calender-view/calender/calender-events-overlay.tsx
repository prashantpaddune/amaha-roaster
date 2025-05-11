import React from "react";
import { format } from "date-fns";
import { RawType } from "./types";
import { CALENDER_START_HOUR, CALENDER_HEADER_HEIGHT } from "./constants";
import { VideoIcon } from "@/icons/video";
import { cn } from "@/utils/cn";

export type BucketItem = RawType & { dayIndex?: number };

export type EventsOverlayProps = {
    buckets: Record<number, BucketItem[]>[];
    slotHeight: number;
    isTodayView: boolean;
};

const CalenderEventsOverlay = ({
    buckets,
    slotHeight,
    isTodayView,
}: EventsOverlayProps) => {
    if (!isTodayView) return null;

    const dayCount = buckets.length;
    const dayPct = 100 / dayCount;

    return (
        <div className="absolute top-0 bottom-0 left-[60px] right-0 pointer-events-none">
            {buckets.map((dayBucket, dayIndex) =>
                Object.values(dayBucket).flatMap((group) => {
                    const count = group.length;
                    const { startMin } = group[0];
                    const top =
                        ((startMin - CALENDER_START_HOUR * 60) / 60) * slotHeight +
                        CALENDER_HEADER_HEIGHT;

                    return group.map((item, i) => {
                        const widthPct = count > 1 ? dayPct / count : dayPct;
                        const leftPct = dayIndex * dayPct + i * widthPct;
                        const isFirst = i === 0;

                        return (
                            <div
                                key={item.ev.id + "-" + i}
                                className={cn(
                                    "absolute overflow-hidden rounded-md bg-opacity-90 text-xs text-white border border-white",
                                    item.ev.colorClass,
                                    !isFirst && "border-l-0",
                                )}
                                style={{
                                    top,
                                    left: `calc(${leftPct}% )`,
                                    width: `${widthPct}%`,
                                }}
                            >
                                <div className="px-2 py-1 leading-tight flex items-center justify-between">
                                    <div className="truncate">
                                        <div className="font-semibold truncate">{item.ev.title}</div>
                                        <div className="text-[10px] opacity-80 truncate">
                                            {format(new Date(item.ev.start), "h:mm a")}–
                                            {format(new Date(item.ev.end), "h:mm a")}
                                        </div>
                                    </div>
                                    {(item.ev.status === "online" || item.ev.status === "onlineBooked") && (
                                        <VideoIcon className="h-5 w-5 text-white ml-2 flex-shrink-0" />
                                    )}
                                </div>
                            </div>
                        );
                    });
                })
            )}
        </div>
    );
};

export default CalenderEventsOverlay;