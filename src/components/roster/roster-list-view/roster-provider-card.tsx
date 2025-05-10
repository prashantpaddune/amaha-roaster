'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@/icons/chevron-right';
import { ClinicIcon } from "@/icons/clinic";
import { VideoIcon } from "@/icons/video";

export type ProviderCardProps = {
    id: string | number;
    name: string;
    avatarUrl: string;
    homeCount: number;
    videoCount: number;
    calendarHref: string;
    className?: string;
}

const ProviderCard = ({
   id,
   name,
   avatarUrl,
   homeCount,
   videoCount,
   calendarHref,
}: ProviderCardProps) => {
    return (
        <div key={id}>
            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    sizes="96px"
                    className="object-cover"
                />
            </div>

            <h5 className="text-sm font-semibold text-davy-green underline underline-offset-2 mb-6">
                {name}
            </h5>

            <div className="flex gap-2 mb-6">
                <div className="flex items-center space-x-1 bg-[#F7F7F7] rounded-lg px-1.5 py-1">
                    <ClinicIcon className="h-4 w-4" />
                    <span className="text-xs font-medium text-grey">{homeCount}</span>
                </div>
                <div className="flex items-center space-x-1 bg-[#F7F7F7] rounded-lg px-1.5 py-1">
                    <VideoIcon className="h-4 w-4" />
                    <span className="text-xs font-medium text-grey">{videoCount}</span>
                </div>
            </div>

            <Link className="inline-flex items-center text-sm font-semibold text-slot-offline underline underline-offset-2" href={calendarHref}>
                View Calendar
                <ChevronRightIcon className="h-6 w-6 ml-1 text-slot-offline" />
            </Link>
        </div>
    );
};

export default ProviderCard;
