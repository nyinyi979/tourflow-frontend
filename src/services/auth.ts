import {
  CustomerLoginRequest,
  CustomerLoginResponse,
  CustomerResponse,
  CustomerSignupRequest,
} from "@/types/customer";
import { apiFetch } from "./api";

export const loginCustomer = (body: CustomerLoginRequest) =>
  apiFetch<CustomerLoginResponse>({
    endpoint: "customer/login",
    method: "POST",
    body,
  });

export const signupCustomer = (body: CustomerSignupRequest) =>
  apiFetch<CustomerResponse>({
    endpoint: "customer/signup",
    method: "POST",
    body,
  });

export const getCustomerMe = () =>
  apiFetch<CustomerResponse>({
    endpoint: "customer/me",
    authenticated: true,
  });
