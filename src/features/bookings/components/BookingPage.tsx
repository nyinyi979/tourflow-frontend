"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { hasCustomerSession } from "@/lib/customerAuth";
import { getAuthPath } from "@/lib/redirects";
import { createBooking } from "../api";
import type { BookableItem, CreateBookingRequest } from "../types";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { formatDate } from "@/lib/i18n/messages";

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
  const locale = useLocale();
  const m = useMessages();
  const t = m.booking;
  const guests = adults + childCount;
  const subtotal = item.price * adults + Math.round(item.price * 0.5) * childCount;

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (response) =>
      router.push(`/booking/payment?id=${response.data.id}`),
  });

  const confirmBooking = () => {
    if (!hasCustomerSession()) {
      const next = `${window.location.pathname}${window.location.search}`;
      router.push(getAuthPath("/register", next));
      return;
    }

    const common = { travelDate: date, adults, children: childCount };
    const request: CreateBookingRequest =
      item.itemType === "tour"
        ? { ...common, itemType: "tour", tourId: item.id }
        : { ...common, itemType: "activity", activityId: item.id };
    bookingMutation.mutate(request);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <p className="label-mono text-muted-foreground">{t.eyebrow}</p>
      <h1 className="mt-3 text-display text-foreground">
        {t.title}
      </h1>

      <div className="mt-10 grid gap-10 border-t border-foreground pt-8 md:grid-cols-[1.4fr_1fr] md:gap-8">
        <div className="overflow-hidden border border-foreground">
          <div className="relative aspect-[16/9] w-full bg-muted">
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
          <div className="space-y-5 border-t border-foreground p-5 md:p-6">
            <h2 className="text-title text-foreground">{item.title}</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-[0.9375rem]">
              <Detail label={m.common.date} value={formatDate(date, locale)} />
              <Detail label={m.common.guests} value={String(guests)} />
              <Detail
                label={m.common.duration}
                value={
                  item.itemType === "tour"
                    ? m.common.days(item.duration)
                    : m.common.hours(item.duration)
                }
              />
              <Detail label={m.common.category} value={item.category} />
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
          <p className="label-price mt-4 leading-relaxed text-muted-foreground">
            {t.note}
          </p>
          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={confirmBooking}
            disabled={bookingMutation.isPending}
          >
            {bookingMutation.isPending
              ? t.creating
              : t.continue(`$${subtotal.toLocaleString()}`)}
          </Button>
          {bookingMutation.isError && (
            <p className="mt-3 text-sm text-destructive">
              {bookingMutation.error instanceof Error
                ? bookingMutation.error.message
                : t.error}
            </p>
          )}
        </div>
      </div>

      <div className="label-mono mt-12 text-muted-foreground">
        <Link
          href={`/${item.itemType === "tour" ? "tours" : "activities"}/${item.id}`}
          className="hover:text-foreground"
        >
          {t.back(item.itemType)}
        </Link>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-mono text-muted-foreground">{label}</dt>
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
  const m = useMessages();
  return (
    <div className="border border-foreground bg-card p-6">
      <h3 className="label-mono text-muted-foreground">{m.common.orderSummary}</h3>
      <dl className="mt-5 space-y-2 text-[0.9375rem]">
        <SummaryRow
          label={m.booking.adultLine(`$${price.toLocaleString()}`, adults)}
          value={`$${(price * adults).toLocaleString()}`}
        />
        {childrenCount > 0 && (
          <SummaryRow
            label={m.booking.childLine(
              `$${Math.round(price * 0.5).toLocaleString()}`,
              childrenCount,
            )}
            value={`$${(Math.round(price * 0.5) * childrenCount).toLocaleString()}`}
          />
        )}
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-foreground pt-4">
        <span className="text-subheading text-foreground">{m.common.total}</span>
        <span className="text-title text-foreground">${total.toLocaleString()}</span>
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
