"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Users } from "lucide-react";
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
      <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
        <div className="border border-foreground bg-card">
          <div className="flex items-baseline justify-between gap-3 border-b border-foreground px-5 py-4">
            <span className="text-heading text-foreground">
              ${activity.price.toLocaleString()}
            </span>
            <span className="label-price text-muted-foreground">{m.common.perPerson}</span>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <label htmlFor="activity-date" className="label-mono mb-2 block text-muted-foreground">
                {m.common.date}
              </label>
              <Input
                id="activity-date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div>
              <span className="label-mono mb-2 block text-muted-foreground">
                {m.common.guests}
              </span>
              <div className="flex items-center justify-between border border-input bg-card pl-3">
                <div className="flex items-center gap-2 text-[0.9375rem]">
                  <Users aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-muted-foreground" />
                  {t.people(guests)}
                </div>
                <div className="flex items-center">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 border-l border-input"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    aria-label={t.decrease}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 border-l border-input"
                    onClick={() => setGuests(guests + 1)}
                    aria-label={t.increase}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-baseline justify-between border-t border-foreground pt-3">
              <span className="text-subheading text-foreground">{m.common.total}</span>
              <span className="text-subheading text-foreground">
                ${total.toLocaleString()}
              </span>
            </div>

            <Button className="w-full" size="lg" disabled={!date} onClick={reserve}>
              {t.reserve}
            </Button>
          </div>

          <p className="label-price flex items-center gap-2 border-t border-foreground/25 px-5 py-3 text-muted-foreground">
            <ShieldCheck aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-foreground" />
            {t.freeCancel}
          </p>
        </div>
      </div>
    </aside>
  );
}
