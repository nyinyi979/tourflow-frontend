import { Suspense } from "react";
import BookingConfirmationPage from "@/page/booking/BookingConfirmPage";

export default function BookingConfirmation() {
  return (
    <Suspense fallback={<p className="py-24 text-center">Loading booking…</p>}>
      <BookingConfirmationPage />
    </Suspense>
  );
}
