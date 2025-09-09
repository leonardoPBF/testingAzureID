import { useQuery } from "@tanstack/react-query";
import { getApiToken } from "../service/tokenService";
import { ApiService } from "../service/apiService";

export function useApiUser(msalInstance: any) {
  return useQuery({
    queryKey: ["api", "user"],
    queryFn: async () => {
      const token = await getApiToken(msalInstance);
      return ApiService.getUser(token, msalInstance);
    },
    enabled: !!msalInstance.getActiveAccount(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// export function useApiProtected(msalInstance: any) {
//   return useQuery({
//     queryKey: ["api", "protected"],
//     queryFn: async () => {
//       const token = await getApiToken(msalInstance);
//       return ApiService.getProtected(token, msalInstance);
//     },
//     enabled: !!msalInstance?.getActiveAccount(),
//     retry: 1,
//   });
// }
