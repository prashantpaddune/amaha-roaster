import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const ChevronsDownIcon = ({ className }: { className?: string }) => {
    return (
        <Svg
            className={cn(className)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6 9L12 15L18 9H6Z" fill="#4C4C4C"/>
        </Svg>

    )
}