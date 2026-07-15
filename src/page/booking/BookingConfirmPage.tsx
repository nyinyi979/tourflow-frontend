import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getTourById, tours } from "@/mocks/mocks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const confirmationSchema = z.object({
  ref: z.string().default("WF-XXXXXX"),
  tourId: z.string().default(tours[0].id),
  date: z.string().optional(),
  adults: z.number().int().min(1).default(2),
  children: z.number().int().min(0).default(0),
});

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const ref = searchParams?.get("ref");
  const tourId = searchParams?.get("tourId");
  const date = searchParams?.get("date");
  const adults = Number(searchParams?.get("adults") || 0);
  const children = Number(searchParams?.get("children") || 0);
  const tour = getTourById(tourId || "") ?? tours[0];
  const guests = adults + children;

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center md:py-32">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary">
        Confirmed
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-5xl">
        You're going.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        A confirmation is on its way to your inbox. Reference number below —
        hold onto it.
      </p>

      <div className="mt-10 w-full rounded-lg border border-border/70 bg-card p-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Booking reference
          </span>
          <span className="font-display text-xl text-primary">{ref}</span>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <Row label="Tour" value={tour.title} />
          <Row label="Date" value={date ?? "To be scheduled"} />
          <Row
            label="Guests"
            value={`${guests} (${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""})`}
          />
        </dl>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full">
          <Link href="/tours">View my bookings</Link>
        </Button>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
