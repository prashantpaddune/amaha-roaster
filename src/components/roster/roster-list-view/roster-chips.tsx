import { format } from "date-fns";
import { cn } from "@/utils/cn";
import { LEGEND_ITEMS } from "@/components/roster/roster-list-view/constants";

type Props = {
    date: Date;
}

const RosterChips = ({ date }: Props) => {
    return (
        <div className="flex flex-wrap justify-between">
            <div>
                <h3 className="text-lg font-semibold text-grey mb-2">
                    Showing full schedules for{" "}
                    {format(date, "EEE, d MMM yyyy")}
                </h3>
                <p className="text-sm font-normal text-muted-foreground">
                    Showing slots in the 6 am to 12 am window.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-x-8 gap-y-2 mt-1">
                {LEGEND_ITEMS.map(({ label, colorClass }) => (
                    <div key={label} className="flex items-center space-x-2">
                        <span className={cn("w-4 h-2 rounded-full flex-shrink-0", colorClass)} />
                        <span className="text-sm font-normal text-grey">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default RosterChips;