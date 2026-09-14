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

const links = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/activities", label: "Activities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
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
          aria-label="TourFlow home"
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
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {authenticated && (
            <Link
              href="/bookings"
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              My bookings
            </Link>
          )}
          <Button asChild variant="ghost" className="rounded-full px-4">
            <Link href={authenticated ? "/account" : "/login"}>
              {authenticated ? "My account" : "Log in"}
            </Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link href="/tours">
              Explore trips <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
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

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border/60 bg-background shadow-[0_18px_40px_-24px_rgba(18,31,36,0.45)] md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col px-5 py-4">
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
                {l.label}
              </Link>
            ))}
            {authenticated && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border/50 text-base text-foreground"
              >
                My bookings
              </Link>
            )}
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link
                href={authenticated ? "/account" : "/login"}
                onClick={() => setOpen(false)}
              >
                {authenticated ? "My account" : "Log in"}
              </Link>
            </Button>
            <Button asChild className="mt-2 rounded-full">
              <Link href="/tours">
                Explore trips <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
