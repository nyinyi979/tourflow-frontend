import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Editorial small-group tours and single-day activities in places worth the long way in.",
  openGraph: {
    title: "Create an account | TourFlow",
    description:
      "Editorial small-group tours and single-day activities in places worth the long way in.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
