import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const ChevronRightIcon = ({ className }: { className?: string }) => {
    return (
        <Svg className={cn(className)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 16L14 12L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </Svg>
    )
}