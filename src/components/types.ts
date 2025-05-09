
export type View = "list" | "calendar";

export type BlockedSlot = {
    slot: string;
    reason: string;
}

export type Availability = {
    online_slots: string[];
    offline_slots: string[];
    both_slots: string[];
    online_booked_slots: string[];
    offline_booked_slots: string[];
    blocked_slots: BlockedSlot[];
}

export type ClinicDetails = {
    id: number;
    name: string;
}

export type Provider = {
    id: number;
    name: string;
    provider_usertype: string;
    is_inhouse: boolean;
    image: string;
    clinic_details: ClinicDetails;
    availabilities: Availability[];
}

export type FilterType = {
    service?: string;
    type?: string;
    centre?: string;
    search?: string;
}