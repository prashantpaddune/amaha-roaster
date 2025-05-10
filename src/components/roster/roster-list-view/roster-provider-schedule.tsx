import React from "react";
import { RosterScheduleRow } from "./roster-schedule-row";
import ProviderCard from "@/components/roster/roster-list-view/roster-provider-card";
import { ProviderState } from "@/store/slices/provider-slice";
import { getVideoScheduleCount, getHomeScheduleCount } from "@/utils/schedule";

const RosterProviderSchedule = ({ list, error, loading }: ProviderState) => {

    if (loading) {
        return <div>Loading…</div>;
    }

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    if (list.length === 0) {
        return <div>No providers found.</div>;
    }

    return (
        <>
            {list.map((provider) => {
                const homeCount = getHomeScheduleCount(provider);
                const videoCount = getVideoScheduleCount(provider);
                return (
                    <div
                        key={provider.id}
                        className="flex items-start pt-6"
                    >
                        <div className="w-40 flex-shrink-0">
                            <ProviderCard
                                id={provider.id}
                                name={provider.name}
                                avatarUrl={provider.image}
                                homeCount={homeCount}
                                videoCount={videoCount}
                                calendarHref={`/providers/${provider.id}`}
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <RosterScheduleRow availability={provider.availabilities[0]} />
                        </div>
                    </div>
                )})}
        </>
    );
};

export default RosterProviderSchedule;