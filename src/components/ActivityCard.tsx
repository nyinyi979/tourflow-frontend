import { Star, Clock, ArrowUpRight } from "lucide-react";
import type { Activity } from "@/lib/mocks";
import Link from "next/link";
import Image from "next/image";

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      href={"/activities/" + activity.id}
      className="group grid gap-4 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{activity.category}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {activity.duration}h
          </span>
          <span className="flex items-center gap-1 text-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {activity.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
          {activity.title}
          <ArrowUpRight className="ml-2 inline h-4 w-4 -translate-y-0.5 opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {activity.description}
        </p>
        <p className="mt-3 text-sm text-primary">
          <span className="font-display text-lg">${activity.price}</span>
          <span className="text-muted-foreground"> / person</span>
        </p>
      </div>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-muted sm:aspect-square sm:w-40 md:w-56">
        <Image
          src={activity.images[0]}
          alt={activity.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
