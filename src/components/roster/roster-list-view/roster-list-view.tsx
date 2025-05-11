import { DateSelector } from "@/ui/date-selector";
import RosterChips from "@/components/roster/roster-list-view/roster-chips";
import RosterProviderSchedule from "@/components/roster/roster-list-view/roster-provider-schedule";
import useRosterList from "@/components/roster/roster-list-view/use-roster-list";

const RosterListView = () => {
    const { selectedDate, setSelectedDate, list, loading, error, isPresentDate } = useRosterList();
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <RosterChips date={selectedDate} />
            {isPresentDate && (
                <div className="space-y-6">
                    <RosterProviderSchedule list={list} error={error} loading={loading}/>
                </div>
            )}
        </div>
    );
};

export default RosterListView;
