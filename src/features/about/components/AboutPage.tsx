import { getMessages } from "@/lib/i18n/server";

export default async function AboutPage() {
  const t = (await getMessages()).about;
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.03em] text-foreground md:text-7xl">
        {t.title}
      </h1>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {t.eyebrow}
      </p>
      <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
        {t.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
