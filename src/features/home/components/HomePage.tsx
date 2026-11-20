import { Hero } from "./Hero";
import { ArrowLink, SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/features/tours/components/TourCard";
import { ActivityCard } from "@/features/activities/components/ActivityCard";
import { Testimonials } from "@/features/testimonials/components/Testimonials";
import { Button } from "@/components/ui/button";
import ctaImg from "@/assets/cta.jpeg";
import Link from "next/link";
import Image from "next/image";
import type { Tour } from "@/features/tours/types";
import type { Activity } from "@/features/activities/types";
import type { Category } from "@/features/categories/types";
import type { Testimonial } from "@/features/testimonials/types";
import { getMessages } from "@/lib/i18n/server";

export default async function HomePage({
  tours = [],
  activities = [],
  categories = [],
  testimonials = [],
}: {
  tours?: Tour[];
  activities?: Activity[];
  categories?: Category[];
  testimonials?: Testimonial[];
}) {
  const t = (await getMessages()).home;
  const [lead, ...rest] = tours.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Featured: one wide lead card, then smaller offset cards. */}
      <section className="mx-auto max-w-360 px-4 pt-24 md:px-8 md:pt-32">
        <SectionHeading
          eyebrow={t.featuredEyebrow}
          title={
            <>
              {t.featuredTitle}{" "}
              <span className="text-muted-foreground">{t.featuredAccent}</span>
            </>
          }
          right={
            <ArrowLink href="/tours" className="hidden sm:inline-flex">
              {t.allTours}
            </ArrowLink>
          }
        />

        {lead && (
          <TourCard
            tour={lead}
            variant="wide"
            badge={t.featuredBadge}
            showDescription
          />
        )}

        {rest.length > 0 && (
          <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
            {rest.map((tour, i) => (
              <div
                key={tour.id}
                className={
                  i === 0
                    ? "md:col-span-6"
                    : "md:col-span-4 md:col-start-9 md:mt-40"
                }
              >
                <TourCard
                  tour={tour}
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                />
              </div>
            ))}
          </div>
        )}

        <ArrowLink href="/tours" className="mt-12 sm:hidden">
          {t.seeAllTours}
        </ArrowLink>
      </section>

      {/* Categories: captions under the photographs, no overlays. */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-360 px-4 pt-24 md:px-8 md:pt-36">
          <SectionHeading eyebrow={t.moodEyebrow} title={t.moodTitle} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {categories.slice(0, 4).map((c, i) => (
              <Link
                key={c.slug}
                href={`/tours?categoryId=${c.id}`}
                className={`group block ${i % 2 === 1 ? "md:mt-16" : ""}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3 border-b border-foreground/25 pb-3">
                  <span className="text-subheading text-foreground transition-colors group-hover:text-primary">
                    {c.label}
                  </span>
                  <span className="label-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      <section className="mx-auto max-w-360 px-4 pt-24 md:px-8 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:sticky md:top-[calc(var(--header-height)+2rem)] md:col-span-4 md:self-start">
            <p className="label-mono text-muted-foreground">{t.activitiesEyebrow}</p>
            <h2 className="mt-3 text-balance text-heading text-foreground">
              {t.activitiesTitle}
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-foreground/75">
              {t.activitiesBody}
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link href="/activities">{t.browseActivities}</Link>
            </Button>
          </div>
          <div className="border-b border-foreground/25 md:col-span-8 md:col-start-5">
            {activities.map((a, i) => (
              <ActivityCard key={a.id} activity={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-360 px-4 pt-24 md:px-8 md:pt-36">
        <SectionHeading eyebrow={t.notesEyebrow} title={t.notesTitle} />
        <Testimonials testimonials={testimonials} />
      </section>

      {/* Closing band: photograph and words side by side, nothing on top of the image. */}
      <section className="mx-auto max-w-360 px-4 py-24 md:px-8 md:py-36">
        <div className="grid gap-8 border-t border-foreground pt-8 md:grid-cols-12 md:gap-8 md:pt-10">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted md:col-span-7 md:aspect-auto md:min-h-[32rem]">
            <Image
              src={ctaImg}
              alt={t.ctaAlt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-10 md:col-span-5">
            <p className="label-mono text-muted-foreground">{t.ctaEyebrow}</p>
            <div>
              <h2 className="text-balance text-display text-foreground">
                {t.ctaBefore}{" "}
                <span className="text-primary">{t.ctaAccent}</span>{" "}
                {t.ctaAfter}
              </h2>
              <Button asChild size="lg" className="mt-8">
                <Link href="/tours">
                  {t.exploreTours} <span aria-hidden="true">↗</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
