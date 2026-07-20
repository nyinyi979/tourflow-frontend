import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import TourDetailsPage from "@/features/tours/components/TourDetailsPage";
import { ApiError } from "@/lib/api/client";
import { getTourById, getTours } from "@/features/tours/api";

export const dynamic = "force-dynamic";

const loadTour = cache(async (id: string) => {
  try {
    return (await getTourById(id)).data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tour = await loadTour(id);
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.title,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: tour.images[0]?.url ? [tour.images[0].url] : undefined,
      type: "website",
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await loadTour(id);
  if (!tour) notFound();
  const related = await getTours({
    page: 0,
    perPage: 3,
    categoryId: tour.categoryId,
  });
  return (
    <TourDetailsPage
      tour={tour}
      related={related.data.filter((item) => item.id !== tour.id).slice(0, 3)}
    />
  );
}
