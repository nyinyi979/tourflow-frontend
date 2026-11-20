import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Section title on the left, an optional mono label and a right-aligned link
 * on the right, closed off by a hairline.
 */
export function SectionHeading({
  eyebrow,
  title,
  right,
}: {
  eyebrow?: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-foreground pb-5 md:mb-12">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="label-mono mb-3 text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h2 className="max-w-3xl text-balance text-heading text-foreground">
          {title}
        </h2>
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

/** Text link with the trailing ↗ used for "view all" style links. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2 text-subheading text-foreground transition-colors hover:text-primary ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-(--motion-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </Link>
  );
}
