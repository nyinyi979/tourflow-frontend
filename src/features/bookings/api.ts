import {
  BookingListResponse,
  BookingResponse,
  CreateBookingRequest,
  PayBookingRequest,
  UpdateBookingRequest,
} from "./types";
import { apiFetch } from "@/lib/api/client";

export const createBooking = (body: CreateBookingRequest) =>
  apiFetch<BookingResponse>({
    endpoint: "booking",
    method: "POST",
    authenticated: true,
    unauthorizedPath: "/register",
    body,
  });

export const getMyBookings = (page = 0, perPage = 20) =>
  apiFetch<BookingListResponse>({
    endpoint: "booking/mine",
    authenticated: true,
    query: { page, perPage },
  });

export const getBookingById = (id: string) =>
  apiFetch<BookingResponse>({
    endpoint: `booking/${id}`,
    authenticated: true,
  });

export const updateBooking = (id: string, body: UpdateBookingRequest) =>
  apiFetch<BookingResponse>({
    endpoint: `booking/${id}`,
    method: "PUT",
    authenticated: true,
    body,
  });

export const payBooking = (id: string, body: PayBookingRequest) =>
  apiFetch<BookingResponse>({
    endpoint: `booking/${id}/payment`,
    method: "POST",
    authenticated: true,
    body,
  });
