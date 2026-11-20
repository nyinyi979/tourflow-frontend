"use client";
import type { Tour } from "../types";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

/**
 * Gazette card: the photograph first and full-bleed, then the name with the
 * price set right, then a mono line of facts. No frame, no shadow.
 */
export function TourCard({
  tour,
  variant = "default",
  badge,
  showDescription = false,
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority = false,
}: {
  tour: Tour;
  variant?: "default" | "wide";
  badge?: string;
  showDescription?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const t = useMessages().common;
  const href = `/tours/${tour.id}`;
  const wide = variant === "wide";

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        aria-label={t.view(tour.title)}
        className={cn(
          "relative block overflow-hidden bg-muted",
          wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]" : "aspect-[4/5]",
        )}
      >
        {tour.images[0] && (
          <Image
            src={tour.images[0].url}
            alt={tour.title}
            fill
            sizes={wide ? "100vw" : sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.025]"
          />
        )}
        <span className="tag absolute left-2.5 top-2.5">
          {badge ? (
            <>
              <span aria-hidden="true">•</span> {badge}
            </>
          ) : (
            tour.category.label
          )}
        </span>
      </Link>

      <div
        className={cn(
          "mt-4 flex items-baseline justify-between gap-4",
          wide && "md:mt-5",
        )}
      >
        <h3
          className={cn(
            "min-w-0 font-medium text-foreground",
            wide ? "text-title md:text-heading md:font-normal" : "text-subheading",
          )}
        >
          <Link href={href} className="transition-colors hover:text-primary">
            {tour.title}
          </Link>
        </h3>
        <p className="label-price shrink-0 text-right text-foreground">
          ${tour.price.toLocaleString()}
          <span className="text-muted-foreground"> {t.perPerson}</span>
        </p>
      </div>

      <p className="label-mono mt-2.5 flex flex-wrap items-center gap-x-3 text-muted-foreground">
        {badge && <span>{tour.category.label}</span>}
        <span>{t.days(tour.duration)}</span>
        <span className="flex items-center gap-1">
          <span aria-hidden="true" className="text-accent">★</span>
          {tour.rating.toFixed(1)}
        </span>
        {t.difficultyShort[tour.difficulty] && (
          <span>{t.difficultyShort[tour.difficulty]}</span>
        )}
      </p>

      {showDescription && (
        <p className="mt-3 line-clamp-2 max-w-xl text-[0.9375rem] leading-relaxed text-foreground/75">
          {tour.description}
        </p>
      )}
    </article>
  );
}
