import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest, graphConfig } from "../authConfig";

async function callGraph(msalInstance: IPublicClientApplication, endpoint: string) {
  const account = msalInstance.getActiveAccount();
  if (!account) throw Error("No active account");

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account
  });

  const headers = getUserHeaders(response.accessToken);
  const res = await fetch(endpoint, { headers });

  return res.ok ? res.json() : Promise.reject(await res.text());
}

function getUserHeaders(token: string): Headers {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
}
export const GraphService = {
  getMe: (msalInstance) =>
    callGraph(msalInstance, graphConfig.graphMeEndpoint),

  getMail: (msalInstance, params = "") =>
    callGraph(msalInstance, `${graphConfig.graphMailEndpoint}${params}`),

  getCalendar: (msalInstance, params = "") =>
    callGraph(msalInstance, `${graphConfig.graphCalendarEndpoint}${params}`)
};


