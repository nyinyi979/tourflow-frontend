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
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <h1 className="max-w-4xl text-balance font-display text-4xl leading-[1.02] tracking-[-0.03em] text-foreground md:text-6xl">
        One afternoon. Something worth remembering.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Local guides, a clear meeting point, and one excellent thing to do with
        the day you have.
      </p>

      <form
        action="/activities"
        className="mt-10 grid gap-4 rounded-2xl bg-secondary/55 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.2fr)_minmax(160px,1fr)_minmax(180px,1fr)_auto] lg:items-end"
      >
        <label className="grid gap-2">
          <span className="text-xs font-medium text-foreground">Search</span>
          <span className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="query"
              defaultValue={searchValues.query}
              placeholder="Place or activity name"
              className="pl-9"
            />
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-medium text-foreground">Category</span>
          <select
            name="categoryId"
            defaultValue={searchValues.categoryId ?? ""}
            className="h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-medium text-foreground">Sort by</span>
          <select
            name="sort"
            defaultValue={searchValues.sort ?? ""}
            className="h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <option value="">Top rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="createdAt-desc">Newest</option>
          </select>
        </label>
        <Button type="submit" className="sm:self-end">Show activities</Button>
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
        <div className="mt-10 max-w-4xl rounded-2xl bg-secondary/45 px-6 py-16 text-center">
          <p className="font-display text-2xl text-foreground">
            No activities match those filters.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another search or start again with the full list.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link href="/activities">Clear filters</Link>
          </Button>
        </div>
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
