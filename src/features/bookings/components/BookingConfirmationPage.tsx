"use client";

import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { bookingDetailQueryOptions } from "../queries";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { formatDate } from "@/lib/i18n/messages";

export default function BookingConfirmationPage() {
  const id = useSearchParams().get("id");
  const bookingQuery = useQuery(bookingDetailQueryOptions(id));
  const locale = useLocale();
  const m = useMessages();
  const t = m.confirmation;

  if (!id || bookingQuery.isError) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-display">{t.unavailable}</h1>
        <Button asChild className="mt-6">
          <Link href="/tours">{m.common.browseTours}</Link>
        </Button>
      </section>
    );
  }

  if (!bookingQuery.data) {
    return <p className="py-24 text-center">{t.loading}</p>;
  }

  const booking = bookingQuery.data.data;
  const paid = booking.paymentStatus === "paid";
  const itemName = booking.tour?.title ?? booking.activity?.title ?? t.deleted;

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center md:py-28">
      <div className="grid h-14 w-14 place-items-center rounded-full border border-foreground bg-card text-primary">
        <Check aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />
      </div>
      <p className="mt-6 label-mono text-muted-foreground">
        {paid ? t.confirmed : t.pending}
      </p>
      <h1 className="mt-3 text-display text-foreground">
        {paid ? t.paidTitle : t.pendingTitle}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/75">
        {paid ? t.paidBody : t.pendingBody}
      </p>

      <div className="mt-10 w-full border border-foreground bg-card text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground px-5 py-4 md:px-6">
          <span className="label-mono text-muted-foreground">
            {t.reference}
          </span>
          <span className="text-subheading text-foreground">
            {booking.bookingNumber}
          </span>
        </div>
        <dl className="space-y-3 p-5 text-[0.9375rem] md:px-6">
          <Row label={t.item} value={itemName} />
          <Row label={m.common.date} value={formatDate(booking.travelDate, locale)} />
          <Row
            label={m.common.guests}
            value={t.guestSummary(booking.adults, booking.children)}
          />
          <Row label={m.common.total} value={`$${booking.totalPrice.toLocaleString()}`} />
          <Row
            label={t.payment}
            value={m.common.status[booking.paymentStatus] ?? booking.paymentStatus}
          />
          {booking.paymentReference && (
            <Row label={t.paymentReference} value={booking.paymentReference} />
          )}
        </dl>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {!paid && (
          <Button asChild size="lg" >
            <Link href={`/booking/payment?id=${booking.id}`}>{m.common.payNow}</Link>
          </Button>
        )}
        {paid && (
          <Button asChild size="lg" >
            <Link href="/">{t.backHome}</Link>
          </Button>
        )}
        <Button asChild size="lg" variant="outline" >
          <Link href="/bookings">{m.common.viewMyBookings}</Link>
        </Button>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right capitalize text-foreground">{value}</dd>
    </div>
  );
}
