import { CreateReviewRequest, ReviewResponse } from "@/types/review";
import { apiFetch } from "./api";

export const createReview = (body: CreateReviewRequest) =>
  apiFetch<ReviewResponse>({
    endpoint: "review",
    method: "POST",
    authenticated: true,
    body,
  });
