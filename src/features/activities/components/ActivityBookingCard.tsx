"use client";

import { useState } from "react";
import { ShieldCheck, Users } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Activity } from "../types";
import { useMessages } from "@/lib/i18n/LocaleProvider";

export default function ActivityBookingCard({
  activity,
}: {
  activity: Activity;
}) {
  const router = useRouter();
  const m = useMessages();
  const t = m.activities;
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const total = activity.price * guests;

  const reserve = () => {
    if (!date) return;
    const search = new URLSearchParams({
      itemType: "activity",
      itemId: activity.id,
      date,
      adults: String(guests),
      children: "0",
      step: "1",
    });
    router.push(`/booking?${search}`);
  };

  return (
    <aside>
      <div className="lg:sticky lg:top-28">
        <div className="rounded-lg border border-border/70 bg-card p-6 shadow-sm">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl text-primary">
              ${activity.price}
            </span>
            <span className="text-xs text-muted-foreground">{m.common.perPerson}</span>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              {m.common.date}
            </label>
            <Input
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              {m.common.guests}
            </label>
            <div className="flex items-center justify-between rounded-md border border-input px-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                {t.people(guests)}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                  aria-label={t.decrease}
                >
                  −
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setGuests(guests + 1)}
                  aria-label={t.increase}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-base">
            <span className="font-medium">{m.common.total}</span>
            <span className="font-display text-xl">
              ${total.toLocaleString()}
            </span>
          </div>

          <Button
            className="mt-6 w-full rounded-full"
            size="lg"
            disabled={!date}
            onClick={reserve}
          >
            {t.reserve}
          </Button>

          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {t.freeCancel}
          </div>
        </div>
      </div>
    </aside>
  );
}
