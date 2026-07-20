import { notFound } from "next/navigation";
import BookingPage from "@/features/bookings/components/BookingPage";
import { ApiError } from "@/lib/api/client";
import { getActivityById } from "@/features/activities/api";
import { getTourById } from "@/features/tours/api";
import type { BookableItem } from "@/features/bookings/types";
import { getSearchParam, type SearchParams } from "@/lib/searchParams";

export const dynamic = "force-dynamic";

export default async function Booking({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const itemType = getSearchParam(params, "itemType");
  const itemId = getSearchParam(params, "itemId");
  const date = getSearchParam(params, "date");
  const adults = getSearchParam(params, "adults");
  const children = getSearchParam(params, "children");
  const adultCount = Math.max(1, Number(adults || 1));
  const childCount = Math.max(0, Number(children || 0));
  if (
    !itemId ||
    !date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isInteger(adultCount) ||
    !Number.isInteger(childCount) ||
    (itemType !== "tour" && itemType !== "activity")
  )
    notFound();

  let item: BookableItem;
  try {
    if (itemType === "tour") {
      const tour = (await getTourById(itemId)).data;
      item = {
        id: tour.id,
        itemType: "tour",
        title: tour.title,
        image: tour.images[0]?.url ?? null,
        price: tour.price,
        duration: tour.duration,
        category: tour.category,
      };
    } else {
      const activity = (await getActivityById(itemId)).data;
      item = {
        id: activity.id,
        itemType: "activity",
        title: activity.title,
        image: activity.images[0]?.url ?? null,
        price: activity.price,
        duration: activity.duration,
        category: activity.category,
      };
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <BookingPage
      item={item}
      date={date}
      adults={adultCount}
      childCount={childCount}
    />
  );
}
