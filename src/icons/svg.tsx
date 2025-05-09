import { type ComponentProps } from "react";

export type SvgProps = ComponentProps<"svg">;

export const Svg = ({
    viewBox = "0 0 24 24",
    fill = "none",
    "aria-hidden": ariaHidden = true,
    role = "img",
    children,
    ...props
}: SvgProps) => (
     <svg
        {...props}
        viewBox={viewBox}
        fill={fill}
        aria-hidden={ariaHidden}
        role={role}
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
    >
        {children}
    </svg>
);
