"use client";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function Error({ reset }: { reset: () => void }) {
  const t = useMessages().error;
  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <div className="max-w-2xl border-t border-foreground pt-8">
        <h1 className="text-display text-foreground">
          {t.title}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/75">
          {t.body}
        </p>
        <Button onClick={reset} size="lg" className="mt-7">
          <RotateCcw aria-hidden="true" strokeWidth={1.5} /> {t.retry}
        </Button>
      </div>
    </section>
  );
}
