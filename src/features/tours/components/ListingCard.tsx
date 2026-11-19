"use client";
import Image from "next/image";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import type { Tour } from "../types";

export default function ListingCard({ tour }: { tour: Tour }) {
  const t = useMessages().common;
  return (
    <article className="group flex flex-col">
      <Link
        href={"/tours/" + tour.id}
        aria-label={t.view(tour.title)}
        className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        {tour.images[0] && (
          <Image
            src={tour.images[0].url}
            alt={tour.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.035]"
          />
        )}
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs uppercase tracking-widest text-foreground backdrop-blur">
          {tour.category.label}
        </div>
      </Link>
      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{t.days(tour.duration)}</span>
        <span className="flex items-center gap-1 text-foreground">
          <Star aria-hidden="true" className="h-3.5 w-3.5 fill-accent text-accent" />
          {tour.rating.toFixed(1)}
        </span>
      </div>
      <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
        <Link href={"/tours/" + tour.id} className="hover:text-primary">
          {tour.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {tour.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-xl text-primary">
            ${tour.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">{t.perPerson}</span>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${difficultyBadgeClass(tour.difficulty)}`}
        >
          {t.difficultyShort[tour.difficulty] ?? tour.difficulty}
        </span>
      </div>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="mt-5 w-full rounded-full"
      >
        <Link href={"/tours/" + tour.id}>
          {t.viewDetails} <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </article>
  );
}

function difficultyBadgeClass(d: string) {
  switch (d) {
    case "Easy":
      return "bg-secondary text-secondary-foreground";
    case "Moderate":
      return "bg-accent/20 text-foreground";
    case "Challenging":
      return "bg-primary/10 text-primary";
  }
}
