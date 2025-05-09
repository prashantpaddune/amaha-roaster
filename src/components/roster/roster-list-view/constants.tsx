import { LegendItem } from "@/components/roster/roster-list-view/types";

export const LEGEND_ITEMS: LegendItem[] = [
    { label: "Online",           colorClass: "bg-slot-online" },
    { label: "Offline",          colorClass: "bg-slot-offline" },
    { label: "Online+Offline",   colorClass: "bg-slot-both" },
    { label: "Online Booked",    colorClass: "bg-slot-booked-online" },
    { label: "Offline Booked",   colorClass: "bg-slot-booked-offline" },
    { label: "Blocked",          colorClass: "bg-slot-blocked" },
];
