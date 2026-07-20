"use client";

import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/Progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import type { Tour } from "@/features/tours/types";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { createReview } from "../api";

export default function ReviewsSection({ tour }: { tour: Tour }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      setComment("");
      setRating(5);
      router.refresh();
    },
  });
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

        <div>
          <form
            className="mb-10 rounded-lg border border-border/70 bg-card p-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (!comment.trim()) return;
              reviewMutation.mutate({
                tourId: tour.id,
                rating,
                comment: comment.trim(),
              });
            }}
          >
            <h3 className="font-display text-xl">Share your experience</h3>
            <label className="mt-4 block text-sm text-muted-foreground">
              Rating
              <select
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="ml-3 rounded-md border border-input bg-background px-3 py-2 text-foreground"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} star{value === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </label>
            <Textarea
              className="mt-4"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="What stood out about your trip?"
              required
            />
            <div className="mt-4 flex items-center gap-4">
              <Button type="submit" disabled={reviewMutation.isPending}>
                {reviewMutation.isPending ? "Submitting…" : "Submit review"}
              </Button>
              {reviewMutation.isError && (
                <p className="text-sm text-destructive">
                  {reviewMutation.error instanceof Error
                    ? reviewMutation.error.message
                    : "Unable to submit review"}
                </p>
              )}
              {reviewMutation.isSuccess && (
                <p className="text-sm text-primary">Review submitted.</p>
              )}
            </div>
          </form>

          {tour.reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
          <ul className="space-y-8">
          {tour.reviews.map((r) => (
            <li
              key={r.id}
              className="border-b border-border/50 pb-8 last:border-0"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={r.avatar ?? undefined} alt={r.name} />
                  <AvatarFallback>{r.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-medium text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(r.date).toLocaleDateString()}
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
      </div>
    </section>
  );
}
