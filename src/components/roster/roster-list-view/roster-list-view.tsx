import { useAppSelector } from "@/store/hooks";
import { DateSelector } from "@/ui/date-selector";
import { useState } from "react";
import RosterChips from "@/components/roster/roster-list-view/roster-chips";

const RosterListView = () => {
    const { list, loading, error } = useAppSelector((s) => s.providers);
    const [selectedDate, setSelectedDate] = useState(new Date());

    if (loading) return <div className="p-6">Loading…</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
    if (list.length === 0) return <div className="p-6">No providers found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
            <DateSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
            <RosterChips date={selectedDate}/>
            <pre className="overflow-auto max-h-[60vh] p-4 bg-gray-50 rounded-md text-sm whitespace-pre-wrap break-words">
                {JSON.stringify(list, null, 2)}
            </pre>
        </div>
    )
}

export default RosterListView;