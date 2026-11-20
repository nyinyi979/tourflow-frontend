"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/hero.jpeg";
import { useRouter } from "nextjs-toploader/app";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export function Hero() {
  const t = useMessages().hero;
  const [destination, setDestination] = useState("");
  const router = useRouter();

  return (
    <section className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-ink">
      <Image
        src={heroImg}
        alt={t.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />
      {/* Darkened only where the type sits: the bottom and the left edge. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-360 flex-col justify-end px-4 pb-8 pt-28 md:px-8 md:pb-10 md:pt-36">
        <h1 className="max-w-4xl text-balance text-[clamp(2.75rem,1.6rem+5vw,5.5rem)] font-medium leading-[0.98] text-white">
          {t.title}
          <br />
          <span className="text-accent">{t.titleAccent}</span>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-white/40 pt-6 md:mt-12 md:grid-cols-12 md:items-end md:gap-8 md:pt-8">
          <p className="max-w-md text-base leading-relaxed text-white/85 md:col-span-5 md:text-[1.0625rem]">
            {t.lead}
          </p>

          <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                const query = destination.trim();
                router.push(
                  query ? `/tours?query=${encodeURIComponent(query)}` : "/tours",
                );
              }}
              className="flex items-stretch bg-background"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 pl-4">
                <Search
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 text-foreground"
                />
                <span className="sr-only">{t.searchLabel}</span>
                <input
                  type="search"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={t.placeholder}
                  autoComplete="off"
                  className="h-14 min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="label-mono cursor-pointer bg-primary px-5 text-primary-foreground transition-colors hover:bg-foreground sm:px-7"
              >
                <span className="hidden sm:inline">{t.find}</span>
                <span className="sm:hidden">{t.searchShort}</span>
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <p className="label-price text-white/70">{t.note}</p>
              <Link
                href="/activities"
                className="label-mono inline-flex items-center gap-2 text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white"
              >
                {t.dayTrips} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
