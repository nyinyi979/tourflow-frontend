"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/mocks/mocks";
import Image from "next/image";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () =>
    setI((n) => (n - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((n) => (n + 1) % testimonials.length);

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
      <blockquote className="max-w-3xl">
        <p className="font-display text-3xl leading-snug text-foreground sm:text-4xl md:text-5xl">
          <span className="text-accent">“</span>
          {t.quote}
          <span className="text-accent">”</span>
        </p>
        <footer className="mt-8 flex items-center gap-4">
          <Image
            src={t.avatar}
            alt={t.name}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-foreground">{t.name}</div>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
            </div>
          </div>
        </footer>
      </blockquote>
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous"
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {String(i + 1).padStart(2, "0")} /{" "}
          {String(testimonials.length).padStart(2, "0")}
        </span>
        <button
          onClick={next}
          aria-label="Next"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-primary text-primary-foreground transition-colors hover:opacity-90"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
