import { getMessages } from "@/lib/i18n/server";
import { Suspense } from "react";
import BookingConfirmationPage from "@/features/bookings/components/BookingConfirmationPage";

export default async function BookingConfirmation() {
  const t = await getMessages();
  return (
    <Suspense fallback={<p className="py-24 text-center">{t.confirmation.loading}</p>}>
      <BookingConfirmationPage />
    </Suspense>
  );
}
