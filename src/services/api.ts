import { clearCustomerSession, getCustomerToken } from "@/lib/customerAuth";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiRequest extends Omit<RequestInit, "body"> {
  endpoint: string;
  query?: object;
  body?: unknown;
  authenticated?: boolean;
}

const getApiBaseUrl = () => {
  const value = process.env.NEXT_PUBLIC_FETCH_URL;
  if (!value) throw new Error("NEXT_PUBLIC_FETCH_URL is not configured");
  return value.replace(/\/$/, "");
};

export const apiFetch = async <T>({
  endpoint,
  query,
  body,
  authenticated,
  ...init
}: ApiRequest): Promise<T> => {
  const url = new URL(`${getApiBaseUrl()}/${endpoint.replace(/^\//, "")}`);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const headers = new Headers(init.headers);
  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (authenticated) {
    const token = getCustomerToken();
    if (token) headers.set("x-access-token", token);
  }

  const response = await fetch(url, {
    ...init,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      clearCustomerSession();
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.assign(`/login?next=${encodeURIComponent(next)}`);
    }
    throw new ApiError(
      result?.message ?? `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return result as T;
};
