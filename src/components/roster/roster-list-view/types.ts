
export type LegendItem = {
    label: string;
    colorClass: string;
};

export type SlotStatus =
    | "online"
    | "offline"
    | "both"
    | "onlineBooked"
    | "offlineBooked"
    | "blocked"
    | "available";