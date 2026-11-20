"use client";

import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Tour } from "@/features/tours/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createReview } from "../api";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { formatDate } from "@/lib/i18n/messages";

export default function ReviewsSection({ tour }: { tour: Tour }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useMessages().reviews;
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
    <section className="mt-24 md:mt-32">
      <h2 className="mb-10 border-b border-foreground pb-5 text-heading text-foreground">
        {t.title}
      </h2>
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[4rem] leading-none text-foreground">
              {tour.rating.toFixed(1)}
            </span>
            <span className="label-mono text-muted-foreground">{t.outOf}</span>
          </div>
          <div className="label-mono mt-3 text-muted-foreground">
            {t.basedOn(tour.reviewCount)}
          </div>
          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = buckets[star - 1];
              const pct = totalReviews ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="label-price flex items-center gap-3">
                  <span className="w-4 text-muted-foreground">{star}</span>
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <Progress value={pct} className="h-1 flex-1" />
                  <span className="w-6 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-8">
          <form
            className="mb-12 border border-foreground bg-card p-5 md:p-6"
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
            <h3 className="text-subheading">{t.share}</h3>
            <div className="mt-4 flex items-center gap-3">
              <span id="review-rating-label" className="label-mono text-muted-foreground">
                {t.rating}
              </span>
              <Select
                value={String(rating)}
                onValueChange={(value) => setRating(Number(value))}
              >
                <SelectTrigger
                  aria-labelledby="review-rating-label"
                  className="h-10 w-40"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {t.stars(value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              className="mt-4"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={t.placeholder}
              required
            />
            <div className="mt-4 flex items-center gap-4">
              <Button type="submit" disabled={reviewMutation.isPending}>
                {reviewMutation.isPending ? t.submitting : t.submit}
              </Button>
              {reviewMutation.isError && (
                <p className="text-sm text-destructive">
                  {reviewMutation.error instanceof Error
                    ? reviewMutation.error.message
                    : t.error}
                </p>
              )}
              {reviewMutation.isSuccess && (
                <p className="text-sm text-primary">{t.submitted}</p>
              )}
            </div>
          </form>

          {tour.reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">{t.none}</p>
          )}
          <ul className="border-t border-foreground">
          {tour.reviews.map((r) => (
            <li
              key={r.id}
              className="border-b border-foreground/20 py-7"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage
                    src={r.avatar ?? undefined}
                    alt={r.customerName}
                  />
                  <AvatarFallback>{r.customerName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-medium text-foreground">
                      {r.customerName}
                    </div>
                    <div className="label-price text-muted-foreground">
                      {formatDate(r.reviewedAt, locale)}
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
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-foreground/90">
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
