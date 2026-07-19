import { notFound } from "next/navigation";
import BookingPage from "@/page/booking/BookingPage";
import { ApiError } from "@/services/api";
import { getActivityById, getTourById } from "@/services/catalog";
import type { BookableItem } from "@/types/booking";

export const dynamic = "force-dynamic";

export default async function Booking({
  searchParams,
}: {
  searchParams: Promise<{
    itemType?: string;
    itemId?: string;
    date?: string;
    adults?: string;
    children?: string;
  }>;
}) {
  const { itemType, itemId, date, adults, children } = await searchParams;
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
