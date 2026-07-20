import { queryOptions } from "@tanstack/react-query";
import { getCustomerMe } from "./api";

export const customerKeys = {
  all: ["customer"] as const,
  me: () => [...customerKeys.all, "me"] as const,
};

export const customerMeQueryOptions = (enabled = true) =>
  queryOptions({
    queryKey: customerKeys.me(),
    queryFn: getCustomerMe,
    enabled,
    retry: false,
  });
