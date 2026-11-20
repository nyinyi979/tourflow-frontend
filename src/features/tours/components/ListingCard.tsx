"use client";
import type { Tour } from "../types";
import { TourCard } from "./TourCard";

export default function ListingCard({ tour }: { tour: Tour }) {
  return (
    <TourCard
      tour={tour}
      showDescription
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
    />
  );
}
