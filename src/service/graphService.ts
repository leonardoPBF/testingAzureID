import { graphConfig } from "../authConfig";

async function callGraph(endpoint: string, token: string) {
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const GraphService = {
  getMe: (token: string) => callGraph(graphConfig.graphMeEndpoint, token),
  getMail: (token: string, params = "") =>
    callGraph(`${graphConfig.graphMailEndpoint}${params}`, token),
  getCalendar: (token: string, params = "") =>
    callGraph(`${graphConfig.graphCalendarEndpoint}${params}`, token),
};
