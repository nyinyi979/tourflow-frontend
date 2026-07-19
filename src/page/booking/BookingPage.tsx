"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createBooking } from "@/services/bookings";
import type { BookableItem, CreateBookingRequest } from "@/types/booking";

interface BookingPageProps {
  item: BookableItem;
  date: string;
  adults: number;
  childCount: number;
}

export default function BookingPage({
  item,
  date,
  adults,
  childCount,
}: BookingPageProps) {
  const router = useRouter();
  const guests = adults + childCount;
  const subtotal = item.price * adults + Math.round(item.price * 0.5) * childCount;

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (response) =>
      router.replace(`/booking/confirmation?id=${response.data.id}`),
  });

  const confirmBooking = () => {
    const common = { travelDate: date, adults, children: childCount };
    const request: CreateBookingRequest =
      item.itemType === "tour"
        ? { ...common, itemType: "tour", tourId: item.id }
        : { ...common, itemType: "activity", activityId: item.id };
    bookingMutation.mutate(request);
  };

  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">Booking</p>
      <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
        Review your selection
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-border/70">
          <div className="relative h-64 w-full bg-muted">
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="space-y-4 p-6">
            <h2 className="font-display text-2xl text-foreground">{item.title}</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Date" value={date} />
              <Detail label="Guests" value={String(guests)} />
              <Detail
                label="Duration"
                value={`${item.duration} ${item.itemType === "tour" ? "days" : "hours"}`}
              />
              <Detail label="Category" value={item.category} />
            </dl>
          </div>
        </div>

        <div>
          <OrderSummary
            total={subtotal}
            adults={adults}
            childrenCount={childCount}
            price={item.price}
          />
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Confirming creates the booking in your TourFlow account. You will be
            asked to log in if your session has expired.
          </p>
          <Button
            size="lg"
            className="mt-6 w-full rounded-full"
            onClick={confirmBooking}
            disabled={bookingMutation.isPending}
          >
            {bookingMutation.isPending
              ? "Confirming…"
              : `Confirm booking · $${subtotal.toLocaleString()}`}
          </Button>
          {bookingMutation.isError && (
            <p className="mt-3 text-sm text-destructive">
              {bookingMutation.error instanceof Error
                ? bookingMutation.error.message
                : "Unable to create booking"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 text-sm text-muted-foreground">
        <Link
          href={`/${item.itemType === "tour" ? "tours" : "activities"}/${item.id}`}
          className="hover:text-primary"
        >
          ← Back to {item.itemType}
        </Link>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}

function OrderSummary({
  total,
  adults,
  childrenCount,
  price,
}: {
  total: number;
  adults: number;
  childrenCount: number;
  price: number;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-card p-6">
      <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Order summary</h3>
      <dl className="mt-5 space-y-2 text-sm">
        <SummaryRow
          label={`$${price.toLocaleString()} × ${adults} adult${adults === 1 ? "" : "s"}`}
          value={`$${(price * adults).toLocaleString()}`}
        />
        {childrenCount > 0 && (
          <SummaryRow
            label={`$${Math.round(price * 0.5).toLocaleString()} × ${childrenCount} child${childrenCount === 1 ? "" : "ren"}`}
            value={`$${(Math.round(price * 0.5) * childrenCount).toLocaleString()}`}
          />
        )}
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-border/60 pt-4">
        <span className="text-sm text-foreground">Total</span>
        <span className="font-display text-2xl text-primary">${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
