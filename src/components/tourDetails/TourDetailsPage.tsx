"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Star,
  Check,
  ShieldCheck,
  Zap,
  CalendarIcon,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Progress } from "@/components/ui/Progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { getTourById, tours, type Tour } from "@/lib/mocks";
import Image from "next/image";
import Link from "next/link";
import ReviewsSection from "./ReviewSection";
import RelatedCard from "./TourCard";

export default function ActivityDetailsPage({ id }: { id: string }) {
  const tour = getTourById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [date, setDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const total = (tour?.price || 0) * (adults + children * 0.5);
  const related = tours.filter((t) => t.id !== tour?.id).slice(0, 3);

  const handleBook = () => {
    // navigate({
    //   to: "/booking",
    //   search: {
    //     tourId: tour.id,
    //     date: date ? date.toISOString().slice(0, 10) : undefined,
    //     adults,
    //     children,
    //     step: 1,
    //   },
    // });
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8 md:pt-16">
        {/* Gallery */}
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <button
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted md:aspect-[16/11]"
          >
            <Image
              src={tour?.images[activeImg] || "https://placehold.co/600x400"}
              alt={tour?.title || "title"}
              className="h-full w-full object-cover"
            />
          </button>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-2">
            {tour?.images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActiveImg(i);
                }}
                className={cn(
                  "relative object-contain overflow-hidden rounded-md bg-muted transition-opacity",
                  activeImg === i
                    ? "ring-2 ring-primary"
                    : "opacity-90 hover:opacity-100",
                )}
              >
                <Image
                  src={img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <article>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {tour?.category}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                {tour?.difficulty === "Challenging" ? "Hard" : tour?.difficulty}
              </span>
              <span className="text-muted-foreground">
                {tour?.duration} days
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
              {tour?.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{tour?.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({tour?.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/90">
              {tour?.longDescription}
            </p>

            <div className="mt-12">
              <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                Highlights
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {tour?.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-foreground/90"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                Day by day
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {tour?.itinerary.map((d) => (
                  <AccordionItem key={d.day} value={`d-${d.day}`}>
                    <AccordionTrigger>
                      <span className="font-display text-lg">
                        <span className="mr-4 text-muted-foreground">
                          Day {d.day}
                        </span>
                        {d.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {d.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-lg border border-border/70 bg-card p-6 shadow-sm">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl text-primary">
                    ${tour?.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / person
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                      Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start rounded-md text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <GuestStepper
                    label="Adults"
                    sub="Age 13+"
                    value={adults}
                    onChange={setAdults}
                    min={1}
                  />
                  <GuestStepper
                    label="Children"
                    sub="Age 2–12 · half price"
                    value={children}
                    onChange={setChildren}
                    min={0}
                  />
                </div>

                <div className="mt-6 space-y-2 border-t border-border/60 pt-4 text-sm">
                  <Row
                    label={`Adults × ${adults}`}
                    value={`$${(tour?.price || 0 * adults).toLocaleString()}`}
                  />
                  {children > 0 && (
                    <Row
                      label={`Children × ${children}`}
                      value={`$${(tour?.price || 0 * children * 0.5).toLocaleString()}`}
                    />
                  )}
                  <Row
                    label="Total"
                    value={`$${total.toLocaleString()}`}
                    bold
                  />
                </div>

                <Button
                  className="mt-6 w-full rounded-full"
                  size="lg"
                  onClick={handleBook}
                >
                  Book now
                </Button>

                <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Free cancellation up to 30 days out
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Instant confirmation
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Reviews */}
        {tour && <ReviewsSection tour={tour} />}

        {/* Related */}
        <div className="mt-24">
          <h2 className="mb-8 font-display text-3xl text-foreground md:text-4xl">
            You might also like
          </h2>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((t) => (
              <RelatedCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        bold && "pt-2 text-base font-medium text-foreground",
      )}
    >
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function GuestStepper({
  label,
  sub,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  sub?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="w-6 text-center text-sm font-medium">{value}</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
