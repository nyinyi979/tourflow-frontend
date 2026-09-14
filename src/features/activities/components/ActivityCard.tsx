import { Star, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Activity } from "../types";

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      href={"/activities/" + activity.id}
      className="group grid gap-5 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{activity.category.label}</span>
          <span className="flex items-center gap-1">
            <Clock aria-hidden="true" className="h-3 w-3" />
            {activity.duration}h
          </span>
          <span className="flex items-center gap-1 text-foreground">
            <Star aria-hidden="true" className="h-3 w-3 fill-accent text-accent" />
            {activity.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
          {activity.title}
          <ArrowUpRight aria-hidden="true" className="ml-2 inline h-4 w-4 -translate-y-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
        </h3>
        <p className="mt-2 line-clamp-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {activity.description}
        </p>
        <p className="mt-3 text-sm text-primary">
          <span className="font-display text-lg">${activity.price}</span>
          <span className="text-muted-foreground"> / person</span>
        </p>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:aspect-square sm:w-40 md:w-56">
        {activity.images[0] && <Image
          src={activity.images[0].url}
          alt={activity.title}
          fill
          sizes="(min-width: 768px) 14rem, 100vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.035]"
        />}
      </div>
    </Link>
  );
}
