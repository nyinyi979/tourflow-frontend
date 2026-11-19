import { pageMetadata } from "@/lib/i18n/server";
import React from "react";

export const generateMetadata = () =>
  pageMetadata("register", "siteDescription");

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
