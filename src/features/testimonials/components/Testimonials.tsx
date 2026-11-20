"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "../types";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const m = useMessages().testimonials;
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () =>
    setI((n) => (n - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((n) => (n + 1) % testimonials.length);

  if (!t) {
    return <p className="text-sm text-muted-foreground">{m.none}</p>;
  }

  const navButton =
    "grid h-11 w-11 cursor-pointer place-items-center border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background";

  return (
    <div
      className="grid gap-10 md:grid-cols-12 md:gap-8"
      role="region"
      aria-label={m.region}
    >
      <blockquote className="md:col-span-9" aria-live="polite">
        <p className="text-balance text-heading text-foreground md:text-[2.5rem] md:leading-[1.2]">
          “{t.quote}”
        </p>
        <footer className="mt-8 flex items-center gap-4">
          {t.avatar ? (
            <Image
              src={t.avatar}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-cover"
            />
          ) : (
            <div className="label-mono grid h-11 w-11 place-items-center bg-secondary text-foreground">
              {t.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-base font-medium text-foreground">{t.name}</div>
            <div
              className="label-mono mt-0.5 text-accent"
              aria-label={`${t.rating} / 5`}
            >
              {"★".repeat(t.rating)}
              <span className="text-foreground/20">{"★".repeat(Math.max(0, 5 - t.rating))}</span>
            </div>
          </div>
        </footer>
      </blockquote>

      {testimonials.length > 1 && (
        <div className="flex items-center gap-3 md:col-span-3 md:justify-end md:self-end">
          <button onClick={prev} aria-label={m.previous} className={navButton}>
            <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <span className="label-mono w-20 text-center text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <button onClick={next} aria-label={m.next} className={navButton}>
            <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
