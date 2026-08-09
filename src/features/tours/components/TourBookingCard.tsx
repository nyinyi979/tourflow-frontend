"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Tour } from "../types";

export default function TourBookingCard({ tour }: { tour: Tour }) {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const total = tour.price * (adults + children * 0.5);

  const book = () => {
    if (!date) return;
    const search = new URLSearchParams({
      itemType: "tour",
      itemId: tour.id,
      date: date.toISOString().slice(0, 10),
      adults: String(adults),
      children: String(children),
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
              ${tour.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">/ person</span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start rounded-md text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(day) => day < new Date()}
                    initialFocus
                    className="pointer-events-auto p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <GuestStepper
              label="Adults"
              sub="Age 13+"
              value={adults}
              onChange={setAdults}
              min={1}
            />
            <GuestStepper
              label="Children"
              sub="Age 2–12 · half price"
              value={children}
              onChange={setChildren}
            />
          </div>

          <div className="mt-6 space-y-2 border-t border-border/60 pt-4 text-sm">
            <PriceRow
              label={`Adults × ${adults}`}
              value={`$${(tour.price * adults).toLocaleString()}`}
            />
            {children > 0 && (
              <PriceRow
                label={`Children × ${children}`}
                value={`$${(tour.price * children * 0.5).toLocaleString()}`}
              />
            )}
            <PriceRow
              label="Total"
              value={`$${total.toLocaleString()}`}
              bold
            />
          </div>

          <Button
            className="mt-6 w-full rounded-full"
            size="lg"
            onClick={book}
            disabled={!date}
          >
            Book now
          </Button>

          <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Free cancellation up to 30 days out
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Instant confirmation
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function PriceRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        bold && "pt-2 text-base font-medium text-foreground",
      )}
    >
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function GuestStepper({
  label,
  sub,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  sub?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="w-6 text-center text-sm font-medium">{value}</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
