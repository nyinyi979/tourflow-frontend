import HomePage from "@/features/home/components/HomePage";
import { getActivities } from "@/features/activities/api";
import { getCategories } from "@/features/categories/api";
import { getTestimonials } from "@/features/testimonials/api";
import { getTours } from "@/features/tours/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [tours, activities, categories, testimonials] = await Promise.all([
    getTours({ page: 0, perPage: 3, sortBy: "popularity", orderBy: "desc" }),
    getActivities({ page: 0, perPage: 4, sortBy: "rating", orderBy: "desc" }),
    getCategories("tour"),
    getTestimonials(0, 20),
  ]);

  return (
    <HomePage
      tours={tours.data}
      activities={activities.data}
      categories={categories.data}
      testimonials={testimonials.data}
    />
  );
}
