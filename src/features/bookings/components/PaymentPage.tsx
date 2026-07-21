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

    if (!form.name.trim()) nextErrors.name = "Enter the name on the card";
    if (cardDigits.length < 12) nextErrors.cardNumber = "Enter a valid card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      nextErrors.expiry = "Use MM/YY";
    }
    if (!/^\d{3,4}$/.test(form.securityCode)) {
      nextErrors.securityCode = "Enter a valid security code";
    }

    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) paymentMutation.mutate();
  };

  if (!id || bookingQuery.isError) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Payment unavailable.</h1>
        <Button className="mt-6 rounded-full" onClick={() => router.push("/bookings")}>
          View my bookings
        </Button>
      </main>
    );
  }

  if (!bookingQuery.data) {
    return <p className="py-24 text-center text-muted-foreground">Loading payment…</p>;
  }

  const booking = bookingQuery.data.data;
  if (booking.paymentStatus === "paid") {
    return null;
  }

  const itemName = booking.tour?.title ?? booking.activity?.title ?? "Booking";

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <section>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Payment</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Complete your booking</h1>
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
            <LockKeyhole className="h-4 w-4 shrink-0 text-primary" />
            This is a simulated checkout. Your card details stay in this browser.
          </div>

          <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
            <PaymentField
              id="card-name"
              label="Name on card"
              value={form.name}
              error={errors.name}
              onChange={(value) => update("name", value)}
            />
            <PaymentField
              id="card-number"
              label="Card number"
              value={form.cardNumber}
              error={errors.cardNumber}
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              onChange={(value) => update("cardNumber", value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <PaymentField
                id="expiry"
                label="Expiry"
                value={form.expiry}
                error={errors.expiry}
                inputMode="numeric"
                placeholder="MM/YY"
                onChange={(value) => update("expiry", value)}
              />
              <PaymentField
                id="security-code"
                label="Security code"
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
              className="w-full rounded-full"
              disabled={paymentMutation.isPending}
            >
              <CreditCard className="h-4 w-4" />
              {paymentMutation.isPending
                ? "Processing payment…"
                : `Pay $${booking.totalPrice.toLocaleString()}`}
            </Button>
            {paymentMutation.isError && (
              <p className="text-sm text-destructive">
                {paymentMutation.error instanceof Error
                  ? paymentMutation.error.message
                  : "Payment could not be completed"}
              </p>
            )}
          </form>
        </section>

        <aside className="h-fit rounded-lg border border-border/70 bg-card p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Order summary</p>
          <h2 className="mt-3 font-display text-2xl">{itemName}</h2>
          <dl className="mt-6 space-y-3 border-b border-border/60 pb-5 text-sm">
            <SummaryRow label="Booking" value={booking.bookingNumber} />
            <SummaryRow label="Travel date" value={booking.travelDate} />
            <SummaryRow
              label="Guests"
              value={String(booking.adults + booking.children)}
            />
          </dl>
          <div className="mt-5 flex items-baseline justify-between">
            <span>Total</span>
            <span className="font-display text-3xl text-primary">
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
