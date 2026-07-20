import Link from "next/link";
import { Search } from "lucide-react";
import { CatalogPagination } from "@/components/CatalogPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category } from "@/features/categories/types";
import type { Activity } from "../types";
import { ActivityCard } from "./ActivityCard";

export interface ActivitySearchValues {
  query?: string;
  categoryId?: string;
  sort?: string;
}

export default function ActivitiesPage({
  activities,
  categories,
  total,
  page,
  perPage,
  searchValues,
}: {
  activities: Activity[];
  categories: Category[];
  total: number;
  page: number;
  perPage: number;
  searchValues: ActivitySearchValues;
}) {
  const pageCount = Math.max(1, Math.ceil(total / perPage));

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
        Single-day experiences
      </p>
      <h1 className="max-w-3xl text-balance font-display text-5xl leading-tight text-foreground md:text-7xl">
        One afternoon. Something worth remembering.
      </h1>

      <form
        action="/activities"
        className="mt-12 grid gap-3 rounded-xl border border-border/70 bg-card p-4 md:grid-cols-[minmax(220px,1fr)_minmax(160px,auto)_minmax(180px,auto)_auto]"
      >
        <label className="relative">
          <span className="sr-only">Search activities</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="query"
            defaultValue={searchValues.query}
            placeholder="Search activities"
            className="pl-9"
          />
        </label>
        <select
          name="categoryId"
          defaultValue={searchValues.categoryId ?? ""}
          aria-label="Category"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={searchValues.sort ?? ""}
          aria-label="Sort activities"
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="createdAt-desc">Newest</option>
        </select>
        <Button type="submit">Apply</Button>
      </form>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "activity" : "activities"}
        </p>
        {Object.values(searchValues).some(Boolean) && (
          <Button asChild variant="ghost" size="sm">
            <Link href="/activities">Clear filters</Link>
          </Button>
        )}
      </div>

      <div className="mt-10 max-w-4xl space-y-10">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      {!activities.length && (
        <p className="mt-16 text-sm text-muted-foreground">
          No activities match those filters.
        </p>
      )}

      <CatalogPagination
        pathname="/activities"
        page={page}
        pageCount={pageCount}
        searchValues={searchValues}
      />
    </section>
  );
}
