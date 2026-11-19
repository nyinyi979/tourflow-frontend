"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
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
    <Button
      type="button"
      variant="ghost"
      className={cn("rounded-full px-3", className)}
      aria-label={t.switchLabel}
      disabled={pending}
      onClick={() => {
        const next = locale === "th" ? "en" : "th";
        document.cookie = `${localeCookie}=${next}; path=/; max-age=31536000; samesite=lax`;
        startTransition(() => router.refresh());
      }}
    >
      <Languages aria-hidden="true" />
      {t.switchTo}
    </Button>
  );
}
