import { ArrowRight } from "lucide-react";
import { Hero } from "@/page/home/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { ActivityCard } from "@/components/ActivityCard";
import { Testimonials } from "@/page/home/components/Testimonials";
import { Button } from "@/components/ui/Button";
import ctaImg from "@/assets/cta.jpeg";
import Link from "next/link";
import Image from "next/image";
import type { Tour } from "@/types/tour";
import type { Activity } from "@/types/activity";
import type { Category } from "@/types/category";
import type { Testimonial } from "@/types/testimonial";

export default function HomePage({
  tours,
  activities,
  categories,
  testimonials,
}: {
  tours: Tour[];
  activities: Activity[];
  categories: Category[];
  testimonials: Testimonial[];
}) {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          eyebrow="Featured tours"
          title={
            <>
              Three trips we&apos;d take{" "}
              <em className="font-display italic text-primary">this season.</em>
            </>
          }
          right={
            <Link
              href="/tours"
              className="hidden items-center gap-2 text-sm text-foreground hover:text-primary sm:inline-flex"
            >
              All tours <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {tours.slice(0, 3).map((t, i) => (
            <div key={t.id} className={i === 1 ? "md:mt-16" : ""}>
              <TourCard tour={t} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Browse by mood"
            title={<>Find your kind of trip.</>}
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
                <div className="aspect-[3/4]">
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
                  <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
              Single-day activities
            </p>
            <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              A morning, an afternoon, one perfect thing.
            </h2>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              Bookable stand-alone or added to any tour. Small groups, local
              guides, no filler.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href="/activities">Browse all activities</Link>
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
      <section className="border-y border-border bg-secondary/30 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-primary">
            What travelers say
          </p>
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative isolate mx-auto max-w-[110rem] overflow-hidden md:rounded-2xl">
        <Image
          src={ctaImg}
          alt="Open road through volcanic landscape"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-40">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80">
              Open bookings — 2026
            </p>
            <h2 className="text-balance font-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl">
              You have <em className="not-italic text-accent">two weeks</em>{" "}
              off. Spend them somewhere real.
            </h2>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-accent px-7 text-accent-foreground hover:opacity-90"
            >
              <Link href="/tours">
                Explore Tours <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
