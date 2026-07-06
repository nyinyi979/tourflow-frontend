import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div className="min-w-0">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h2 className="max-w-2xl text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
