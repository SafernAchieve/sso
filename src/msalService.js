import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "b7641369-941f-4610-a609-0296fcbdf100", // Your actual client ID
    authority: "https://login.microsoftonline.com/55700426-340f-4008-a860-088064d96ab2", // Your tenant ID
    redirectUri: "https://witty-wave-05a32ca0f.5.azurestaticapps.net/", // Update with your desired redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // Where your cache will be stored
    storeAuthStateInCookie: true, // Set to true if using Internet Explorer or Edge
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export async function initializeMsal() {
  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise(); // Wait for handleRedirectPromise to resolve
}

export function login(loginRequest = {}) {
  return msalInstance.loginRedirect({
    ...loginRequest,
    scopes: ["user.read"], // Adjust scopes as needed
  });
}

export function getAccount() {
  const currentAccounts = msalInstance.getAllAccounts();
  if (currentAccounts.length === 0) {
    return null;
  }
  return currentAccounts[0];
}

export function logout() {
  msalInstance.logoutRedirect();
}
