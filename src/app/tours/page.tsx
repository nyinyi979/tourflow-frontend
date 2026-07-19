import ToursPage from "@/page/tours/ToursPage";
import { getCategories, getTours } from "@/services/catalog";

export const dynamic = "force-dynamic";

export default async function Tours({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; categoryId?: string }>;
}) {
  const { query, categoryId } = await searchParams;
  const [tours, categories] = await Promise.all([
    getTours({
      page: 0,
      perPage: 100,
      query: query || undefined,
      categoryId: categoryId || undefined,
    }),
    getCategories("tour"),
  ]);

  return (
    <ToursPage
      tours={tours.data}
      categories={categories.data}
      initialQuery={query ?? ""}
      initialCategoryId={categoryId}
    />
  );
}
