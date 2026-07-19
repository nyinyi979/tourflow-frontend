"use client";
import { Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
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

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight text-foreground">
            TourFlow<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                l.href === pathname && "text-foreground font-semibold",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="default" className="rounded-full px-5">
            <Link href={authenticated ? "/account" : "/login"}>
              {authenticated ? "My account" : "Log in"}
            </Link>
          </Button>
        </div>

        <Button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-4 rounded-full">
              <Link
                href={authenticated ? "/account" : "/login"}
                onClick={() => setOpen(false)}
              >
                {authenticated ? "My account" : "Log in"}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
