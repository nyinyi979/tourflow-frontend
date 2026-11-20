"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { localeCookie } from "@/lib/i18n/messages";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/** Switches between English and Thai; the choice is kept in a cookie for a year. */
export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useMessages().nav;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={cn(
        "label-mono inline-flex h-8 min-w-11 cursor-pointer items-center justify-center rounded-[5px] border border-foreground px-2.5 text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50",
        className,
      )}
      aria-label={t.switchLabel}
      // Label and aria-label are in the other language.
      lang={locale === "th" ? "en" : "th"}
      disabled={pending}
      onClick={() => {
        const next = locale === "th" ? "en" : "th";
        document.cookie = `${localeCookie}=${next}; path=/; max-age=31536000; samesite=lax`;
        startTransition(() => router.refresh());
      }}
    >
      {t.switchTo}
    </button>
  );
}
