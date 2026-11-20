import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground border border-input bg-card px-3 text-base transition-[border-color] duration-[var(--motion-fast)] placeholder:text-muted-foreground hover:border-foreground/60 focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
