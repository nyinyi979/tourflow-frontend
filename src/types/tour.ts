import { PaginatedResponse, PaginationQuery, SortOrder } from "./api";
import { PublicReview } from "./review";

export interface TourImage {
  id: string;
  url: string;
}

export interface TourHighlight {
  id: string;
  label: string;
}

export interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  difficulty: string;
  categoryId: string;
  category: string;
  capacity: number;
  rating: number;
  reviewCount: number;
  popularity: number;
  images: TourImage[];
  highlights: TourHighlight[];
  itinerary: ItineraryDay[];
  reviews: PublicReview[];
  createdAt: string;
  updatedAt: string;
}

export interface TourQuery extends PaginationQuery {
  query?: string;
  categoryId?: string;
  difficulty?: string;
  sortBy?: string;
  orderBy?: SortOrder;
}

export type TourListResponse = PaginatedResponse<Tour, TourQuery>;
