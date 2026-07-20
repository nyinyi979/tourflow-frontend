import ToursPage, {
  type TourSearchValues,
} from "@/features/tours/components/ToursPage";
import { getTours } from "@/features/tours/api";
import { getCategories } from "@/features/categories/api";
import {
  getPositivePage,
  getSearchParam,
  type SearchParams,
} from "@/lib/searchParams";

export const dynamic = "force-dynamic";

const PER_PAGE = 6;
const SORT_OPTIONS = {
  "rating-desc": ["rating", "desc"],
  "price-asc": ["price", "asc"],
  "price-desc": ["price", "desc"],
  "createdAt-desc": ["createdAt", "desc"],
} as const;

export default async function Tours({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = getPositivePage(params);
  const difficultyParam = getSearchParam(params, "difficulty");
  const difficulty = ["Easy", "Moderate", "Challenging"].includes(
    difficultyParam ?? "",
  )
    ? difficultyParam
    : undefined;
  const sortParam = getSearchParam(params, "sort");
  const sort =
    sortParam && sortParam in SORT_OPTIONS ? sortParam : undefined;
  const [sortBy, orderBy] = sort
    ? SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]
    : (["popularity", "desc"] as const);
  const searchValues: TourSearchValues = {
    query: getSearchParam(params, "query")?.trim() || undefined,
    categoryId: getSearchParam(params, "categoryId") || undefined,
    difficulty,
    sort,
  };
  const [tours, categories] = await Promise.all([
    getTours({
      page: page - 1,
      perPage: PER_PAGE,
      query: searchValues.query,
      categoryId: searchValues.categoryId,
      difficulty: searchValues.difficulty,
      sortBy,
      orderBy,
    }),
    getCategories("tour"),
  ]);

  return (
    <ToursPage
      tours={tours.data}
      categories={categories.data}
      total={tours.total}
      page={page}
      perPage={PER_PAGE}
      searchValues={searchValues}
    />
  );
}
