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
    <div className="mb-12 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <h2 className="max-w-3xl min-w-0 text-balance font-display text-3xl leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="flex items-center gap-5 sm:justify-end">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </div>
  );
}
