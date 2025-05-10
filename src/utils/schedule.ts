import {Availability, Provider} from "@/components/roster/types";
import { SlotStatus } from "@/components/roster/roster-list-view/types";

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