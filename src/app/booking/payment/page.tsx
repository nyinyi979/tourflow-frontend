import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentPage from "@/features/bookings/components/PaymentPage";

export const metadata: Metadata = {
  title: "Payment",
  description: "Complete your TourFlow booking.",
};

export default function Payment() {
  return (
    <Suspense fallback={<p className="py-24 text-center">Loading payment…</p>}>
      <PaymentPage />
    </Suspense>
  );
}
