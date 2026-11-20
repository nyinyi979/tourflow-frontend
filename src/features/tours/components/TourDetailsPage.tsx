"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DetailGallery, DetailSection } from "@/components/DetailGallery";
import ReviewsSection from "@/features/reviews/components/ReviewSection";
import RelatedCard from "./RelatedTourCard";
import TourBookingCard from "./TourBookingCard";
import type { Tour } from "../types";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function TourDetailsPage({
  tour,
  related,
}: {
  tour: Tour;
  related: Tour[];
}) {
  const m = useMessages();
  const t = m.tours;

  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-8 md:px-8 md:pb-32 md:pt-12">
      <nav className="label-mono flex flex-wrap items-center gap-2 text-muted-foreground">
        <Link href="/tours" className="hover:text-foreground">
          {m.nav.tours}
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/tours?categoryId=${tour.categoryId}`}
          className="hover:text-foreground"
        >
          {tour.category.label}
        </Link>
      </nav>

      <header className="mt-6 grid gap-6 pb-8 md:grid-cols-12 md:gap-8 md:pb-10">
        <h1 className="text-balance text-display text-foreground md:col-span-8">
          {tour.title}
        </h1>
        <ul className="label-mono flex flex-wrap items-center gap-x-5 gap-y-2 self-end text-foreground md:col-span-4 md:justify-end">
          <li>{m.common.days(tour.duration)}</li>
          <li>{m.common.difficultyShort[tour.difficulty] ?? tour.difficulty}</li>
          <li>
            <span aria-hidden="true" className="text-accent">★</span>{" "}
            {tour.rating.toFixed(1)}{" "}
            <span className="text-muted-foreground">{t.reviewCount(tour.reviewCount)}</span>
          </li>
        </ul>
      </header>

      <DetailGallery images={tour.images} title={tour.title} />

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <article className="lg:col-span-7">
          <p className="text-title text-foreground/90 md:text-[1.375rem] md:leading-[1.45]">
            {tour.description}
          </p>

          {tour.highlights.length > 0 && (
            <DetailSection title={t.highlights}>
              <ul className="grid sm:grid-cols-2 sm:gap-x-8">
                {tour.highlights.map((highlight, i) => (
                  <li
                    key={highlight.id}
                    className="flex gap-4 border-b border-foreground/20 py-3 text-[0.9375rem] text-foreground/90"
                  >
                    <span className="label-mono pt-0.5 text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {highlight.label}
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {tour.itinerary.length > 0 && (
            <DetailSection title={t.dayByDay}>
              <Accordion type="single" collapsible className="-mt-5 w-full">
                {tour.itinerary.map((d) => (
                  <AccordionItem
                    key={d.id}
                    value={`d-${d.day}`}
                    className="first:border-t-0"
                  >
                    <AccordionTrigger>
                      <span className="flex items-baseline gap-5">
                        <span className="label-mono w-14 shrink-0 text-muted-foreground">
                          {t.day(d.day)}
                        </span>
                        <span className="text-subheading">{d.title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-[4.75rem] text-foreground/75">
                      {d.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </DetailSection>
          )}
        </article>

        <div className="lg:col-span-4 lg:col-start-9">
          <TourBookingCard tour={tour} />
        </div>
      </div>

      <ReviewsSection tour={tour} />

      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <h2 className="border-b border-foreground pb-5 text-heading text-foreground">
            {t.related}
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {related.map((r) => (
              <RelatedCard key={r.id} tour={r} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
