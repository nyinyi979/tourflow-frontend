import { pageMetadata } from "@/lib/i18n/server";
import React from "react";

export const generateMetadata = () =>
  pageMetadata("about", "siteDescription");

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
