import { useState, useMemo, useCallback } from "react";
import {
    format,
    addWeeks,
    addMonths,
    startOfWeek,
    addDays,
} from "date-fns";
import type { Provider } from "@/components/roster/types";
import { ViewType } from "@/components/roster/roster-calender-view/calender/types";
import { COLORS } from "@/components/roster/roster-list-view/constants";
import { mapAvailabilitiesToEvents } from "@/utils/schedule";

type Args = {
    providers: Provider[];
}

export function useRosterCalendar({ providers }: Args) {
    const [view, setView]         = useState<ViewType>("daily");
    const [activeDate, setActive] = useState(new Date());

    const title = useMemo(() => {
        if (view === "weekly") {
            const ws = startOfWeek(activeDate, { weekStartsOn: 0 });
            const we = addDays(ws, 6);
            return `${format(ws, "d")}–${format(we, "d MMM yyyy")}`;
        }
        if (view === "monthly") {
            return format(activeDate, "MMMM yyyy");
        }
        return format(activeDate, "EEEE, MMM d, yyyy");
    }, [activeDate, view]);

    const PREV: Record<ViewType, (d: Date) => Date> = {
        daily:   (d) => addDays(d, -1),
        weekly:  (d) => addWeeks(d, -1),
        monthly: (d) => addMonths(d, -1),
    };

    const NEXT: Record<ViewType, (d: Date) => Date> = {
        daily:   (d) => addDays(d, 1),
        weekly:  (d) => addWeeks(d, 1),
        monthly: (d) => addMonths(d, 1),
    };

    const onPrev = useCallback(() => {
        setActive(PREV[view]);
    }, [view, setActive]);

    const onNext = useCallback(() => {
        setActive(NEXT[view]);
    }, [view, setActive]);

    const changeView = useCallback((v: ViewType) => setView(v), []);

    const raw = useMemo(
        () => mapAvailabilitiesToEvents(providers, activeDate),
        [providers, activeDate]
    );

    const events = useMemo(
        () => raw.map((ev) => ({ ...ev, colorClass: COLORS[ev.status] })),
        [raw]
    );

    return {
        view,
        title,
        activeDate,
        onPrev,
        onNext,
        changeView,
        setActiveDate: setActive,
        events,
    };
}
