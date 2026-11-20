"use client";
import type { Tour } from "../types";
import { TourCard } from "./TourCard";

export default function RelatedCard({ tour }: { tour: Tour }) {
  return <TourCard tour={tour} />;
}
