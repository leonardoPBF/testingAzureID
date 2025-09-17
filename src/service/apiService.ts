import { getGraphToken } from "./tokenService";

async function callApi(endpoint: string, apiToken: string, graphToken: string){
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7071';
  const fullUrl = `${baseUrl}${endpoint}`;
  
  console.log(`Making API call to: ${fullUrl}`);
  console.log(`API Token length: ${apiToken.length}`);
  console.log(`Graph Token length: ${graphToken.length}`);

  const res = await fetch(fullUrl, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${apiToken}`,
      'X-Graph-Token': graphToken,
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API call failed: ${res.status} - ${errorText}`);
    throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
  }
  
  return res.json();
}

export const ApiService = {
  getUser: async (apiToken: string, msalInstance: any) => {
    const graphToken = await getGraphToken(msalInstance);
    return callApi("/api/user", apiToken, graphToken);
  },
  
  getOrders: async (apiToken: string, msalInstance: any) => {
    const graphToken = await getGraphToken(msalInstance);
    return callApi("/api/orders", apiToken, graphToken);
  },

  // Add more methods as needed
  getProtected: async (apiToken: string, msalInstance: any) => {
    const graphToken = await getGraphToken(msalInstance);
    return callApi("/api/protected", apiToken, graphToken);
  },
};