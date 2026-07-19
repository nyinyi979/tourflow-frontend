"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  clearCustomerSession,
  hasCustomerSession,
  subscribeCustomerSession,
} from "@/lib/customerAuth";
import { getCustomerMe } from "@/services/auth";
import { getMyBookings, updateBooking } from "@/services/bookings";

export default function AccountPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authenticated = useSyncExternalStore(
    subscribeCustomerSession,
    hasCustomerSession,
    () => false,
  );

  useEffect(() => {
    if (!authenticated) router.replace("/login?next=/account");
  }, [authenticated, router]);

  const customerQuery = useQuery({
    queryKey: ["customer", "me"],
    queryFn: getCustomerMe,
    enabled: authenticated,
    retry: false,
  });
  const bookingsQuery = useQuery({
    queryKey: ["bookings", "mine"],
    queryFn: () => getMyBookings(0, 100),
    enabled: authenticated,
    retry: false,
  });
  const cancelMutation = useMutation({
    mutationFn: (id: string) => updateBooking(id, { status: "cancelled" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings", "mine"] }),
  });

  if (authenticated && (!customerQuery.data || !bookingsQuery.data)) {
    return <p className="py-24 text-center text-muted-foreground">Loading your account…</p>;
  }
  if (!authenticated) return null;
  if (customerQuery.isError || bookingsQuery.isError) {
    return <p className="py-24 text-center text-destructive">Unable to load your account.</p>;
  }
  if (!customerQuery.data || !bookingsQuery.data) return null;

  const customer = customerQuery.data.data;
  const bookings = bookingsQuery.data.data;

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">My account</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Welcome, {customer.name}</h1>
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

      <section className="mt-14">
        <h2 className="font-display text-3xl">My bookings</h2>
        {bookings.length === 0 ? (
          <div className="mt-6 rounded-lg border border-border/70 p-8 text-center">
            <p className="text-muted-foreground">You have no bookings yet.</p>
            <Button asChild className="mt-5 rounded-full"><Link href="/tours">Browse tours</Link></Button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-lg border border-border/70 bg-card p-5">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary">{booking.bookingNumber}</p>
                    <h3 className="mt-1 font-display text-xl">{booking.tour.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {booking.travelDate} · {booking.guests.adults + booking.guests.children} guest(s) · ${booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs capitalize">{booking.status}</span>
                    {booking.status !== "cancelled" && booking.status !== "completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={cancelMutation.isPending}
                        onClick={() => cancelMutation.mutate(booking.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
