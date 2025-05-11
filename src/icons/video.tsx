import { Svg } from "@/icons/svg";
import { cn } from "@/utils/cn";

export const VideoIcon = ({ className }: { className?: string }) => {
    return (
        <Svg className={cn(className)} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5.33337L10 8.33337L14 11.3334V5.33337Z" stroke="currentColor" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path
                d="M8.93333 4H3.06667C2.47756 4 2 4.51167 2 5.14286V10.8571C2 11.4883 2.47756 12 3.06667 12H8.93333C9.52244 12 10 11.4883 10 10.8571V5.14286C10 4.51167 9.52244 4 8.93333 4Z"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}