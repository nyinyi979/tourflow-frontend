import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import ActivityDetailsPage from "@/features/activities/components/ActivityDetailsPage";
import { ApiError } from "@/lib/api/client";
import { getActivities, getActivityById } from "@/features/activities/api";

export const dynamic = "force-dynamic";

const loadActivity = cache(async (id: string) => {
  try {
    return (await getActivityById(id)).data;
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
  const activity = await loadActivity(id);
  if (!activity) return { title: "Activity not found" };
  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: activity.title,
      description: activity.description,
      images: activity.images[0]?.url ? [activity.images[0].url] : undefined,
      type: "website",
    },
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await loadActivity(id);
  if (!activity) notFound();
  const related = await getActivities({
    page: 0,
    perPage: 4,
    categoryId: activity.categoryId,
  });
  return (
    <ActivityDetailsPage
      activity={activity}
      related={related.data
        .filter((item) => item.id !== activity.id)
        .slice(0, 3)}
    />
  );
}
