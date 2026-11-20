import type { ReactNode } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

/** Page title block shared by the tour and activity catalogs. */
export function CatalogHeader({
  title,
  lead,
}: {
  title: string;
  lead: string;
}) {
  return (
    <div className="grid gap-6 pb-10 md:grid-cols-12 md:gap-8 md:pb-14">
      <h1 className="text-balance text-display text-foreground md:col-span-7">
        {title}
      </h1>
      <p className="max-w-md text-base leading-relaxed text-foreground/75 md:col-span-4 md:col-start-9 md:self-end">
        {lead}
      </p>
    </div>
  );
}

/**
 * Filter strip: fields separated by hairlines inside one ruled band, submit
 * button flush at the end.
 */
export function FilterBar({
  action,
  columns,
  children,
  submitLabel,
}: {
  action: string;
  columns: string;
  children: ReactNode;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className={`grid border border-foreground bg-card sm:grid-cols-2 ${columns}`}
    >
      {children}
      <button
        type="submit"
        className="label-mono min-h-14 cursor-pointer bg-primary px-6 text-primary-foreground transition-colors hover:bg-foreground sm:col-span-2 lg:col-span-1"
      >
        {submitLabel}
      </button>
    </form>
  );
}

const cell =
  "grid content-start gap-1 border-b border-foreground/25 px-4 pb-2 pt-3 focus-within:bg-background lg:border-b-0 lg:border-r";

export function FilterSearch({
  label,
  placeholder,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  defaultValue?: string;
}) {
  return (
    <label className={`${cell} sm:col-span-2 lg:col-span-1`}>
      <span className="label-mono text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <Search aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-foreground" />
        <input
          name="query"
          type="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-9 w-full min-w-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none md:text-[0.9375rem]"
        />
      </span>
    </label>
  );
}

export { FilterSelect } from "./FilterSelect";

/** Result count on the left, clear-filters on the right, ruled underneath. */
export function ResultsBar({
  count,
  clearHref,
  clearLabel,
  showClear,
}: {
  count: string;
  clearHref: string;
  clearLabel: string;
  showClear: boolean;
}) {
  return (
    <div className="mt-8 flex min-h-10 items-center justify-between border-b border-foreground/25 pb-3">
      <p className="label-mono text-muted-foreground">{count}</p>
      {showClear && (
        <Link
          href={clearHref}
          className="label-mono text-foreground underline decoration-foreground/30 underline-offset-[6px] hover:decoration-foreground"
        >
          {clearLabel}
        </Link>
      )}
    </div>
  );
}

/** Empty state: a ruled box, a line of type, one way out. */
export function EmptyResults({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mt-10 border border-dashed border-foreground/40 px-6 py-16 text-center">
      <p className="text-title text-foreground">{title}</p>
      <p className="mt-2 text-[0.9375rem] text-muted-foreground">{body}</p>
      <Link
        href={href}
        className="label-mono mt-6 inline-flex h-11 items-center border border-foreground px-5 text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {action}
      </Link>
    </div>
  );
}
