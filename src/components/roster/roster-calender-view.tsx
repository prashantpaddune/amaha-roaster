import { useAppSelector } from "@/store/hooks";

const RosterCalenderView = () => {
    const { list, loading, error } = useAppSelector((s) => s.providers);

    if (loading) return <div className="p-6">Loading…</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
    if (list.length === 0) return <div className="p-6">No providers found.</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Roster Calendar View</h2>
            <pre className="overflow-auto max-h-[60vh] p-4 bg-gray-50 rounded-md text-sm whitespace-pre-wrap break-words">
                {JSON.stringify(list, null, 2)}
            </pre>
        </div>
    )
}

export default RosterCalenderView