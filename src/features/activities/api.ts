import { apiFetch } from "@/lib/api/client";
import type { DataResponse } from "@/lib/api/types";
import type { Activity, ActivityListResponse, ActivityQuery } from "./types";

export const getActivities = (query: ActivityQuery) =>
  apiFetch<ActivityListResponse>({ endpoint: "activity", query });

export const getActivityById = (id: string) =>
  apiFetch<DataResponse<Activity>>({ endpoint: `activity/${id}` });
