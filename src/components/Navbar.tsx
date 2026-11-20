"use client";
import { Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
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
  { href: "/tours", key: "tours" },
  { href: "/activities", key: "activities" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useMessages().nav;
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn(
      (typeof next === "function" ? next(open) : next) ? pathname : null,
    );
  const authenticated = useSyncExternalStore(
    subscribeCustomerSession,
    hasCustomerSession,
    () => false,
  );
  const isActive = (href: string) => pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    cn(
      "label-mono relative py-1 text-foreground/70 transition-colors hover:text-foreground",
      "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-(--motion-base) hover:after:scale-x-100",
      active && "text-foreground after:scale-x-100",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-foreground bg-background">
      <div className="mx-auto grid h-(--header-height) max-w-360 grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 md:px-8">
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={linkClass(isActive(l.href))}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {t[l.key]}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          aria-label={t.homeLabel}
          className="col-start-1 justify-self-start text-lg font-medium tracking-[0.02em] text-foreground md:col-start-2 md:justify-self-center"
        >
          TourFlow
        </Link>

        <div className="hidden items-center justify-end gap-6 md:flex">
          <LanguageSwitch />
          {authenticated && (
            <Link href="/bookings" className={linkClass(isActive("/bookings"))}>
              {t.myBookings}
            </Link>
          )}
          <Link
            href={authenticated ? "/account" : "/login"}
            className={linkClass(
              isActive(authenticated ? "/account" : "/login"),
            )}
          >
            {authenticated ? t.myAccount : t.logIn}
          </Link>
        </div>

        <div className="col-start-3 flex items-center justify-end gap-3 md:hidden">
          <LanguageSwitch />
          <button
            type="button"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center text-foreground"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-foreground bg-background md:hidden"
        >
          <nav aria-label={t.mobile} className="flex flex-col px-4 pb-6">
            {[{ href: "/", key: "home" } as const, ...links].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={
                  (l.href === "/" ? pathname === "/" : isActive(l.href))
                    ? "page"
                    : undefined
                }
                className="flex min-h-14 items-center justify-between border-b border-foreground/20 text-subheading text-foreground aria-[current=page]:text-primary"
              >
                {t[l.key]}
                <span aria-hidden="true" className="text-base">↗</span>
              </Link>
            ))}
            {authenticated && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="label-mono flex min-h-12 items-center border-b border-foreground/20 text-foreground"
              >
                {t.myBookings}
              </Link>
            )}
            <Link
              href={authenticated ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="label-mono flex min-h-12 items-center border-b border-foreground/20 text-foreground"
            >
              {authenticated ? t.myAccount : t.logIn}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
