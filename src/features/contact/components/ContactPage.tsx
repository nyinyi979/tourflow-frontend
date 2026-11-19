import ContactForm from "./ContactForm";
import { getMessages } from "@/lib/i18n/server";

export default async function ContactPage() {
  const t = (await getMessages()).contact;
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
        <div>
          <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] text-foreground md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t.eyebrow}
          </p>
          <div className="mt-10 space-y-6 text-sm text-muted-foreground">
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground">
                {t.studio}
              </div>
              <p className="mt-1">{t.address}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground">
                {t.email}
              </div>
              <p className="mt-1">hello@tourflow.travel</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground">
                {t.hours}
              </div>
              <p className="mt-1">{t.hoursValue}</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
