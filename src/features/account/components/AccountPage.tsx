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
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function AccountPage() {
  const router = useRouter();
  const m = useMessages();
  const t = m.account;
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
        {t.loadError}
      </p>
    );
  }
  if (!customerQuery.data) {
    return (
      <p className="py-24 text-center text-muted-foreground">
        {t.loading}
      </p>
    );
  }

  const customer = customerQuery.data.data;

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            {t.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">
            {t.welcome(customer.name)}
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
          {t.logOut}
        </Button>
      </div>

      <section className="mt-14 rounded-lg border border-border/70 bg-card p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          {t.tripsEyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl">{t.bookingsTitle}</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t.bookingsBody}
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/bookings">{m.common.viewMyBookings}</Link>
        </Button>
      </section>
    </main>
  );
}
