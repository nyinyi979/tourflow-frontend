import { getMessages, pageMetadata } from "@/lib/i18n/server";
import { Suspense } from "react";
import PaymentPage from "@/features/bookings/components/PaymentPage";

export const generateMetadata = () =>
  pageMetadata("payment", "paymentDescription");

export default async function Payment() {
  const t = await getMessages();
  return (
    <Suspense fallback={<p className="py-24 text-center">{t.payment.loading}</p>}>
      <PaymentPage />
    </Suspense>
  );
}
