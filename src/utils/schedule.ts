import { Availability, Provider } from "@/components/roster/types";
import { SlotStatus } from "@/components/roster/roster-list-view/types";
import { CalEvent } from "@/components/roster/roster-calender-view/calender/types";
import { addDays, startOfWeek } from "date-fns";
import { set as setDateTime } from "date-fns/set";

export const getStatusForSlot = (
    availability: Availability,
    time: string
): SlotStatus => {
    const {
        online_slots,
        offline_slots,
        both_slots,
        online_booked_slots,
        offline_booked_slots,
        blocked_slots,
    } = availability;

    if (blocked_slots.some((b) => b.slot === time)) return "blocked";
    if (online_booked_slots.includes(time)) return "onlineBooked";
    if (offline_booked_slots.includes(time)) return "offlineBooked";
    if (both_slots.includes(time)) return "both";
    if (online_slots.includes(time)) return "online";
    if (offline_slots.includes(time)) return "offline";
    return "available";
}

export const chunkIntoColumns = <T>(arr: T[], size = 4): T[][] => {
    const cols: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        cols.push(arr.slice(i, i + size));
    }
    return cols;
}

export const getHomeScheduleCount = (provider: Provider) => {
    return provider.availabilities.reduce(
        (sum, av) => sum + av.offline_slots.length + av.both_slots.length,
        0
    )
}

export const getVideoScheduleCount = (provider: Provider) => {
    return provider.availabilities.reduce(
        (sum, av) => sum + av.online_slots.length + av.both_slots.length,
        0
    )
}

export const mapAvailabilitiesToEvents = (
    providers: Provider[],
    activeDate: Date
): CalEvent[] => {
    const weekStart = startOfWeek(activeDate, { weekStartsOn: 0 });
    const events: CalEvent[] = [];

    providers.forEach((prov) =>
        prov.availabilities.forEach((av, provIdx) => {
            const raw = [
                ...av.online_slots       .map(t => ({ time: t, status: "online" })),
                ...av.offline_slots      .map(t => ({ time: t, status: "offline" })),
                ...av.both_slots         .map(t => ({ time: t, status: "both" })),
                ...av.online_booked_slots.map(t => ({ time: t, status: "onlineBooked" })),
                ...av.offline_booked_slots.map(t => ({ time: t, status: "offlineBooked" })),
                ...av.blocked_slots      .map(b => ({ time: b.slot, status: "blocked" })),
            ];

            const onlineBooked = new Set(
                raw.filter(r => r.status === "onlineBooked").map(r => r.time)
            );
            const offlineBooked = new Set(
                raw.filter(r => r.status === "offlineBooked").map(r => r.time)
            );

            const filtered = raw.filter(r =>
                !(
                    (r.status === "online"  && onlineBooked.has(r.time)) ||
                    (r.status === "offline" && offlineBooked.has(r.time))
                )
            );

            filtered.forEach(({ time, status }, slotIdx) => {
                const [hour, minute] = time.split(":").map(Number);
                const date = addDays(weekStart, activeDate.getDay());

                const start = setDateTime(date, {
                    hours: hour,
                    minutes: minute,
                    seconds: 0,
                    milliseconds: 0,
                });
                const end = setDateTime(date, {
                    hours: hour,
                    minutes: minute + 15,
                    seconds: 0,
                    milliseconds: 0,
                });

                events.push({
                    id:     `${prov.id}-${provIdx}-${slotIdx}`,
                    title:  `${prov.name} (${prov.clinic_details.name})`,
                    start:  start.toISOString(),
                    end:    end.toISOString(),
                    status: status as SlotStatus,
                });
            });
        })
    );

    return events;
};

