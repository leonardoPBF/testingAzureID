import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest, loginRequestBack } from "../authConfig";

async function acquireToken(msalInstance: IPublicClientApplication, request: any) {
  const account = msalInstance.getActiveAccount();
  if (!account) throw Error("No active account");

  const response = await msalInstance.acquireTokenSilent({
    ...request,
    account,
  });

  return response.accessToken;
}

export async function getGraphToken(msalInstance: IPublicClientApplication) {
  return acquireToken(msalInstance, loginRequest);
}

export async function getApiToken(msalInstance: IPublicClientApplication) {
  return acquireToken(msalInstance, loginRequestBack);
}
