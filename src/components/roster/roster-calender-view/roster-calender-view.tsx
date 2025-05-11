'use client';

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Calender } from "@/ui/calender/calender";
import { useRosterCalendar } from "@/components/roster/roster-calender-view/use-roaster-calender";

const RosterCalendarView = () => {
    const providers = useAppSelector((s) => s.providers.list);
    const {
        view,
        title,
        activeDate,
        onPrev,
        onNext,
        changeView,
        setActiveDate,
        events,
    } = useRosterCalendar({ providers });

    return (
        <Calender
            view={view}
            title={title}
            events={events}
            onPrev={onPrev}
            onNext={onNext}
            onViewChange={changeView}
            activeDate={activeDate}
            onDateSelect={setActiveDate}
            slotHeight={140}
        />
    );
};

export default RosterCalendarView;
