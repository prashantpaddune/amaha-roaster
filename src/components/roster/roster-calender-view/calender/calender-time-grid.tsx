import React from "react";
import { format } from "date-fns";
import { getHours } from "./utils";
import { CALENDER_HEADER_HEIGHT } from "./constants";

export type TimeGridProps = React.PropsWithChildren<{
    dates: Date[];
    renderHeaderCell: (date: Date) => React.ReactNode;
    slotHeight: number;
}>;

const CalenderTimeGrid = ({
      dates,
      renderHeaderCell,
      slotHeight,
      children,
}: TimeGridProps) => {
    const cols = `60px repeat(${dates.length}, 1fr)`;

    return (
        <div className="relative overflow-x-auto">
            <div className="grid" style={{ gridTemplateColumns: cols }}>
                <div style={{ height: CALENDER_HEADER_HEIGHT }} />
                {dates.map((d) => (
                    <div key={d.toString()} className="h-8 text-center text-sm">
                        {renderHeaderCell(d)}
                    </div>
                ))}

                {getHours.map((h) => (
                    <React.Fragment key={h}>
                        <div
                            style={{ height: slotHeight }}
                            className="border-t border-gray-200 text-xs text-gray-400 flex items-start pt-1 px-1"
                        >
                            {format(new Date().setHours(h, 0, 0, 0), "ha")}
                        </div>
                        {dates.map((d) => (
                            <div
                                key={d.toString() + h}
                                style={{ height: slotHeight }}
                                className="border-t border-l border-gray-200 relative"
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {children}
        </div>
    );
};

export default CalenderTimeGrid;