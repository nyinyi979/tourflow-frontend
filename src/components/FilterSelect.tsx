"use client";

import { useId, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Radix item values can't be empty, so "no filter" uses a sentinel. */
const ALL = "__all__";

/**
 * Custom dropdown cell for the catalog filter strip. The chosen value is
 * mirrored into a hidden input so the plain GET form still submits it.
 */
export function FilterSelect({
  name,
  label,
  emptyLabel,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  emptyLabel: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue || ALL);

  return (
    <div className="grid content-start gap-1 border-b border-foreground/25 px-4 pb-2 pt-3 focus-within:bg-background lg:border-b-0 lg:border-r">
      <span id={`${id}-label`} className="label-mono text-muted-foreground">
        {label}
      </span>
      <input type="hidden" name={name} value={value === ALL ? "" : value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          id={`${id}-trigger`}
          aria-labelledby={`${id}-label ${id}-trigger`}
          className="h-9 border-0 bg-transparent px-0 hover:border-0 focus-visible:ring-0"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start" className="-ml-4 min-w-[calc(var(--radix-select-trigger-width)+2rem)]">
          <SelectItem value={ALL}>{emptyLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
