export const getSafeNextPath = (value: string | null, fallback: string) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
};

export const getAuthPath = (
  pathname: "/login" | "/register",
  next: string,
) => `${pathname}?next=${encodeURIComponent(next)}`;
