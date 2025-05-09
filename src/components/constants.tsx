import { ToggleOption } from "@/ui/toggle-group";
import { View } from "@/components/types";
import { ListIcon } from "@/icons/list";
import { CalenderIcon } from "@/icons/calender";

export const VIEW_OPTIONS: ToggleOption<View>[] = [
    {
        key: "list",
        value: "list",
        content: <ListIcon className="h-6 w-6 text-grey" />,
        ariaLabel: "List view",
    },
    {
        key: "calendar",
        value: "calendar",
        content: <CalenderIcon className="h-6 w-6 text-grey" />,
        ariaLabel: "Calendar view",
    },
] as const;

export const FILTER_OPTIONS = {
    services: [
        'therapist',
        'psychiatrist',
        'cardiologist',
        'physiotherapist',
        'dietician',
        'neurologist'
    ],
    types: ['inhouse', 'external'],
    centres: [
        'Bandra Clinic',
        'Andheri Clinic',
        'Juhu Clinic',
        'Churchgate Clinic',
        'Powai Center',
        'Borivali Center',
        'Marine Lines Clinic',
        'Versova Clinic',
        'Malad Clinic'
    ],
} as const;
