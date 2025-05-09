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

export const SERVICE_OPTIONS = [
    { label: 'All services',   value: '' },
    { label: 'Therapist',      value: 'therapist' },
    { label: 'Psychiatrist',   value: 'psychiatrist' },
    { label: 'Cardiologist',   value: 'cardiologist' },
    { label: 'Physiotherapist', value: 'physiotherapist' },
    { label: 'Dietician',      value: 'dietician' },
    { label: 'Neurologist',    value: 'neurologist' },
];

export const TYPE_OPTIONS = [
    { label: 'All types',  value: '' },
    { label: 'In-house',   value: 'inhouse' },
    { label: 'External',    value: 'external' },
];

export const CENTER_OPTIONS = [
    { label: 'All centres',       value: '' },
    { label: 'Bandra Clinic',     value: 'Bandra Clinic' },
    { label: 'Andheri Clinic',    value: 'Andheri Clinic' },
    { label: 'Juhu Clinic',       value: 'Juhu Clinic' },
    { label: 'Churchgate Clinic', value: 'Churchgate Clinic' },
    { label: 'Powai Center',      value: 'Powai Center' },
    { label: 'Borivali Center',   value: 'Borivali Center' },
    { label: 'Marine Lines Clinic', value: 'Marine Lines Clinic' },
    { label: 'Versova Clinic',    value: 'Versova Clinic' },
    { label: 'Malad Clinic',      value: 'Malad Clinic' },
];
