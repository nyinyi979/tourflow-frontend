"use client";
import { useState } from "react";
import { Star, Clock, Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
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
  const [activeImg, setActiveImg] = useState(0);
  const m = useMessages();
  const t = m.activities;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8 md:pt-16">
        <Link
          href="/activities"
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
        >
          {t.back}
        </Link>

        <div className="mt-6 grid gap-3 md:grid-cols-[2fr_1fr]">
          <button
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted md:aspect-[16/11]"
          >
            <Image
              src={
                activity.images[activeImg]?.url || "https://placehold.co/600x400"
              }
              alt={activity.title}
              fill
              sizes="(min-width: 768px) 67vw, 100vw"
              className="object-cover"
            />
          </button>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
            {activity.images.slice(0, 3).map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImg(i)}
                className={cn(
                  "relative object-contain object-center overflow-hidden rounded-md bg-muted transition-opacity ",
                  activeImg === i
                    ? "ring-2 ring-primary"
                    : "opacity-90 hover:opacity-100",
                )}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 17vw, 33vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <article>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {activity.category.label}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {m.common.hours(activity.duration)}
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {activity.rating.toFixed(1)}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
              {activity.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90">
              {activity.description}
            </p>
            {activity.longDescription && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {activity.longDescription}
              </p>
            )}

            {activity.highlights.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                  {t.whatYouDo}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {activity.highlights.map((highlight) => (
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
            )}

            {activity.included.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                  {t.included}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {activity.included.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-full border border-border/70 px-3 py-1.5 text-sm text-foreground/90"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activity.meetingPoint && (
              <div className="mt-12 flex items-start gap-3 rounded-md border border-border/60 bg-secondary/40 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">
                    {t.meetingPoint}
                  </div>
                  <div className="mt-1 text-sm text-foreground/90">
                    {activity.meetingPoint}
                  </div>
                </div>
              </div>
            )}
          </article>

          <ActivityBookingCard activity={activity} />
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 font-display text-3xl text-foreground md:text-4xl">
              {t.more}
            </h2>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={"/activities/" + a.id}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                    <Image
                      src={a.images[0]?.url || "https://placehold.co/600x400"}
                      alt={a.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{m.common.hoursShort(a.duration)}</span>
                    <span className="flex items-center gap-1 text-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {a.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-foreground group-hover:text-primary">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-primary">
                    <span className="font-display text-base">${a.price}</span>
                    <span className="text-muted-foreground"> {m.common.perPerson}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
