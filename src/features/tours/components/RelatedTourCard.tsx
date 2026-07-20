import type { Tour } from "../types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RelatedCard({ tour }: { tour: Tour }) {
  return (
    <Link href={"/tours/" + tour.id} className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
        {tour.images[0] && (
          <Image
            src={tour.images[0].url}
            alt={tour.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{tour.duration} days</span>
        <span className="flex items-center gap-1 text-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {tour.rating.toFixed(1)}
        </span>
      </div>
      <h3 className="mt-2 font-display text-xl leading-tight text-foreground group-hover:text-primary">
        {tour.title}
      </h3>
      <p className="mt-2 text-sm text-primary">
        ${tour.price.toLocaleString()}{" "}
        <span className="text-muted-foreground">/ person</span>
      </p>
    </Link>
  );
}
