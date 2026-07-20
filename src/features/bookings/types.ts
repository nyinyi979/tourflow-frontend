import {
  BookingItemType,
  BookingStatus,
  DataResponse,
  PaginatedResponse,
  PaginationQuery,
} from "@/lib/api/types";

export interface Booking {
  id: string;
  bookingNumber: string;
  customer: { name: string; email: string; avatar: string | null } | null;
  tour: { name: string; type: BookingItemType };
  tourId: string | null;
  activityId: string | null;
  customerId: string;
  travelDate: string;
  createdAt: string;
  guests: { adults: number; children: number };
  totalPrice: number;
  status: BookingStatus;
  activity: Array<{ at: string; label: string }>;
}

export interface BookableItem {
  id: string;
  itemType: BookingItemType;
  title: string;
  image: string | null;
  price: number;
  duration: number;
  category: string;
}

export type CreateBookingRequest = {
  travelDate: string;
  adults: number;
  children?: number;
} &
  (
    | { itemType: "tour"; tourId: string; activityId?: null }
    | { itemType: "activity"; activityId: string; tourId?: null }
  );

export type BookingResponse = DataResponse<Booking>;
export type BookingListResponse = PaginatedResponse<Booking, PaginationQuery>;

export interface UpdateBookingRequest {
  travelDate?: string;
  adults?: number;
  children?: number;
  status?: BookingStatus;
}
