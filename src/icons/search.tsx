import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const SearchIcon = ({ className }: { className?: string }) => {
    return (
        <Svg className={cn(className)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17Z"
                stroke="#4C4C4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 19L15.5 15.5" stroke="#4C4C4C" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </Svg>
    )
}