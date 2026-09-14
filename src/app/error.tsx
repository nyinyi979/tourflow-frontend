"use client";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="flex min-h-[60svh] items-center justify-center px-5 py-20">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          This page took a wrong turn.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The connection may have dropped. Try loading this page again.
        </p>
        <Button onClick={reset} size="lg" className="mt-7 rounded-full">
          <RotateCcw aria-hidden="true" /> Try again
        </Button>
      </div>
    </section>
  );
}
