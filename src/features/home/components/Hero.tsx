"use client";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/hero.jpeg";
import { useRouter } from "nextjs-toploader/app";

export function Hero() {
  const [destination, setDestination] = useState("");
  const router = useRouter();

  return (
    <section className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-ink">
      <Image
        src={heroImg}
        alt="Traveler above misty valleys at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/80" />

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-36">
        <div className="max-w-4xl">
          <h1 className="max-w-4xl text-balance font-display text-5xl leading-[0.94] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            The world is wide.
            <br />
            <em className="not-italic text-accent">Go somewhere quiet.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Small-group tours and single-day escapes to places that reward the
            long way in — from Patagonian ridgelines to Kyoto autumns.
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-3 md:mt-12 md:max-w-3xl md:flex-row md:items-center">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const query = destination.trim();
              router.push(
                query ? `/tours?query=${encodeURIComponent(query)}` : "/tours",
              );
            }}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-background p-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65)]"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <MapPin
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-primary"
              />
              <span className="sr-only">Search by destination or tour name</span>
              <input
                type="search"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search a place or trip"
                autoComplete="off"
                className="h-11 min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </label>
            <Button type="submit" size="lg" className="rounded-xl px-5 sm:px-7">
              <Search aria-hidden="true" />
              <span className="hidden sm:inline">Find a trip</span>
              <span className="sm:hidden">Search</span>
            </Button>
          </form>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="justify-center rounded-full text-white hover:bg-white/10 hover:text-white md:justify-start"
          >
            <Link href="/activities">
              Browse day trips <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/75">
          Carefully planned itineraries · Local guides · Free cancellation up
          to 48 hours before
        </p>
      </div>
    </section>
  );
}
