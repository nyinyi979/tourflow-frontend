import { Suspense } from "react";
import BookingConfirmationPage from "@/features/bookings/components/BookingConfirmationPage";

export default function BookingConfirmation() {
  return (
    <Suspense fallback={<p className="py-24 text-center">Loading booking…</p>}>
      <BookingConfirmationPage />
    </Suspense>
  );
}
