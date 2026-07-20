import { apiFetch } from "@/lib/api/client";
import type { CategoryType } from "@/lib/api/types";
import type { CategoryListResponse } from "./types";

export const getCategories = (type: CategoryType) =>
  apiFetch<CategoryListResponse>({
    endpoint: "category/all",
    query: { type },
  });
