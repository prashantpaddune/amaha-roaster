import React from "react";
import { cn } from "@/utils/cn";
import { SlotStatus } from "@/components/roster/roster-list-view/types";
import { COLORS } from "@/components/roster/roster-list-view/constants";

type SlotProps = {
    time: string;
    status: SlotStatus;
};

const RosterSlot= ({ time, status }: SlotProps) => (
    <div
        className={cn(
            "min-w-[4rem] text-center py-1.5 rounded-lg font-medium text-xs",
            COLORS[status]
        )}
    >
        {time}
    </div>
);

export default RosterSlot;