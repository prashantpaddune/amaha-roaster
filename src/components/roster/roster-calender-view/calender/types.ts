import { SlotStatus } from "@/components/roster/roster-list-view/types";

export type CalEvent = {
    id: string;
    title: string;
    start: string;
    end: string;
    status: SlotStatus;
    colorClass?: string;
};

export type ViewType = "daily" | "weekly" | "monthly";

export type RawType = { ev: CalEvent; startMin: number; endMin: number };
