"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/** Round hairline button, fixed bottom-right, shown once the page is scrolled. */
export function BackToTop() {
  const label = useMessages().layout.backToTop;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
      className={cn(
        "fixed bottom-5 right-4 z-30 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-foreground bg-card text-foreground transition-[opacity,translate,background-color,color] duration-(--motion-base) ease-(--ease-out) hover:bg-foreground hover:text-background md:bottom-8 md:right-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ChevronUp aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}
