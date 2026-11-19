"use client";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function Error({ reset }: { reset: () => void }) {
  const t = useMessages().error;
  return (
    <section className="flex min-h-[60svh] items-center justify-center px-5 py-20">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {t.body}
        </p>
        <Button onClick={reset} size="lg" className="mt-7 rounded-full">
          <RotateCcw aria-hidden="true" /> {t.retry}
        </Button>
      </div>
    </section>
  );
}
