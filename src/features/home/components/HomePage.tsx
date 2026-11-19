import { ArrowRight } from "lucide-react";
import { Hero } from "./Hero";
import { SectionHeading } from "@/components/SectionHeading";
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
  testimonials= [],
}: {
  tours?: Tour[];
  activities?: Activity[];
  categories?: Category[];
  testimonials?: Testimonial[];
}) {
  const t = (await getMessages()).home;
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow={t.featuredEyebrow}
          title={
            <>
              {t.featuredTitle}{" "}
              <em className="font-display italic text-primary">{t.featuredAccent}</em>
            </>
          }
          right={
            <Link
              href="/tours"
              className="hidden items-center gap-2 text-sm text-foreground hover:text-primary sm:inline-flex"
            >
              {t.allTours} <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {tours.slice(0, 3).map((t, i) => (
            <div key={t.id} className={i === 1 ? "md:mt-16" : ""}>
              <TourCard tour={t} />
            </div>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-10 w-full rounded-full sm:hidden">
          <Link href="/tours">
            {t.seeAllTours} <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </section>

      {/* Categories */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow={t.moodEyebrow}
            title={<>{t.moodTitle}</>}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.slice(0, 4).map((c, i) => (
              <Link
                key={c.slug}
                href={`/tours?categoryId=${c.id}`}
                className={`group relative block overflow-hidden rounded-md ${
                  i % 2 === 1 ? "md:mt-10" : ""
                }`}
              >
                <div className="relative aspect-[3/4]">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={c.label}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <span className="font-display text-2xl text-white md:text-3xl">
                    {c.label}
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="text-balance font-display text-3xl leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
              {t.activitiesTitle}
            </h2>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              {t.activitiesBody}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t.activitiesEyebrow}
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href="/activities">{t.browseActivities}</Link>
            </Button>
          </div>
          <div className="space-y-8">
            {activities.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={t.notesEyebrow} title={<>{t.notesTitle}</>} />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative isolate mx-auto max-w-[110rem] overflow-hidden md:rounded-2xl">
        <Image
          src={ctaImg}
          alt={t.ctaAlt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-40">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl">
              {t.ctaBefore} <em className="not-italic text-accent">{t.ctaAccent}</em>{" "}
              {t.ctaAfter}
            </h2>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              {t.ctaEyebrow}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-accent px-7 text-accent-foreground hover:opacity-90"
            >
              <Link href="/tours">
                {t.exploreTours} <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
