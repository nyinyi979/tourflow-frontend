import { CatalogPagination } from "@/components/CatalogPagination";
import {
  CatalogHeader,
  EmptyResults,
  FilterBar,
  FilterSearch,
  FilterSelect,
  ResultsBar,
} from "@/components/CatalogFilters";
import type { Category } from "@/features/categories/types";
import type { Tour } from "../types";
import ListingCard from "./ListingCard";
import { getMessages } from "@/lib/i18n/server";

export interface TourSearchValues {
  query?: string;
  categoryId?: string;
  difficulty?: string;
  sort?: string;
}

export default async function ToursPage({
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
  const m = await getMessages();
  const t = m.tours;
  const c = m.common;

  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <CatalogHeader title={t.title} lead={t.lead} />

      <FilterBar
        action="/tours"
        columns="lg:grid-cols-[minmax(220px,1.4fr)_repeat(3,minmax(150px,1fr))_auto]"
        submitLabel={t.show}
      >
        <FilterSearch
          label={c.search}
          placeholder={t.placeholder}
          defaultValue={searchValues.query}
        />
        <FilterSelect
          name="categoryId"
          label={c.category}
          emptyLabel={c.allCategories}
          defaultValue={searchValues.categoryId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.label,
          }))}
        />
        <FilterSelect
          name="difficulty"
          label={t.difficulty}
          emptyLabel={t.anyDifficulty}
          defaultValue={searchValues.difficulty}
          options={["Easy", "Moderate", "Challenging"].map((value) => ({
            value,
            label: c.difficulty[value],
          }))}
        />
        <FilterSelect
          name="sort"
          label={c.sortBy}
          emptyLabel={c.mostPopular}
          defaultValue={searchValues.sort}
          options={[
            { value: "rating-desc", label: c.topRated },
            { value: "price-asc", label: c.priceAsc },
            { value: "price-desc", label: c.priceDesc },
            { value: "createdAt-desc", label: c.newest },
          ]}
        />
      </FilterBar>

      <ResultsBar
        count={t.count(total)}
        clearHref="/tours"
        clearLabel={c.clearFilters}
        showClear={Object.values(searchValues).some(Boolean)}
      />

      {tours.length ? (
        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <ListingCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <EmptyResults
          title={t.noneTitle}
          body={t.noneBody}
          href="/tours"
          action={c.clearFilters}
        />
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
