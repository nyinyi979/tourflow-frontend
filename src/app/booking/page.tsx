import BookingPage from "@/page/booking/BookingPage";
import { Suspense } from "react";

export default function Activities() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPage />
    </Suspense>
  );
}
