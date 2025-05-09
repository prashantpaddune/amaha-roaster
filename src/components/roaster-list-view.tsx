import { useAppSelector } from "@/store/hooks";


const RoasterListView = () => {
    const { list, loading, error } = useAppSelector((s) => s.providers);

    if (loading) return <div className="p-6">Loading…</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
    if (list.length === 0) return <div className="p-6">No providers found.</div>;

    return (
        <>
            <h2>Roaster List</h2>
            {JSON.stringify(list)}
        </>

    )
}

export default RoasterListView;