import React, { useRef } from "react";
import {Availability} from "@/components/roster/types";
import { ChevronLeftIcon } from "@/icons/chevron-left";
import { ChevronRightIcon } from "@/icons/chevron-right";
import RosterSlot from "@/components/roster/roster-list-view/roster-slot";
import { getTimeSlots } from "@/utils/time-slot";
import {chunkIntoColumns, getStatusForSlot} from "@/utils/schedule";

type Props = {
    availability: Availability;
}

export const RosterScheduleRow = ({
      availability,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollBy = (dx: number) =>
        containerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

    const columns = chunkIntoColumns(getTimeSlots)

    return (
        <div className="border border-gray-200 rounded-xl bg-white">
            <div className="flex">
                <div className="relative flex-1 overflow-hidden">
                    <button
                        onClick={() => scrollBy(-200)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-white rounded-l-xl border-r border-gray-200 h-full"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-500"/>
                    </button>

                    <div
                      ref={containerRef}
                      className="relative overflow-hidden"
                    >
                      <div
                        className="flex min-w-max gap-4 overflow-x-auto overflow-y-hidden py-4 px-14 scrollbar-hide"
                        style={{ scrollBehavior: "smooth" }}
                      >
                        {columns.map((col, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-4">
                                {col.map((time) => (
                                    <RosterSlot key={time} time={time} status={getStatusForSlot(availability, time)}/>
                                ))}
                            </div>
                        ))}
                    </div>
                    </div>

                    <button
                        onClick={() => scrollBy(200)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-white rounded-r-xl border-l border-gray-200 h-full"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-500"/>
                    </button>
                </div>
            </div>
        </div>
    );
};


