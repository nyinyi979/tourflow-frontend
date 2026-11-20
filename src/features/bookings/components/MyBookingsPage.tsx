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
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <p className="label-mono text-muted-foreground">
        {t.eyebrow}
      </p>
      <h1 className="mt-2 text-display">{t.title}</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/75">
        {t.lead}
      </p>

      {bookings.length === 0 ? (
        <div className="mt-10 border border-dashed border-foreground/40 p-10 text-center">
          <p className="text-muted-foreground">{t.none}</p>
          <Button asChild className="mt-5">
            <Link href="/tours">{browseTours}</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 space-y-4 border-t border-foreground pt-8">{cards}</div>
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
    <article className="border border-foreground bg-card p-5 md:p-6">
      <div className="flex flex-wrap justify-between gap-5">
        <div>
          <p className="label-mono text-muted-foreground">
            {booking.bookingNumber}
          </p>
          <h2 className="mt-1 text-title">{itemName}</h2>
          <p className="label-mono mt-2 text-muted-foreground">
            {formatDate(booking.travelDate, locale)} ·{" "}
            {t.guests(booking.adults + booking.children)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-title text-foreground">
            ${booking.totalPrice.toLocaleString()}
          </p>
          <div className="mt-2 flex justify-end gap-2">
            <StatusBadge value={booking.status} />
            <StatusBadge value={booking.paymentStatus} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/25 pt-5">
        <p className="label-price text-muted-foreground">
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
    <span className="label-price rounded-[5px] border border-foreground px-2 py-0.5 text-foreground">
      {status[value] ?? value}
    </span>
  );
}
