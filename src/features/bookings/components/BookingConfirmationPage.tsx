"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
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
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">{t.unavailable}</h1>
        <Button asChild className="mt-6 rounded-full">
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
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center md:py-32">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary">
        {paid ? t.confirmed : t.pending}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
        {paid ? t.paidTitle : t.pendingTitle}
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        {paid ? t.paidBody : t.pendingBody}
      </p>

      <div className="mt-10 w-full rounded-lg border border-border/70 bg-card p-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {t.reference}
          </span>
          <span className="font-display text-xl text-primary">
            {booking.bookingNumber}
          </span>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
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
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/booking/payment?id=${booking.id}`}>{m.common.payNow}</Link>
          </Button>
        )}
        {paid && (
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">{t.backHome}</Link>
          </Button>
        )}
        <Button asChild size="lg" variant="outline" className="rounded-full">
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
