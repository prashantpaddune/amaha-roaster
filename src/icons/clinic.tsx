import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const ClinicIcon = ({ className }: { className?: string }) => {
    return (
        <Svg className={cn(className)} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66663 6L7.99996 2L13.3333 6" stroke="#4C4C4C" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.33337 8.16663L8.00004 4.66663L12.6667 8.16663V14H3.33337V8.16663Z" stroke="#4C4C4C"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 8.66663V11.3333" stroke="#4C4C4C" strokeLinecap="round"/>
            <path d="M6.66663 10H9.33329" stroke="#4C4C4C" strokeLinecap="round"/>
        </Svg>

    )
}