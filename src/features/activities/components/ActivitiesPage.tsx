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
import type { Activity } from "../types";
import { ActivityCard } from "./ActivityCard";
import { getMessages } from "@/lib/i18n/server";

export interface ActivitySearchValues {
  query?: string;
  categoryId?: string;
  sort?: string;
}

export default async function ActivitiesPage({
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
  const m = await getMessages();
  const t = m.activities;
  const c = m.common;

  return (
    <section className="mx-auto max-w-360 px-4 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
      <CatalogHeader title={t.title} lead={t.lead} />

      <FilterBar
        action="/activities"
        columns="lg:grid-cols-[minmax(220px,1.4fr)_minmax(160px,1fr)_minmax(180px,1fr)_auto]"
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
          name="sort"
          label={c.sortBy}
          emptyLabel={c.topRated}
          defaultValue={searchValues.sort}
          options={[
            { value: "price-asc", label: c.priceAsc },
            { value: "price-desc", label: c.priceDesc },
            { value: "createdAt-desc", label: c.newest },
          ]}
        />
      </FilterBar>

      <ResultsBar
        count={t.count(total)}
        clearHref="/activities"
        clearLabel={c.clearFilters}
        showClear={Object.values(searchValues).some(Boolean)}
      />

      {activities.length ? (
        <div className="mt-10 border-b border-foreground/25 lg:max-w-5xl">
          {activities.map((activity, i) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={(page - 1) * perPage + i}
            />
          ))}
        </div>
      ) : (
        <EmptyResults
          title={t.noneTitle}
          body={t.noneBody}
          href="/activities"
          action={c.clearFilters}
        />
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
