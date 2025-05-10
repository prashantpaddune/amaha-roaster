import { useAppSelector } from "@/store/hooks";
import { DateSelector } from "@/ui/date-selector";
import { useState } from "react";
import RosterChips from "@/components/roster/roster-list-view/roster-chips";
import RosterProviderSchedule from "@/components/roster/roster-list-view/roster-provider-schedule";

const RosterListView = () => {
    const { list, loading, error } = useAppSelector((s) => s.providers);
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <RosterChips date={selectedDate} />
            <div className="space-y-6">
                <RosterProviderSchedule list={list} error={error} loading={loading} />
            </div>
        </div>
    );
};

export default RosterListView;
