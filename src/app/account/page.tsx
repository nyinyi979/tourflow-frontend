import type { Metadata } from "next";
import AccountPage from "@/page/account/AccountPage";

export const metadata: Metadata = {
  title: "My account",
  description: "View your TourFlow profile and bookings.",
};

export default function Page() {
  return <AccountPage />;
}
