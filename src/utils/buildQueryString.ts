export function buildQueryString(params: Record<string, unknown> | undefined) {
  if (!params) return "";

  let queryString = "";
  Object.entries(params).forEach(([key, value], index) => {
    if (index === 0) {
      queryString = `${key}=${value}`;
    } else {
      queryString = `${queryString}&${key}=${value}`;
    }
  });
  return queryString;
}
