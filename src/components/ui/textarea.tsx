import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full py-3 border border-input bg-card px-3 text-base transition-[border-color] duration-[var(--motion-fast)] placeholder:text-muted-foreground hover:border-foreground/60 focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
