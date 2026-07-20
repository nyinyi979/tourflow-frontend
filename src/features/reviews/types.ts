import type { DataResponse } from "@/lib/api/types";

export interface PublicReview {
  id: string;
  name: string;
  avatar: string | null;
  date: string;
  rating: number;
  comment: string;
}

export interface CreateReviewRequest {
  tourId: string;
  rating: number;
  comment: string;
}

export type ReviewResponse = DataResponse<PublicReview>;
