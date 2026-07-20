import type { CategoryType, DataResponse } from "@/lib/api/types";

export interface Category {
  id: string;
  slug: string;
  label: string;
  image: string | null;
  type: CategoryType;
}

export type CategoryListResponse = DataResponse<Category[]>;
