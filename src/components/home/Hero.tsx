"use client";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import heroImg from "@/assets/hero.jpeg";

export function Hero() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={heroImg}
        alt="Traveler above misty valleys at sunrise"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-5 pb-10 pt-32 md:min-h-[92vh] md:px-8 md:pb-16 md:pt-40">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/80">
            Issue 07 &middot; Slow travel, carefully arranged
          </p>
          <h1 className="text-balance font-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            The world is wide.
            <br />
            <em className="not-italic text-accent">Go somewhere quiet.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Small-group tours and single-day escapes to places that reward the
            long way in — from Patagonian ridgelines to Kyoto autumns.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 grid gap-3 rounded-2xl bg-background/95 p-3 shadow-2xl backdrop-blur md:mt-14 md:max-w-4xl md:grid-cols-[1.4fr_1fr_1fr_auto] md:gap-2 md:p-2"
        >
          <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </Field>
          <Field icon={<CalendarDays className="h-4 w-4" />} label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground focus:outline-none"
            />
          </Field>
          <Field icon={<Users className="h-4 w-4" />} label="Guests">
            <input
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-sm text-foreground focus:outline-none"
            />
          </Field>
          <Button
            type="submit"
            size="lg"
            className="h-full rounded-xl px-6 md:min-h-[64px]"
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-muted/60">
      <span className="text-primary">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
