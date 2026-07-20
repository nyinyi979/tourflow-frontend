import Link from "next/link";
import { Search } from "lucide-react";
import { CatalogPagination } from "@/components/CatalogPagination";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
        The full list
      </p>
      <h1 className="max-w-3xl text-balance font-display text-4xl leading-tight text-foreground md:text-6xl">
        Tours worth the long way in.
      </h1>

      <form
        action="/tours"
        className="mt-12 grid gap-3 rounded-xl border border-border/70 bg-card p-4 md:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(150px,auto))_auto]"
      >
        <label className="relative">
          <span className="sr-only">Search tours</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="query"
            defaultValue={searchValues.query}
            placeholder="Search tours"
            className="pl-9"
          />
        </label>
        <FilterSelect
          name="categoryId"
          label="All categories"
          defaultValue={searchValues.categoryId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.label,
          }))}
        />
        <FilterSelect
          name="difficulty"
          label="Any difficulty"
          defaultValue={searchValues.difficulty}
          options={[
            { value: "Easy", label: "Easy" },
            { value: "Moderate", label: "Moderate" },
            { value: "Challenging", label: "Challenging" },
          ]}
        />
        <FilterSelect
          name="sort"
          label="Most popular"
          defaultValue={searchValues.sort}
          options={[
            { value: "rating-desc", label: "Top rated" },
            { value: "price-asc", label: "Price: low to high" },
            { value: "price-desc", label: "Price: high to low" },
            { value: "createdAt-desc", label: "Newest" },
          ]}
        />
        <Button type="submit">Apply</Button>
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
        <div className="mt-8 rounded-md border border-dashed border-border/60 p-16 text-center">
          <p className="font-display text-2xl text-foreground">
            No tours match those filters.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another search or clear the filters.
          </p>
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
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
