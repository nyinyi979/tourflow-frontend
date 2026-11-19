"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import {
  hasCustomerSession,
  subscribeCustomerSession,
} from "@/lib/customerAuth";
import { updateBooking } from "../api";
import { bookingKeys, myBookingsQueryOptions } from "../queries";
import type { Booking } from "../types";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { formatDate } from "@/lib/i18n/messages";

export default function MyBookingsPage() {
  const router = useRouter();
  const t = useMessages().myBookings;
  const browseTours = useMessages().common.browseTours;
  const queryClient = useQueryClient();
  const authenticated = useSyncExternalStore(
    subscribeCustomerSession,
    hasCustomerSession,
    () => false,
  );
  const bookingsQuery = useQuery(myBookingsQueryOptions(authenticated));
  const cancelMutation = useMutation({
    mutationFn: (id: string) => updateBooking(id, { status: "cancelled" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.mine() });
    },
  });

  useEffect(() => {
    if (!authenticated) router.replace("/login?next=/bookings");
  }, [authenticated, router]);

  if (!authenticated) return null;
  if (bookingsQuery.isError) {
    return (
      <p className="py-24 text-center text-destructive">
        {t.loadError}
      </p>
    );
  }
  if (!bookingsQuery.data) {
    return (
      <p className="py-24 text-center text-muted-foreground">
        {t.loading}
      </p>
    );
  }

  const bookings = bookingsQuery.data.data;
  const cards: React.ReactNode[] = [];

  for (const booking of bookings) {
    cards.push(
      <BookingCard
        key={booking.id}
        booking={booking}
        cancelling={
          cancelMutation.isPending && cancelMutation.variables === booking.id
        }
        onCancel={() => cancelMutation.mutate(booking.id)}
      />,
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">
        {t.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">{t.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {t.lead}
      </p>

      {bookings.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border/70 p-10 text-center">
          <p className="text-muted-foreground">{t.none}</p>
          <Button asChild className="mt-5 rounded-full">
            <Link href="/tours">{browseTours}</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 space-y-5">{cards}</div>
      )}
    </main>
  );
}

function BookingCard({
  booking,
  cancelling,
  onCancel,
}: {
  booking: Booking;
  cancelling: boolean;
  onCancel: () => void;
}) {
  const locale = useLocale();
  const m = useMessages();
  const t = m.myBookings;
  const itemName =
    booking.tour?.title ?? booking.activity?.title ?? m.confirmation.deleted;
  const canCancel =
    booking.status !== "cancelled" && booking.status !== "completed";

  return (
    <article className="rounded-lg border border-border/70 bg-card p-6">
      <div className="flex flex-wrap justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-primary">
            {booking.bookingNumber}
          </p>
          <h2 className="mt-1 font-display text-2xl">{itemName}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatDate(booking.travelDate, locale)} ·{" "}
            {t.guests(booking.adults + booking.children)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-primary">
            ${booking.totalPrice.toLocaleString()}
          </p>
          <div className="mt-2 flex gap-2">
            <StatusBadge value={booking.status} />
            <StatusBadge value={booking.paymentStatus} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
        <p className="text-xs text-muted-foreground">
          {booking.paymentReference
            ? t.paymentReference(booking.paymentReference)
            : t.paymentRequired}
        </p>
        <div className="flex gap-3">
          {booking.paymentStatus !== "paid" && booking.status !== "cancelled" && (
            <Button asChild size="sm">
              <Link href={`/booking/payment?id=${booking.id}`}>
                {m.common.payNow}
              </Link>
            </Button>
          )}
          {canCancel && (
            <Button
              size="sm"
              variant="outline"
              disabled={cancelling}
              onClick={onCancel}
            >
              {cancelling ? t.cancelling : t.cancel}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ value }: { value: string }) {
  const status = useMessages().common.status;
  return (
    <span className="rounded-full bg-secondary px-3 py-1 text-xs capitalize">
      {status[value] ?? value}
    </span>
  );
}
