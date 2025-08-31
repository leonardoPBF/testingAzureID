function buildQuery(params: Record<string, string>) {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return query ? `?${query}` : "";
}
export const QueryService = {
  buildQuery
};