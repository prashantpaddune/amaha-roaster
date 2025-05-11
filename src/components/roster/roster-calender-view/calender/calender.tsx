import React from "react";
import { ChevronLeftIcon } from "@/icons/chevron-left";
import { ChevronRightIcon } from "@/icons/chevron-right";
import { Select } from "@/ui/select";
import { CalEvent, ViewType } from "@/components/roster/roster-calender-view/calender/types";
import { CALENDER_VIEW_OPTIONS } from "@/components/roster/roster-calender-view/calender/constants";
import CalenderDailyView from "@/components/roster/roster-calender-view/calender/calender-daily-view";
import CalenderWeeklyView from "@/components/roster/roster-calender-view/calender/calender-weekly-view";
import CalenderMonthlyView from "@/components/roster/roster-calender-view/calender/calender-monthly-view";

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

export const Calender: React.FC<CalendarProps> = ({
      view,
      title,
      events,
      onPrev,
      onNext,
      onViewChange,
      activeDate,
      slotHeight = 100,
}) => (
    <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between mb-2 px-4 py-2">
            <div className="flex items-center space-x-2">
                <button
                    onClick={onPrev}
                    className="p-1 md:p-1.5 border rounded-full border-navbar-border"
                >
                    <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-davy-green" />
                </button>
                <button
                    onClick={onNext}
                    className="p-1 md:p-1.5 border rounded-full border-navbar-border"
                >
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
            <CalenderDailyView date={activeDate} events={events} slotHeight={slotHeight} />
        ) : view === "weekly" ? (
            <CalenderWeeklyView date={activeDate} events={events} slotHeight={slotHeight} />
        ) : (
            <CalenderMonthlyView date={activeDate} events={events} />
        )}
    </div>
);
