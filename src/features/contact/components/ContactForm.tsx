import { ArrowUpRight, Clock3, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <aside className="rounded-2xl bg-secondary/60 p-6 md:p-8" aria-labelledby="contact-card-title">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <MessageCircle aria-hidden="true" />
      </div>
      <h2 id="contact-card-title" className="mt-8 font-display text-3xl leading-tight text-foreground">
        Start with a good email.
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        Tell us where you are thinking of going, roughly when, and who is
        travelling. If you are not sure yet, tell us what you want the days to
        feel like.
      </p>
      <div className="mt-7 space-y-3 border-y border-border py-5 text-sm">
        <p className="flex items-center gap-3 text-foreground">
          <Mail aria-hidden="true" className="h-4 w-4 text-primary" />
          hello@tourflow.travel
        </p>
        <p className="flex items-center gap-3 text-muted-foreground">
          <Clock3 aria-hidden="true" className="h-4 w-4 text-primary" />
          Replies Monday–Friday, 09:00–18:00 WET
        </p>
      </div>
      <Button asChild size="lg" className="mt-7 w-full rounded-full">
        <a href="mailto:hello@tourflow.travel?subject=Planning%20a%20TourFlow%20trip">
          Email TourFlow <ArrowUpRight aria-hidden="true" />
        </a>
      </Button>
    </aside>
  );
}
