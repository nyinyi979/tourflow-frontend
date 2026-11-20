import { Button } from "@/components/ui/button";
import { getMessages } from "@/lib/i18n/server";

export default async function ContactForm() {
  const t = (await getMessages()).contact;
  return (
    <aside
      className="border border-foreground bg-card p-6 md:p-8"
      aria-labelledby="contact-card-title"
    >
      <h2 id="contact-card-title" className="text-heading text-foreground">
        {t.cardTitle}
      </h2>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-foreground/75">
        {t.cardBody}
      </p>
      <p className="label-price mt-7 border-y border-foreground/25 py-4 text-muted-foreground">
        {t.replies}
      </p>
      <Button asChild size="lg" className="mt-7 w-full">
        <a href="mailto:hello@tourflow.travel?subject=Planning%20a%20TourFlow%20trip">
          {t.cta} <span aria-hidden="true">↗</span>
        </a>
      </Button>
    </aside>
  );
}
