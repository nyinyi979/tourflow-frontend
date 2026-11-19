import { pageMetadata } from "@/lib/i18n/server";
import React from "react";

export const generateMetadata = () =>
  pageMetadata("login", "siteDescription");

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
