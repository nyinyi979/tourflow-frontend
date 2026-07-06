import { Star } from "lucide-react";
import type { Tour } from "@/lib/mocks";
import Image from "next/image";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
        <Image
          src={tour.images[0]}
          alt={tour.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs uppercase tracking-widest text-foreground backdrop-blur">
          {tour.category}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{tour.duration} days</span>
        <span className="flex items-center gap-1 text-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {tour.rating.toFixed(1)}
        </span>
      </div>
      <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
        {tour.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {tour.description}
      </p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-xl text-primary">
          ${tour.price.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">/ person</span>
      </div>
    </article>
  );
}
