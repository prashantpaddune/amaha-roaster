import {isToday} from "date-fns";

export const getTimeSlots: string[] = Array.from(
    { length: (24 - 8) * 4 + 1 },
    (_, i) => {
        const totalMins = 8 * 60 + i * 15;
        const h = Math.floor(totalMins / 60) % 24;
        const m = totalMins % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
);

export const isPresentDay = (d: Date) => {
    return isToday(d)
}