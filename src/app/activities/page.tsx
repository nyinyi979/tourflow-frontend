import ActivitiesPage, {
  type ActivitySearchValues,
} from "@/features/activities/components/ActivitiesPage";
import { getActivities } from "@/features/activities/api";
import { getCategories } from "@/features/categories/api";
import {
  getPositivePage,
  getSearchParam,
  type SearchParams,
} from "@/lib/searchParams";

export const dynamic = "force-dynamic";

const PER_PAGE = 8;
const SORT_OPTIONS = {
  "price-asc": ["price", "asc"],
  "price-desc": ["price", "desc"],
  "createdAt-desc": ["createdAt", "desc"],
} as const;

export default async function Activities({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = getPositivePage(params);
  const sortParam = getSearchParam(params, "sort");
  const sort =
    sortParam && sortParam in SORT_OPTIONS ? sortParam : undefined;
  const [sortBy, orderBy] = sort
    ? SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]
    : (["rating", "desc"] as const);
  const searchValues: ActivitySearchValues = {
    query: getSearchParam(params, "query")?.trim() || undefined,
    categoryId: getSearchParam(params, "categoryId") || undefined,
    sort,
  };
  const [activities, categories] = await Promise.all([
    getActivities({
      page: page - 1,
      perPage: PER_PAGE,
      query: searchValues.query,
      categoryId: searchValues.categoryId,
      sortBy,
      orderBy,
    }),
    getCategories("activity"),
  ]);

  return (
    <ActivitiesPage
      activities={activities.data}
      categories={categories.data}
      total={activities.total}
      page={page}
      perPage={PER_PAGE}
      searchValues={searchValues}
    />
  );
}
