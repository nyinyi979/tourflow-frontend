import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Editorial small-group tours and single-day activities in places worth the long way in.",
  openGraph: {
    title: "About us | TourFlow",
    description:
      "Editorial small-group tours and single-day activities in places worth the long way in.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
