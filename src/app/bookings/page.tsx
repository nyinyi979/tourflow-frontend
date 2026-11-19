import { pageMetadata } from "@/lib/i18n/server";
import MyBookingsPage from "@/features/bookings/components/MyBookingsPage";

export const generateMetadata = () =>
  pageMetadata("bookings", "bookingsDescription");

export default function Bookings() {
  return <MyBookingsPage />;
}
