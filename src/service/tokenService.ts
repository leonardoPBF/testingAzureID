import { IPublicClientApplication } from "@azure/msal-browser";
import { loginRequest, loginRequestBack } from "../authConfig";

export async function getGraphToken(msalInstance: IPublicClientApplication) {
  const account = msalInstance.getActiveAccount();
  if (!account) throw Error("No active account");

  return msalInstance.acquireTokenSilent(loginRequest);
}

export async function getApiToken(msalInstance: IPublicClientApplication) {
  const account = msalInstance.getActiveAccount();
  if (!account) throw Error("No active account");

  return msalInstance.acquireTokenSilent(loginRequestBack);
}
