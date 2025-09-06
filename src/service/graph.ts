import { IPublicClientApplication } from "@azure/msal-browser";
import { graphConfig } from "../authConfig";
import { getGraphToken } from "./tokenService";

async function callGraph(msalInstance: IPublicClientApplication, endpoint: string) {
  const response = await getGraphToken(msalInstance);

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${response.accessToken}`);

  const res = await fetch(endpoint, { headers });
  return res.ok ? res.json() : Promise.reject(await res.text());
}

export const GraphService = {
  getMe: (msalInstance) => callGraph(msalInstance, graphConfig.graphMeEndpoint),
  getMail: (msalInstance, params = "") =>
    callGraph(msalInstance, `${graphConfig.graphMailEndpoint}${params}`),
  getCalendar: (msalInstance, params = "") =>
    callGraph(msalInstance, `${graphConfig.graphCalendarEndpoint}${params}`)
};
