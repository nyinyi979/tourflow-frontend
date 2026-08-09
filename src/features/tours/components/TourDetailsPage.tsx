"use client";
import { useState } from "react";
import { Star, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ReviewsSection from "@/features/reviews/components/ReviewSection";
import RelatedCard from "./RelatedTourCard";
import TourBookingCard from "./TourBookingCard";
import type { Tour } from "../types";

export default function TourDetailsPage({
  tour,
  related,
}: {
  tour: Tour;
  related: Tour[];
}) {
  const [activeImg, setActiveImg] = useState(0);

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
              src={tour.images[activeImg]?.url || "https://placehold.co/600x400"}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 67vw, 100vw"
              className="object-cover"
            />
          </button>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-2">
            {tour.images.slice(0, 4).map((img, i) => (
              <button
                key={img.id}
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
                  src={img.url}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 17vw, 25vw"
                  className="object-cover"
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
                {tour.category.label}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                {tour.difficulty === "Challenging" ? "Hard" : tour.difficulty}
              </span>
              <span className="text-muted-foreground">
                {tour.duration} days
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
              {tour.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{tour.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({tour.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/90">
              {tour.description}
            </p>

            <div className="mt-12">
              <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                Highlights
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((highlight) => (
                  <li
                    key={highlight.id}
                    className="flex items-start gap-3 text-sm text-foreground/90"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {highlight.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                Day by day
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {tour.itinerary.map((d) => (
                  <AccordionItem key={d.id} value={`d-${d.day}`}>
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

          <TourBookingCard tour={tour} />
        </div>

        {/* Reviews */}
        <ReviewsSection tour={tour} />

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
