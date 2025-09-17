import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "3d7c6395-07ae-461b-82fb-4776ba1af653",
    authority: "https://login.microsoftonline.com/98201fef-d9f6-4e68-84f5-c2705074e342",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "sessionStorage", 
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig); 

export const loginRequestBack = {
  scopes: [
    "api://3d7c6395-07ae-461b-82fb-4776ba1af653/access"
  ]
};

export const loginRequest = {
  scopes: [
    "User.Read",       // datos básicos de usuario
    "Mail.Read",       // correos
    "Calendars.Read",  // calendario
    "User.ReadBasic.All",
  ]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
  graphCalendarEndpoint: "https://graph.microsoft.com/v1.0/me/events"
};

