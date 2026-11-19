"use client";

import { createContext, useContext, type ReactNode } from "react";
import { messages, type Locale, type Messages } from "./messages";

const LocaleContext = createContext<Locale>("en");

/** Hands the language read from the cookie on the server to client components. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);

export const useMessages = (): Messages => messages[useLocale()];
