import Link from "next/link";
import { Search } from "lucide-react";
import { CatalogPagination } from "@/components/CatalogPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category } from "@/features/categories/types";
import type { Tour } from "../types";
import ListingCard from "./ListingCard";

export interface TourSearchValues {
  query?: string;
  categoryId?: string;
  difficulty?: string;
  sort?: string;
}

export default function ToursPage({
  tours,
  categories,
  total,
  page,
  perPage,
  searchValues,
}: {
  tours: Tour[];
  categories: Category[];
  total: number;
  page: number;
  perPage: number;
  searchValues: TourSearchValues;
}) {
  const pageCount = Math.max(1, Math.ceil(total / perPage));

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-8 md:pb-28 md:pt-20">
      <h1 className="max-w-4xl text-balance font-display text-4xl leading-[1.02] tracking-[-0.03em] text-foreground md:text-6xl">
        Tours worth the long way in.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Thoughtful itineraries, small groups, and enough breathing room to be
        somewhere—not just pass through it.
      </p>

      <form
        action="/tours"
        className="mt-10 grid gap-4 rounded-2xl bg-secondary/55 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(150px,1fr))_auto] lg:items-end"
      >
        <label className="grid gap-2">
          <span className="text-xs font-medium text-foreground">Search</span>
          <span className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="query"
              defaultValue={searchValues.query}
              placeholder="Place or tour name"
              className="pl-9"
            />
          </span>
        </label>
        <FilterSelect
          name="categoryId"
          label="Category"
          emptyLabel="All categories"
          defaultValue={searchValues.categoryId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.label,
          }))}
        />
        <FilterSelect
          name="difficulty"
          label="Difficulty"
          emptyLabel="Any difficulty"
          defaultValue={searchValues.difficulty}
          options={[
            { value: "Easy", label: "Easy" },
            { value: "Moderate", label: "Moderate" },
            { value: "Challenging", label: "Challenging" },
          ]}
        />
        <FilterSelect
          name="sort"
          label="Sort by"
          emptyLabel="Most popular"
          defaultValue={searchValues.sort}
          options={[
            { value: "rating-desc", label: "Top rated" },
            { value: "price-asc", label: "Price: low to high" },
            { value: "price-desc", label: "Price: high to low" },
            { value: "createdAt-desc", label: "Newest" },
          ]}
        />
        <Button type="submit" className="sm:self-end">Show tours</Button>
      </form>

      <div className="mt-8 flex items-center justify-between border-b border-border/60 pb-4">
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "tour" : "tours"}
        </p>
        {Object.values(searchValues).some(Boolean) && (
          <Button asChild variant="ghost" size="sm">
            <Link href="/tours">Clear filters</Link>
          </Button>
        )}
      </div>

      {tours.length ? (
        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <ListingCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-secondary/45 px-6 py-16 text-center">
          <p className="font-display text-2xl text-foreground">
            No tours match those filters.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another search or clear the filters.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link href="/tours">Clear filters</Link>
          </Button>
        </div>
      )}

      <CatalogPagination
        pathname="/tours"
        page={page}
        pageCount={pageCount}
        searchValues={searchValues}
      />
    </section>
  );
}

function FilterSelect({
  name,
  label,
  emptyLabel,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  emptyLabel: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
