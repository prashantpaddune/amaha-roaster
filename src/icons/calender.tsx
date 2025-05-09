import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const CalenderIcon = ({ className }: { className?: string }) => {
    return (
        <Svg className={cn(className)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.2222 5H5.77778C4.79594 5 4 5.74619 4 6.66667V18.3333C4 19.2538 4.79594 20 5.77778 20H18.2222C19.2041 20 20 19.2538 20 18.3333V6.66667C20 5.74619 19.2041 5 18.2222 5Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}