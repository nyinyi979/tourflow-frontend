"use client";
import Image from "next/image";
import Link from "next/link";
import { DetailGallery, DetailSection } from "@/components/DetailGallery";
import ActivityBookingCard from "./ActivityBookingCard";
import type { Activity } from "../types";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function ActivityDetailPage({
  activity,
  related,
}: {
  activity: Activity;
  related: Activity[];
}) {
  const m = useMessages();
  const t = m.activities;

  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-8 md:px-8 md:pb-32 md:pt-12">
      <nav className="label-mono flex flex-wrap items-center gap-2 text-muted-foreground">
        <Link href="/activities" className="hover:text-foreground">
          {m.nav.activities}
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/activities?categoryId=${activity.categoryId}`}
          className="hover:text-foreground"
        >
          {activity.category.label}
        </Link>
      </nav>

      <header className="mt-6 grid gap-6 pb-8 md:grid-cols-12 md:gap-8 md:pb-10">
        <h1 className="text-balance text-display text-foreground md:col-span-8">
          {activity.title}
        </h1>
        <ul className="label-mono flex flex-wrap items-center gap-x-5 gap-y-2 self-end text-foreground md:col-span-4 md:justify-end">
          <li>{m.common.hours(activity.duration)}</li>
          <li>
            <span aria-hidden="true" className="text-accent">★</span>{" "}
            {activity.rating.toFixed(1)}
          </li>
        </ul>
      </header>

      <DetailGallery images={activity.images} title={activity.title} max={4} />

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <article className="lg:col-span-7">
          <p className="text-title text-foreground/90 md:text-[1.375rem] md:leading-[1.45]">
            {activity.description}
          </p>
          {activity.longDescription && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75">
              {activity.longDescription}
            </p>
          )}

          {activity.highlights.length > 0 && (
            <DetailSection title={t.whatYouDo}>
              <ul className="grid sm:grid-cols-2 sm:gap-x-8">
                {activity.highlights.map((highlight, i) => (
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

          {activity.included.length > 0 && (
            <DetailSection title={t.included}>
              <ul className="flex flex-wrap gap-2">
                {activity.included.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-[5px] border border-foreground px-3 py-1.5 text-sm text-foreground"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {activity.meetingPoint && (
            <DetailSection title={t.meetingPoint}>
              <p className="text-subheading text-foreground">
                {activity.meetingPoint}
              </p>
            </DetailSection>
          )}
        </article>

        <div className="lg:col-span-4 lg:col-start-9">
          <ActivityBookingCard activity={activity} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <h2 className="border-b border-foreground pb-5 text-heading text-foreground">
            {t.more}
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.id}
                href={"/activities/" + a.id}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={a.images[0]?.url || "https://placehold.co/600x400"}
                    alt={a.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.025]"
                  />
                  <span className="tag absolute left-2.5 top-2.5">
                    {a.category.label}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-subheading font-medium text-foreground transition-colors group-hover:text-primary">
                    {a.title}
                  </h3>
                  <p className="label-price shrink-0 text-foreground">
                    ${a.price.toLocaleString()}
                    <span className="text-muted-foreground"> {m.common.perPerson}</span>
                  </p>
                </div>
                <p className="label-mono mt-2.5 flex gap-3 text-muted-foreground">
                  <span>{m.common.hoursShort(a.duration)}</span>
                  <span>
                    <span aria-hidden="true" className="text-accent">★</span>{" "}
                    {a.rating.toFixed(1)}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
