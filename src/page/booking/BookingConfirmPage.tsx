"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getBookingById } from "@/services/bookings";

export default function BookingConfirmationPage() {
  const id = useSearchParams().get("id");
  const bookingQuery = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id!),
    enabled: !!id,
    retry: false,
  });

  if (!id || bookingQuery.isError) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Booking unavailable.</h1>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/tours">Browse tours</Link>
        </Button>
      </section>
    );
  }
  if (!bookingQuery.data) {
    return <p className="py-24 text-center">Loading booking…</p>;
  }

  const booking = bookingQuery.data.data;
  const guests = booking.guests.adults + booking.guests.children;
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center md:py-32">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary">Confirmed</p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">You&apos;re going.</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">Your booking has been created. Keep the reference number below.</p>
      <div className="mt-10 w-full rounded-lg border border-border/70 bg-card p-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4"><span className="text-xs uppercase tracking-widest text-muted-foreground">Booking reference</span><span className="font-display text-xl text-primary">{booking.bookingNumber}</span></div>
        <dl className="mt-4 space-y-3 text-sm">
          <Row label="Item" value={booking.tour.name} />
          <Row label="Date" value={booking.travelDate} />
          <Row label="Guests" value={`${guests} (${booking.guests.adults} adult${booking.guests.adults === 1 ? "" : "s"}${booking.guests.children ? `, ${booking.guests.children} child${booking.guests.children === 1 ? "" : "ren"}` : ""})`} />
          <Row label="Total" value={`$${booking.totalPrice.toLocaleString()}`} />
        </dl>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="rounded-full"><Link href="/">Back to home</Link></Button><Button asChild size="lg" variant="outline" className="rounded-full"><Link href="/account">View my bookings</Link></Button></div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-baseline justify-between gap-4"><dt className="text-muted-foreground">{label}</dt><dd className="text-right text-foreground">{value}</dd></div>;
}
