"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreditCard, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { payBooking } from "../api";
import { bookingDetailQueryOptions, bookingKeys } from "../queries";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { formatDate } from "@/lib/i18n/messages";

type PaymentForm = {
  name: string;
  cardNumber: string;
  expiry: string;
  securityCode: string;
};

const emptyForm: PaymentForm = {
  name: "",
  cardNumber: "",
  expiry: "",
  securityCode: "",
};

export default function PaymentPage() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const locale = useLocale();
  const m = useMessages();
  const t = m.payment;
  const queryClient = useQueryClient();
  const bookingQuery = useQuery(bookingDetailQueryOptions(id));
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentForm, string>>>(
    {},
  );
  const paymentMutation = useMutation({
    mutationFn: () => payBooking(id!, { paymentMethod: "card" }),
    onSuccess: (response) => {
      queryClient.setQueryData(bookingKeys.detail(id), response);
      queryClient.invalidateQueries({ queryKey: bookingKeys.mine() });
      router.replace(`/booking/confirmation?id=${id}`);
    },
  });

  useEffect(() => {
    if (id && bookingQuery.data?.data.paymentStatus === "paid") {
      router.replace(`/booking/confirmation?id=${id}`);
    }
  }, [bookingQuery.data, id, router]);

  const update = (field: keyof PaymentForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    const cardDigits = form.cardNumber.replace(/\D/g, "");

    if (!form.name.trim()) nextErrors.name = t.errName;
    if (cardDigits.length < 12) nextErrors.cardNumber = t.errCard;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      nextErrors.expiry = t.errExpiry;
    }
    if (!/^\d{3,4}$/.test(form.securityCode)) {
      nextErrors.securityCode = t.errCode;
    }

    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) paymentMutation.mutate();
  };

  if (!id || bookingQuery.isError) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-display">{t.unavailable}</h1>
        <Button className="mt-6" onClick={() => router.push("/bookings")}>
          {m.common.viewMyBookings}
        </Button>
      </main>
    );
  }

  if (!bookingQuery.data) {
    return <p className="py-24 text-center text-muted-foreground">{t.loading}</p>;
  }

  const booking = bookingQuery.data.data;
  if (booking.paymentStatus === "paid") {
    return null;
  }

  const itemName = booking.tour?.title ?? booking.activity?.title ?? t.booking;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
        <section>
          <p className="label-mono text-muted-foreground">{t.eyebrow}</p>
          <h1 className="mt-3 text-display">{t.title}</h1>
          <div className="label-price mt-6 flex items-center gap-3 border border-primary/30 bg-primary/5 p-4 leading-relaxed text-foreground/80">
            <LockKeyhole aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-primary" />
            {t.simulated}
          </div>

          <form className="mt-8 space-y-5 border-t border-foreground pt-8" onSubmit={submit} noValidate>
            <PaymentField
              id="card-name"
              label={t.nameOnCard}
              value={form.name}
              error={errors.name}
              onChange={(value) => update("name", value)}
            />
            <PaymentField
              id="card-number"
              label={t.cardNumber}
              value={form.cardNumber}
              error={errors.cardNumber}
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              onChange={(value) => update("cardNumber", value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <PaymentField
                id="expiry"
                label={t.expiry}
                value={form.expiry}
                error={errors.expiry}
                inputMode="numeric"
                placeholder="MM/YY"
                onChange={(value) => update("expiry", value)}
              />
              <PaymentField
                id="security-code"
                label={t.securityCode}
                value={form.securityCode}
                error={errors.securityCode}
                inputMode="numeric"
                placeholder="CVC"
                onChange={(value) => update("securityCode", value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={paymentMutation.isPending}
            >
              <CreditCard aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              {paymentMutation.isPending
                ? t.processing
                : t.pay(`$${booking.totalPrice.toLocaleString()}`)}
            </Button>
            {paymentMutation.isError && (
              <p className="text-sm text-destructive">
                {paymentMutation.error instanceof Error
                  ? paymentMutation.error.message
                  : t.failed}
              </p>
            )}
          </form>
        </section>

        <aside className="h-fit border border-foreground bg-card p-5 md:p-6">
          <p className="label-mono text-muted-foreground">{m.common.orderSummary}</p>
          <h2 className="mt-3 text-title">{itemName}</h2>
          <dl className="mt-6 space-y-3 border-b border-foreground pb-5 text-[0.9375rem]">
            <SummaryRow label={t.booking} value={booking.bookingNumber} />
            <SummaryRow
              label={t.travelDate}
              value={formatDate(booking.travelDate, locale)}
            />
            <SummaryRow
              label={m.common.guests}
              value={String(booking.adults + booking.children)}
            />
          </dl>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="text-subheading">{m.common.total}</span>
            <span className="text-heading text-foreground">
              ${booking.totalPrice.toLocaleString()}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}

function PaymentField({
  id,
  label,
  value,
  error,
  onChange,
  inputMode,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
