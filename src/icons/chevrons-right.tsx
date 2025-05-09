import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const ChevronsRightIcon = ({ className }: { className?: string }) => {
    return (
        <Svg
            className={cn(className)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M11 17L6 12L11 7" stroke="#4C4C4C" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M18 17L13 12L18 7" stroke="#4C4C4C" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </Svg>
    )
}