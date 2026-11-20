import Link from "next/link";
import { getMessages } from "@/lib/i18n/server";

export async function Footer() {
  const t = await getMessages();
  const f = t.footer;
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-360 px-4 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-14 md:grid-cols-[1.6fr_1fr_1fr] md:gap-10">
          <div className="max-w-xl">
            <h2 className="text-balance text-heading text-cream">{f.heading}</h2>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-cream/70">
              {f.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="mailto:hello@tourflow.travel"
                className="label-mono inline-flex h-11 items-center bg-accent px-5 text-accent-foreground transition-colors hover:bg-cream"
              >
                {f.email}
              </a>
              <Link
                href="/contact"
                className="label-mono inline-flex items-center gap-2 text-cream/80 underline decoration-cream/30 underline-offset-[6px] transition-colors hover:text-cream hover:decoration-cream"
              >
                {f.contactDetails} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <FooterCol
            title={f.explore}
            items={[
              { label: t.nav.tours, to: "/tours" },
              { label: t.nav.activities, to: "/activities" },
              { label: t.nav.myBookings, to: "/bookings" },
            ]}
          />
          <FooterCol
            title={f.company}
            items={[
              { label: t.nav.about, to: "/about" },
              { label: t.nav.contact, to: "/contact" },
              { label: f.customerAccount, to: "/account" },
            ]}
          />
        </div>

      </div>

      <div className="mt-16 border-t border-cream/40 md:mt-24">
        <div className="label-price mx-auto flex max-w-360 flex-col items-start justify-between gap-2 px-4 py-6 text-cream/60 sm:flex-row sm:items-center md:px-8">
          <p>{f.rights(new Date().getFullYear())}</p>
          <p>{f.place}</p>
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
      <h3 className="label-mono border-b border-cream/40 pb-3 text-cream/60">
        {title}
      </h3>
      <ul>
        {items.map((it) => (
          <li key={it.label} className="border-b border-cream/15">
            <Link
              href={it.to}
              className="group flex items-center justify-between py-3 text-subheading text-cream/85 transition-colors hover:text-cream"
            >
              {it.label}
              <span
                aria-hidden="true"
                className="text-base text-cream/40 transition-colors group-hover:text-accent"
              >
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
