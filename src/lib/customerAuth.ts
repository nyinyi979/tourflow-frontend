export const CUSTOMER_TOKEN_KEY = "customerToken";
const CUSTOMER_SESSION_EVENT = "tourflow-customer-session";

export const getCustomerToken = () =>
  typeof window === "undefined"
    ? null
    : localStorage.getItem(CUSTOMER_TOKEN_KEY);

export const setCustomerToken = (token: string) => {
  localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
  window.dispatchEvent(new Event(CUSTOMER_SESSION_EVENT));
};

export const clearCustomerSession = () => {
  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  window.dispatchEvent(new Event(CUSTOMER_SESSION_EVENT));
};

export const hasCustomerSession = () => Boolean(getCustomerToken());

export const subscribeCustomerSession = (listener: () => void) => {
  window.addEventListener(CUSTOMER_SESSION_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(CUSTOMER_SESSION_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
};
