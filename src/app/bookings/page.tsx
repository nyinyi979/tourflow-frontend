import type { Metadata } from "next";
import MyBookingsPage from "@/features/bookings/components/MyBookingsPage";

export const metadata: Metadata = {
  title: "My bookings",
  description: "View your TourFlow bookings and payments.",
};

export default function Bookings() {
  return <MyBookingsPage />;
}
