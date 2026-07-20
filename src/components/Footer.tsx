import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <span className="font-display text-2xl tracking-tight">
            TourFlow<span className="text-primary">.</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Small-group tours and single-day activities for people who prefer
            somewhere quiet, well-planned, and worth the trip.
          </p>
          <div className="mt-6 flex max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Newsletter coming soon"
              className="rounded-full bg-background"
              disabled
            />
            <Button type="button" className="rounded-full" disabled>
              Subscribe
            </Button>
          </div>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { label: "Tours", to: "/tours" },
            { label: "Activities", to: "/activities" },
            { label: "Categories", to: "/tours" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
            { label: "Journal", to: "/about" },
          ]}
        />
        <FooterCol
          title="Support"
          items={[
            { label: "Help center", to: "/contact" },
            { label: "Booking terms", to: "/about" },
            { label: "Privacy", to: "/about" },
          ]}
        />
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-8">
          <p>
            © {new Date().getFullYear()} TourFlow Travel Co. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-foreground">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
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
      <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-foreground">
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it.label}>
            <Link href={it.to} className="hover:text-foreground">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
