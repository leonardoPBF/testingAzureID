import { useQuery } from "@tanstack/react-query";
import { getApiToken, getGraphToken } from "../service/tokenService";
import { ApiService } from "../service/apiService";
import { GraphService } from "../service/graphService";

export function useCombinedAuth(msalInstance: any) {
  return useQuery({
    queryKey: ["combined", "auth"],
    queryFn: async () => {
      const [apiToken, graphToken] = await Promise.all([
        getApiToken(msalInstance),
        getGraphToken(msalInstance)
      ]);

      const [graphUser, apiUser] = await Promise.all([
        GraphService.getMe(graphToken),
        ApiService.getUser(apiToken, msalInstance)
      ]);

      return {
        tokens: { apiToken, graphToken },
        user: {
          graph: graphUser,
          api: apiUser
        }
      };
    },
    enabled: !!msalInstance?.getActiveAccount(),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}