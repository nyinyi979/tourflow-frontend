"use client";
import { useState } from "react";
import { Star, Clock, Check, MapPin, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getActivityById, activities } from "@/lib/mocks";
import Image from "next/image";
import Link from "next/link";

export default function ActivityDetailPage({ id }: { id: string }) {
  const activity = getActivityById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [guests, setGuests] = useState(2);

  const related = activities.filter((a) => a.id !== activity?.id).slice(0, 3);
  const total = (activity?.price || 0) * guests;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8 md:pt-16">
        <Link
          href="/activities"
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
        >
          ← All activities
        </Link>

        <div className="mt-6 grid gap-3 md:grid-cols-[2fr_1fr]">
          <button
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted md:aspect-[16/11]"
          >
            <Image
              src={
                activity?.images[activeImg] || "https://placehold.co/600x400"
              }
              alt={activity?.title || "title"}
              className="h-full w-full object-cover"
            />
          </button>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
            {activity?.images.slice(0, 3).map((img, i) => (
              <button
                key={i}
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
                  src={img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <article>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {activity?.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {activity?.duration} hours
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {activity?.rating.toFixed(1)}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
              {activity?.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90">
              {activity?.description}
            </p>
            {activity?.longDescription && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {activity.longDescription}
              </p>
            )}

            {activity?.highlights && activity.highlights.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                  What you'll do
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {activity?.highlights.map((h) => (
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
            )}

            {activity?.included && activity?.included.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                  What's included
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {activity?.included.map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-border/70 px-3 py-1.5 text-sm text-foreground/90"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activity?.meetingPoint && (
              <div className="mt-12 flex items-start gap-3 rounded-md border border-border/60 bg-secondary/40 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">
                    Meeting point
                  </div>
                  <div className="mt-1 text-sm text-foreground/90">
                    {activity?.meetingPoint}
                  </div>
                </div>
              </div>
            )}
          </article>

          <aside>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-lg border border-border/70 bg-card p-6 shadow-sm">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl text-primary">
                    ${activity?.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / person
                  </span>
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Guests
                  </label>
                  <div className="flex items-center justify-between rounded-md border border-input px-3 py-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {guests} {guests === 1 ? "person" : "people"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        −
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full"
                        onClick={() => setGuests(guests + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-base">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-xl">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <Button className="mt-6 w-full rounded-full" size="lg">
                  Reserve
                </Button>

                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Free cancellation up to 48 hours before
                </div>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 font-display text-3xl text-foreground md:text-4xl">
              More single-day experiences
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
                      src={a.images[0]}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{a.duration}h</span>
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
                    <span className="text-muted-foreground"> / person</span>
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
