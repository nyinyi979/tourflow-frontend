import ContactForm from "./ContactForm";
import { getMessages } from "@/lib/i18n/server";

export default async function ContactPage() {
  const t = (await getMessages()).contact;
  const rows = [
    { label: t.studio, value: t.address },
    { label: t.email, value: "hello@tourflow.travel" },
    { label: t.hours, value: t.hoursValue },
  ];
  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <p className="label-mono text-muted-foreground">{t.eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-balance text-display text-foreground">
        {t.title}
      </h1>

      <div className="mt-12 grid gap-14 border-t border-foreground pt-8 md:mt-16 md:grid-cols-12 md:gap-8 md:pt-10">
        <dl className="md:col-span-6">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-b border-foreground/25 py-4 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
            >
              <dt className="label-mono pt-1 text-muted-foreground">{row.label}</dt>
              <dd className="text-subheading text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-5 md:col-start-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
