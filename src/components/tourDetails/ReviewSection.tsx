import { Tour } from "@/lib/mocks";
import { Star } from "lucide-react";
import { useMemo } from "react";
import { Progress } from "../ui/Progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { cn } from "@/lib/utils";

export default function ReviewsSection({ tour }: { tour: Tour }) {
  const buckets = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    tour.reviews.forEach((r) => {
      counts[Math.min(4, Math.max(0, r.rating - 1))]++;
    });
    return counts;
  }, [tour.reviews]);
  const totalReviews = tour.reviews.length;

  return (
    <section className="mt-24 border-t border-border/60 pt-16">
      <h2 className="mb-10 font-display text-3xl text-foreground md:text-4xl">
        Reviews
      </h2>
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-6xl text-primary">
              {tour.rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Based on {tour.reviewCount} reviews
          </div>
          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = buckets[star - 1];
              const pct = totalReviews ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-4 text-muted-foreground">{star}</span>
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <Progress value={pct} className="h-1.5 flex-1" />
                  <span className="w-6 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <ul className="space-y-8">
          {tour.reviews.map((r) => (
            <li
              key={r.id}
              className="border-b border-border/50 pb-8 last:border-0"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={r.avatar} alt={r.name} />
                  <AvatarFallback>{r.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-medium text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.date}
                    </div>
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < r.rating
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/30",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    {r.comment}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
