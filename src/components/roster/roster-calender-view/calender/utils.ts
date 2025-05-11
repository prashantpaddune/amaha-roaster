import {addDays} from "date-fns";
import { CALENDER_END_HOUR, CALENDER_START_HOUR } from "@/components/roster/roster-calender-view/calender/constants";

export const getHours = Array.from(
    { length: CALENDER_END_HOUR - CALENDER_START_HOUR },
    (_, i) => CALENDER_START_HOUR + i
);

export const getWeekDays = (WEEK_START: Date) => {
    return Array.from({ length: 7 }, (_, i) =>
        addDays(WEEK_START, i)
    );
}