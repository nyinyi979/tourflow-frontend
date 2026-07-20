import type { CreateReviewRequest, ReviewResponse } from "./types";
import { apiFetch } from "@/lib/api/client";

export const createReview = (body: CreateReviewRequest) =>
  apiFetch<ReviewResponse>({
    endpoint: "review",
    method: "POST",
    authenticated: true,
    body,
  });
