import type { ApiSuccessResponse, DataResponse } from "@/lib/api/types";

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  registeredAt: string;
}

export interface CustomerLoginRequest {
  email: string;
  password: string;
}

export interface CustomerSignupRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
}

export type CustomerLoginResponse = ApiSuccessResponse & {
  customer: Customer;
  token: string;
};

export type CustomerResponse = DataResponse<Customer>;
