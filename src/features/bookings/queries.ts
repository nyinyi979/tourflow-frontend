import { queryOptions } from "@tanstack/react-query";
import { getBookingById, getMyBookings } from "./api";

export const bookingKeys = {
  all: ["bookings"] as const,
  mine: () => [...bookingKeys.all, "mine"] as const,
  detail: (id: string | null) => [...bookingKeys.all, "detail", id] as const,
};

export const myBookingsQueryOptions = (enabled = true) =>
  queryOptions({
    queryKey: bookingKeys.mine(),
    queryFn: () => getMyBookings(0, 100),
    enabled,
    retry: false,
  });

export const bookingDetailQueryOptions = (id: string | null) =>
  queryOptions({
    queryKey: bookingKeys.detail(id),
    queryFn: () => getBookingById(id!),
    enabled: Boolean(id),
    retry: false,
  });
