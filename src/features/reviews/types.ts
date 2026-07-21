import type { DataResponse } from "@/lib/api/types";

export interface PublicReview {
  id: string;
  customerName: string;
  avatar: string | null;
  reviewedAt: string;
  rating: number;
  comment: string;
}

export interface CreateReviewRequest {
  tourId: string;
  rating: number;
  comment: string;
}

export type ReviewResponse = DataResponse<PublicReview>;
