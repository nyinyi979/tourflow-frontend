import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Editorial small-group tours and single-day activities in places worth the long way in.",
  openGraph: {
    title: "Tours | TourFlow",
    description:
      "Editorial small-group tours and single-day activities in places worth the long way in.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function TourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
