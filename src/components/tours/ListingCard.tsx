import { Difficulty, Tour } from "@/lib/mocks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ArrowRight, Star } from "lucide-react";

export default function ListingCard({ tour }: { tour: Tour }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={"/tours/" + tour.id}
        className="relative block aspect-[4/5] overflow-hidden rounded-md bg-muted"
      >
        <Image
          src={tour.images[0]}
          alt={tour.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs uppercase tracking-widest text-foreground backdrop-blur">
          {tour.category}
        </div>
      </Link>
      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{tour.duration} days</span>
        <span className="flex items-center gap-1 text-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
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
          <span className="text-xs text-muted-foreground">/ person</span>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${difficultyBadgeClass(tour.difficulty)}`}
        >
          {tour.difficulty === "Challenging" ? "Hard" : tour.difficulty}
        </span>
      </div>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="mt-5 w-full rounded-full"
      >
        <Link href={"/tours/" + tour.id}>
          View details <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </article>
  );
}

function difficultyBadgeClass(d: Difficulty) {
  switch (d) {
    case "Easy":
      return "bg-secondary text-secondary-foreground";
    case "Moderate":
      return "bg-accent/20 text-foreground";
    case "Challenging":
      return "bg-primary/10 text-primary";
  }
}
