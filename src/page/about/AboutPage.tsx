export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
        About us
      </p>
      <h1 className="text-balance font-display text-5xl leading-tight text-foreground md:text-7xl">
        A small studio, arranging quiet trips since 2014.
      </h1>
      <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          Wayfare is nine people in a converted print shop in Lisbon. We plan
          small-group tours and single-day activities in places we know well and
          return to often — the Andes, the High Atlas, coastal Japan.
        </p>
        <p>
          We work with local guides who could be doing something else, and
          usually do — botanists, chefs, translators, geologists. Groups stay
          small (never more than twelve) so nothing feels processed.
        </p>
        <p>
          If a trip you want isn't listed, write to us. Half of what we do
          starts with a good email.
        </p>
      </div>
    </section>
  );
}
