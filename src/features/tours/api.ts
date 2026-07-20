import { apiFetch } from "@/lib/api/client";
import type { DataResponse } from "@/lib/api/types";
import type { Tour, TourListResponse, TourQuery } from "./types";

export const getTours = (query: TourQuery) =>
  apiFetch<TourListResponse>({ endpoint: "tour", query });

export const getTourById = (id: string) =>
  apiFetch<DataResponse<Tour>>({ endpoint: `tour/${id}` });
