import ContactForm from "./components/ContactForm";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
            Say hello
          </p>
          <h1 className="text-balance font-display text-5xl leading-tight text-foreground md:text-6xl">
            Write to us. We answer.
          </h1>
          <div className="mt-10 space-y-6 text-sm text-muted-foreground">
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground">
                Studio
              </div>
              <p className="mt-1">Rua da Bica de Duarte, Lisbon 1200-158</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground">
                Email
              </div>
              <p className="mt-1">studio@wayfare.travel</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-foreground">
                Hours
              </div>
              <p className="mt-1">Mon–Fri, 09:00–18:00 WET</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
