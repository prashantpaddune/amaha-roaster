import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { isSameDay } from "date-fns";

const useRosterList = () => {
    const { list, loading, error } = useAppSelector((s) => s.providers);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const isPresentDate = isSameDay(selectedDate, new Date());

    return {
        list,
        loading,
        error,
        setSelectedDate,
        selectedDate,
        isPresentDate
    }
}

export default useRosterList;