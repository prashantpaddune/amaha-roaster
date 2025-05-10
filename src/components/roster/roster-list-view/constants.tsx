import { LegendItem, SlotStatus } from "@/components/roster/roster-list-view/types";

export const LEGEND_ITEMS: LegendItem[] = [
    { label: "Online",           colorClass: "bg-slot-online" },
    { label: "Offline",          colorClass: "bg-slot-offline" },
    { label: "Online+Offline",   colorClass: "bg-slot-both" },
    { label: "Online Booked",    colorClass: "bg-slot-booked-online" },
    { label: "Offline Booked",   colorClass: "bg-slot-booked-offline" },
    { label: "Blocked",          colorClass: "bg-slot-blocked" },
];


export const COLORS: Record<SlotStatus, string> = {
    online:         "bg-slot-online text-white",
    offline:        "bg-slot-offline text-white",
    both:           "bg-slot-both text-white",
    onlineBooked:   "bg-slot-booked-online text-white",
    offlineBooked:  "bg-slot-booked-offline text-white",
    blocked:        "bg-slot-blocked text-white",
    available:      "bg-slot-available text-grey",
};