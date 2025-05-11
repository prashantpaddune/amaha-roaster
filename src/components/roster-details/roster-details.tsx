"use client";

import { Provider } from "@/components/roster/types";
import { useRosterCalendar } from "@/components/roster/roster-calender-view/use-roaster-calender";
import { Calender } from "@/components/roster/roster-calender-view/calender/calender";
import React from "react";
import ProviderCard from "@/components/roster/roster-list-view/roster-provider-card";
import { getHomeScheduleCount, getVideoScheduleCount } from "@/utils/schedule";

type Props = {
    rosterDetails: Provider;
}

const RosterDetails = ({ rosterDetails }: Props) => {
    const {
        view,
        title,
        activeDate,
        onPrev,
        onNext,
        changeView,
        setActiveDate,
        events,
    } = useRosterCalendar({ providers: [rosterDetails] });

    const homeCount = getHomeScheduleCount(rosterDetails);
    const videoCount = getVideoScheduleCount(rosterDetails);

    return (
        <div className="flex flex-col md:flex-row flex-1 overflow-scroll md:overflow-hidden">
            <div className="flex-shrink-0 md:w-[22.5rem] w-full md:min-h-screen flex items-center justify-center mt-10 md:-mt-10 border-r border-gray-200">
                <ProviderCard
                    id={rosterDetails.id}
                    name={rosterDetails.name}
                    avatarUrl={rosterDetails.image}
                    homeCount={homeCount}
                    videoCount={videoCount}
                    className="flex flex-col items-center"
                />
            </div>
            <main className="flex-1 min-w-0 p-4 md:overflow-y-auto">
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
            </main>
        </div>
)}

export default RosterDetails;