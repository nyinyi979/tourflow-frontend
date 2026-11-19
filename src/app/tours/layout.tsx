import { pageMetadata } from "@/lib/i18n/server";
import React from "react";

export const generateMetadata = () =>
  pageMetadata("tours", "siteDescription");

export default function TourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
