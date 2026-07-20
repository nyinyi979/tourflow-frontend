export type SearchParams = Record<string, string | string[] | undefined>;

export const getSearchParam = (params: SearchParams, key: string) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

export const getPositivePage = (params: SearchParams) => {
  const value = Number(getSearchParam(params, "page"));
  return Number.isInteger(value) && value > 0 ? value : 1;
};
