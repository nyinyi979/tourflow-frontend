"use client";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import ListingCard from "./components/ListingCard";
import FilterGroup from "./components/FilterGroup";
import CheckRow from "./components/CheckRow";
import type { Tour } from "@/types/tour";
import type { Category } from "@/types/category";
const DIFFICULTY_LABELS: { label: string; value: string }[] = [
  { label: "Easy", value: "Easy" },
  { label: "Moderate", value: "Moderate" },
  { label: "Hard", value: "Challenging" },
];
const DURATION_BUCKETS = [
  { label: "1–3 days", value: "1-3" as const, test: (d: number) => d <= 3 },
  {
    label: "4–7 days",
    value: "4-7" as const,
    test: (d: number) => d >= 4 && d <= 7,
  },
  { label: "8+ days", value: "8+" as const, test: (d: number) => d >= 8 },
];

type SortKey = "popularity" | "rating" | "price-asc" | "price-desc";
const PAGE_SIZE = 6;

export default function ToursPage({
  tours,
  categories,
  initialQuery,
  initialCategoryId,
}: {
  tours: Tour[];
  categories: Category[];
  initialQuery: string;
  initialCategoryId?: string;
}) {
  const maxPrice = Math.max(0, ...tours.map((tour) => tour.price));
  const minPrice = tours.length
    ? Math.min(...tours.map((tour) => tour.price))
    : 0;
  const initialCategory = categories.find(
    (category) => category.id === initialCategoryId,
  )?.label;
  const [cats, setCats] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [diffs, setDiffs] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);
  const [sort, setSort] = useState<SortKey>("popularity");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = tours.filter((t) => {
      if (
        initialQuery &&
        !t.title.toLowerCase().includes(initialQuery.toLowerCase())
      )
        return false;
      if (cats.length && !cats.includes(t.category)) return false;
      if (diffs.length && !diffs.includes(t.difficulty)) return false;
      if (
        durations.length &&
        !durations.some((d) =>
          DURATION_BUCKETS.find((b) => b.value === d)?.test(t.duration),
        )
      )
        return false;
      if (t.price < price[0] || t.price > price[1]) return false;
      return true;
    });
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        sorted.sort((a, b) => b.popularity - a.popularity);
    }
    return sorted;
  }, [cats, diffs, durations, initialQuery, price, sort, tours]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const toggleFrom = <T,>(list: T[], val: T): T[] =>
    list.includes(val) ? list.filter((x) => x !== val) : [...list, val];

  const filterPanel = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {categories.map((category) => (
          <CheckRow
            key={category.id}
            id={`cat-${category.id}`}
            label={category.label}
            checked={cats.includes(category.label)}
            onChange={() => {
              setCats((current) => toggleFrom(current, category.label));
              setPage(1);
            }}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price range">
        <div className="pt-2">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={50}
            value={price}
            onValueChange={(v: number[]) => {
              setPrice([v[0], v[1]] as [number, number]);
              setPage(1);
            }}
          />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>${price[0].toLocaleString()}</span>
            <span>${price[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Duration">
        {DURATION_BUCKETS.map((d) => (
          <CheckRow
            key={d.value}
            id={`dur-${d.value}`}
            label={d.label}
            checked={durations.includes(d.value)}
            onChange={() => {
              setDurations((s) => toggleFrom(s, d.value));
              setPage(1);
            }}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Difficulty">
        {DIFFICULTY_LABELS.map((d) => (
          <CheckRow
            key={d.value}
            id={`diff-${d.value}`}
            label={d.label}
            checked={diffs.includes(d.value)}
            onChange={() => {
              setDiffs((s) => toggleFrom(s, d.value));
              setPage(1);
            }}
          />
        ))}
      </FilterGroup>

      <Button
        variant="ghost"
        className="w-full justify-start px-0 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        onClick={() => {
          setCats([]);
          setDiffs([]);
          setDurations([]);
          setPrice([minPrice, maxPrice]);
          setPage(1);
        }}
      >
        Clear all filters
      </Button>
    </div>
  );

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
        The full list
      </p>
      <h1 className="max-w-3xl text-balance font-display text-4xl leading-tight text-foreground md:text-6xl">
        Tours worth the long way in.
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filterPanel}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 pb-4 sm:flex sm:justify-between">
            <p className="min-w-0 truncate text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "tour" : "tours"}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-[85vh] overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle className="font-display text-2xl">
                      Filter tours
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">{filterPanel}</div>
                </SheetContent>
              </Sheet>

              <Select
                value={sort}
                onValueChange={(v: string) => setSort(v as SortKey)}
              >
                <SelectTrigger className="w-[190px] rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most popular</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="rounded-md border border-dashed border-border/60 p-16 text-center">
              <p className="font-display text-2xl text-foreground">
                No tours match those filters.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the price range or clearing a filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((t) => (
                <ListingCard key={t.id} tour={t} />
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <Pagination className="mt-16">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-40" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: pageCount }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i + 1 === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(pageCount, p + 1));
                    }}
                    className={
                      currentPage === pageCount
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
}
