import type {
  PaginatedResponse,
  PaginationQuery,
  SortOrder,
} from "@/lib/api/types";

export interface ActivityImage {
  id: string;
  url: string;
}

export interface ActivityLabel {
  id: string;
  label: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string | null;
  price: number;
  duration: number;
  categoryId: string;
  category: { label: string };
  rating: number;
  meetingPoint: string | null;
  images: ActivityImage[];
  highlights: ActivityLabel[];
  included: ActivityLabel[];
  createdAt: string;
  updatedAt: string;
}

export interface ActivityQuery extends PaginationQuery {
  query?: string;
  categoryId?: string;
  sortBy?: "title" | "price" | "duration" | "rating" | "createdAt";
  orderBy?: SortOrder;
}

export type ActivityListResponse = PaginatedResponse<Activity, ActivityQuery>;
