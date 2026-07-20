import { apiFetch } from "@/lib/api/client";
import type { TestimonialListResponse } from "./types";

export const getTestimonials = (page = 0, perPage = 20) =>
  apiFetch<TestimonialListResponse>({
    endpoint: "testimonial",
    query: { page, perPage },
  });
