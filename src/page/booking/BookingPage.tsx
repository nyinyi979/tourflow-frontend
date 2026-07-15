"use client"
import { useState } from "react";
import { z } from "zod";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { getTourById, tours } from "@/mocks/mocks";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const bookingSearchSchema = z.object({
  tourId: z.string().default(tours[0].id),
  date: z.string().optional(),
  adults: z.number().int().min(1).default(2),
  children: z.number().int().min(0).default(0),
  step: z.number().int().min(1).max(3).default(1),
});

type Guest = {
  name: string;
  email: string;
  phone: string;
  requests: string;
};

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ref = searchParams.get("ref");
  const tourId = searchParams.get("tourId");
  const date = searchParams.get("date");
  const adults = Number(searchParams.get("adults") || 0);
  const children = Number(searchParams.get("children") || 0);
  const tour = getTourById(tourId || "") ?? tours[0];
  const step = Number(searchParams.get("step") || 1);
  const guests = adults + children;
  const subtotal = 10;
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + taxes;

  const [guest, setGuest] = useState<Guest>({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Guest, string>>>(
    {},
  );

  const goToStep = (step: 1 | 2 | 3) =>
    router.replace(
      "/booking?ref=" +
        ref +
        "&step=" +
        step +
        "&tourId=" +
        tourId +
        "&date=" +
        date +
        "&adults=" +
        adults +
        "&children=" +
        children,
    );

  const validateGuest = () => {
    const e: Partial<Record<keyof Guest, string>> = {};
    if (!guest.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(guest.email)) e.email = "Enter a valid email";
    if (!/^[\d\s+()-]{7,}$/.test(guest.phone)) e.phone = "Enter a valid phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirmBooking = () => {
    const ref = "WF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    router.replace(
      "/booking/confirmation?ref=" +
        ref +
        "&tourId=" +
        tourId +
        "&date=" +
        date +
        "&adults=" +
        adults +
        "&children=" +
        children,
    );
  };

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
        <StepIndicator step={step} />

        {step === 1 && (
          <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h1 className="font-display text-3xl text-foreground md:text-4xl">
                Review your selection
              </h1>
              <div className="mt-8 overflow-hidden rounded-lg border border-border/70">
                <Image
                  src={tour.images[0]}
                  alt={tour.title}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-3 p-6">
                  <h2 className="font-display text-2xl text-foreground">
                    {tour.title}
                  </h2>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <Detail label="Date" value={date ?? "Not set"} />
                    <Detail label="Guests" value={`${guests}`} />
                    <Detail label="Duration" value={`${tour.duration} days`} />
                    <Detail label="Category" value={tour.category} />
                  </dl>
                </div>
              </div>
            </div>
            <div>
              <OrderSummary
                subtotal={subtotal}
                taxes={taxes}
                total={total}
                adults={adults}
                childrenCount={children}
                price={tour.price}
              />
              <Button
                size="lg"
                className="mt-6 w-full rounded-full"
                onClick={() => goToStep(2)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (validateGuest()) goToStep(3);
              }}
              noValidate
            >
              <h1 className="font-display text-3xl text-foreground md:text-4xl">
                Guest details
              </h1>
              <Field
                id="name"
                label="Full name"
                value={guest.name}
                onChange={(v) => setGuest({ ...guest, name: v })}
                error={errors.name}
              />
              <Field
                id="email"
                type="email"
                label="Email"
                value={guest.email}
                onChange={(v) => setGuest({ ...guest, email: v })}
                error={errors.email}
              />
              <Field
                id="phone"
                type="tel"
                label="Phone number"
                value={guest.phone}
                onChange={(v) => setGuest({ ...guest, phone: v })}
                error={errors.phone}
              />
              <div className="space-y-2">
                <Label htmlFor="requests">Special requests</Label>
                <Textarea
                  id="requests"
                  rows={4}
                  value={guest.requests}
                  onChange={(e) =>
                    setGuest({ ...guest, requests: e.target.value })
                  }
                  placeholder="Dietary, mobility, or anything we should know."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => goToStep(1)}
                >
                  Back
                </Button>
                <Button size="lg" type="submit" className="rounded-full">
                  Continue
                </Button>
              </div>
            </form>
            <OrderSummary
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              adults={adults}
              childrenCount={children}
              price={tour.price}
            />
          </div>
        )}

        {step === 3 && (
          <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h1 className="font-display text-3xl text-foreground md:text-4xl">
                Payment
              </h1>
              <div className="mt-8 rounded-lg border border-border/70 bg-card p-6">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Card details
                </div>
                <div className="space-y-3">
                  <div className="rounded-md border border-input bg-transparent px-3 py-3 text-sm text-muted-foreground">
                    1234 1234 1234 1234
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-input bg-transparent px-3 py-3 text-sm text-muted-foreground">
                      MM / YY
                    </div>
                    <div className="rounded-md border border-input bg-transparent px-3 py-3 text-sm text-muted-foreground">
                      CVC
                    </div>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  This is a demo. No card will be charged.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => goToStep(2)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={confirmBooking}
                >
                  Confirm and pay ${total.toLocaleString()}
                </Button>
              </div>
            </div>
            <OrderSummary
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              adults={adults}
              childrenCount={children}
              price={tour.price}
            />
          </div>
        )}

        <div className="mt-16 text-sm text-muted-foreground">
          <Link
            href={"/tours/" + tour.id}
            className="hover:text-primary"
          >
            ← Back to tour
          </Link>
        </div>
      </section>
    </>
  );
}

function StepIndicator({ step }: { step: number }) {
  const steps = ["Review", "Guest details", "Payment"];
  return (
    <ol className="flex items-center gap-3 md:gap-6">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <li key={label} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs",
                active && "border-primary bg-primary text-primary-foreground",
                done && "border-primary bg-primary/10 text-primary",
                !active && !done && "border-border text-muted-foreground",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : n}
            </span>
            <span
              className={cn(
                "hidden text-xs uppercase tracking-widest sm:inline",
                active || done ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Step {n} · {label}
            </span>
            {n < steps.length && (
              <span className="h-px flex-1 bg-border" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function OrderSummary({
  subtotal,
  taxes,
  total,
  adults,
  childrenCount,
  price,
}: {
  subtotal: number;
  taxes: number;
  total: number;
  adults: number;
  childrenCount: number;
  price: number;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-card p-6">
      <h3 className="text-xs uppercase tracking-[0.3em] text-primary">
        Order summary
      </h3>
      <dl className="mt-5 space-y-2 text-sm">
        <SummaryRow
          label={`$${price.toLocaleString()} × ${adults} adult${adults === 1 ? "" : "s"}`}
          value={`$${(price * adults).toLocaleString()}`}
        />
        {childrenCount > 0 && (
          <SummaryRow
            label={`$${(price / 2).toLocaleString()} × ${childrenCount} child${childrenCount === 1 ? "" : "ren"}`}
            value={`$${(price * childrenCount * 0.5).toLocaleString()}`}
          />
        )}
        <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString()}`} />
        <SummaryRow label="Taxes & fees" value={`$${taxes.toLocaleString()}`} />
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-border/60 pt-4">
        <span className="text-sm text-foreground">Total</span>
        <span className="font-display text-2xl text-primary">
          ${total.toLocaleString()}
        </span>
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
