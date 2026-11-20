"use client";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import Link from "next/link";
import Image from "next/image";
import type { Activity } from "../types";

/** One row of the activities list: facts and price left, photograph right. */
export function ActivityCard({
  activity,
  index,
}: {
  activity: Activity;
  index?: number;
}) {
  const t = useMessages().common;
  return (
    <Link
      href={"/activities/" + activity.id}
      className="group grid gap-5 border-t border-foreground/25 py-6 first:border-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8 md:py-7"
    >
      <div className="flex min-w-0 gap-5">
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="label-mono hidden w-8 shrink-0 pt-1 text-muted-foreground sm:block"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0">
          <p className="label-mono flex flex-wrap items-center gap-x-3 text-muted-foreground">
            <span>{activity.category.label}</span>
            <span>{t.hoursShort(activity.duration)}</span>
            <span className="flex items-center gap-1">
              <span aria-hidden="true" className="text-accent">★</span>
              {activity.rating.toFixed(1)}
            </span>
          </p>
          <h3 className="mt-2 text-subheading font-medium text-foreground transition-colors group-hover:text-primary">
            {activity.title}
            <span
              aria-hidden="true"
              className="ml-2 inline-block text-base opacity-0 transition-[opacity,translate] duration-(--motion-base) group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              ↗
            </span>
          </h3>
          <p className="mt-2 line-clamp-2 max-w-lg text-[0.9375rem] leading-relaxed text-foreground/75">
            {activity.description}
          </p>
          <p className="label-price mt-4 text-foreground">
            ${activity.price.toLocaleString()}
            <span className="text-muted-foreground"> {t.perPerson}</span>
          </p>
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted sm:w-44 md:w-56">
        {activity.images[0] && (
          <Image
            src={activity.images[0].url}
            alt={activity.title}
            fill
            sizes="(min-width: 768px) 14rem, (min-width: 640px) 11rem, 100vw"
            className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
          />
        )}
      </div>
    </Link>
  );
}
