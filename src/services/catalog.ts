import { Activity, ActivityListResponse, ActivityQuery } from "@/types/activity";
import { DataResponse } from "@/types/api";
import { CategoryListResponse } from "@/types/category";
import { TestimonialListResponse } from "@/types/testimonial";
import { Tour, TourListResponse, TourQuery } from "@/types/tour";
import { apiFetch } from "./api";

export const getTours = (query: TourQuery) =>
  apiFetch<TourListResponse>({ endpoint: "tour", query });

export const getTourById = (id: string) =>
  apiFetch<DataResponse<Tour>>({ endpoint: `tour/${id}` });

export const getActivities = (query: ActivityQuery) =>
  apiFetch<ActivityListResponse>({ endpoint: "activity", query });

export const getActivityById = (id: string) =>
  apiFetch<DataResponse<Activity>>({ endpoint: `activity/${id}` });

export const getCategories = (type: "tour" | "activity") =>
  apiFetch<CategoryListResponse>({
    endpoint: "category/all",
    query: { type },
  });

export const getTestimonials = (page = 0, perPage = 20) =>
  apiFetch<TestimonialListResponse>({
    endpoint: "testimonial",
    query: { page, perPage },
  });
