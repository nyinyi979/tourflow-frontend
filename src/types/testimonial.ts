import { PaginatedResponse, PaginationQuery } from "./api";

export interface Testimonial {
  id: string;
  name: string;
  avatar: string | null;
  quote: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type TestimonialListResponse = PaginatedResponse<
  Testimonial,
  PaginationQuery
>;
