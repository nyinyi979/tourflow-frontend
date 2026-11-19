"use client";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  hasCustomerSession,
  subscribeCustomerSession,
} from "@/lib/customerAuth";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import { LanguageSwitch } from "./LanguageSwitch";

const links = [
  { href: "/", key: "home" },
  { href: "/tours", key: "tours" },
  { href: "/activities", key: "activities" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useMessages().nav;
  const [open, setOpen] = useState(false);
  const authenticated = useSyncExternalStore(
    subscribeCustomerSession,
    hasCustomerSession,
    () => false,
  );
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 h-[var(--header-height)] border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          aria-label={t.homeLabel}
          className="rounded-sm font-display text-2xl tracking-tight text-foreground"
        >
          <span>
            TourFlow<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative flex h-[var(--header-height)] items-center text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                isActive(l.href) &&
                  "font-semibold text-foreground after:scale-x-100",
              )}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {t[l.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitch />
          {authenticated && (
            <Link
              href="/bookings"
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.myBookings}
            </Link>
          )}
          <Button asChild variant="ghost" className="rounded-full px-4">
            <Link href={authenticated ? "/account" : "/login"}>
              {authenticated ? t.myAccount : t.logIn}
            </Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/tours">
              {t.explore} <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
        <LanguageSwitch />
        <Button
          type="button"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </Button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border/60 bg-background shadow-[0_18px_40px_-24px_rgba(18,31,36,0.45)] md:hidden"
        >
          <nav aria-label={t.mobile} className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center border-b border-border/50 text-base text-muted-foreground",
                  isActive(l.href) && "font-semibold text-foreground",
                )}
              >
                {t[l.key]}
              </Link>
            ))}
            {authenticated && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border/50 text-base text-foreground"
              >
                {t.myBookings}
              </Link>
            )}
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link
                href={authenticated ? "/account" : "/login"}
                onClick={() => setOpen(false)}
              >
                {authenticated ? t.myAccount : t.logIn}
              </Link>
            </Button>
            <Button asChild className="mt-2 rounded-full">
              <Link href="/tours">
                {t.explore} <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
