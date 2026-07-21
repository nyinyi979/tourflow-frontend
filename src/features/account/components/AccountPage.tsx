"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { customerMeQueryOptions } from "@/features/auth/queries";
import {
  clearCustomerSession,
  hasCustomerSession,
  subscribeCustomerSession,
} from "@/lib/customerAuth";

export default function AccountPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authenticated = useSyncExternalStore(
    subscribeCustomerSession,
    hasCustomerSession,
    () => false,
  );
  const customerQuery = useQuery(customerMeQueryOptions(authenticated));

  useEffect(() => {
    if (!authenticated) router.replace("/login?next=/account");
  }, [authenticated, router]);

  if (!authenticated) return null;
  if (customerQuery.isError) {
    return (
      <p className="py-24 text-center text-destructive">
        Unable to load your account.
      </p>
    );
  }
  if (!customerQuery.data) {
    return (
      <p className="py-24 text-center text-muted-foreground">
        Loading your account…
      </p>
    );
  }

  const customer = customerQuery.data.data;

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            My account
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">
            Welcome, {customer.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{customer.email}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            clearCustomerSession();
            queryClient.clear();
            router.replace("/login");
          }}
        >
          Log out
        </Button>
      </div>

      <section className="mt-14 rounded-lg border border-border/70 bg-card p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Your trips
        </p>
        <h2 className="mt-2 font-display text-3xl">My bookings</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Review payment details, upcoming travel dates, and booking status in
          one place.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/bookings">View my bookings</Link>
        </Button>
      </section>
    </main>
  );
}
