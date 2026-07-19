import { CategoryType, DataResponse } from "./api";

export interface Category {
  id: string;
  slug: string;
  label: string;
  image: string | null;
  type: CategoryType;
}

export type CategoryListResponse = DataResponse<Category[]>;
