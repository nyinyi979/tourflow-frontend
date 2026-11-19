import "server-only";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  localeCookie,
  messages,
  type Locale,
  type Messages,
} from "./messages";

/** The visitor's language, from the cookie the language switch sets. */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(localeCookie)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getMessages(): Promise<Messages> {
  return messages[await getLocale()];
}

/** Title and description for a page, in the visitor's language. */
export async function pageMetadata(
  title: keyof Messages["meta"],
  description: keyof Messages["meta"] = "siteDescription",
): Promise<Metadata> {
  const m = (await getMessages()).meta;
  return {
    title: m[title],
    description: m[description],
    openGraph: {
      title: `${m[title]} | TourFlow`,
      description: m[description],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}
