import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-8 md:py-20">
        <div className="max-w-xl">
          <Link
            href="/"
            aria-label="TourFlow home"
            className="font-display text-3xl tracking-tight"
          >
            TourFlow<span className="text-accent">.</span>
          </Link>
          <h2 className="mt-8 max-w-lg text-balance font-display text-3xl leading-tight tracking-[-0.03em] text-cream sm:text-4xl">
            Unsure where to go? Tell us how you want the trip to feel.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            We arrange small-group tours and single-day activities for people
            who value quiet places, careful planning, and the long way in.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="mailto:hello@tourflow.travel">
                <Mail aria-hidden="true" /> Email our trip planners
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full text-cream hover:bg-cream/10 hover:text-cream"
            >
              <Link href="/contact">
                Contact details <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { label: "Tours", to: "/tours" },
            { label: "Activities", to: "/activities" },
            { label: "My bookings", to: "/bookings" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
            { label: "Customer account", to: "/account" },
          ]}
        />
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-cream/60 sm:flex-row sm:items-center md:px-8">
          <p>
            © {new Date().getFullYear()} TourFlow Travel Co. All rights reserved.
          </p>
          <p>Lisbon · Portugal</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
        {title}
      </h3>
      <ul className="space-y-3 text-sm text-cream/80">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.to}
              className="underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
