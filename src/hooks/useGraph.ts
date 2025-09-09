import { useQuery } from "@tanstack/react-query";
import { getGraphToken } from "../service/tokenService";
import { GraphService } from "../service/graphService";

export function useGraphMe(msalInstance: any) {
  return useQuery({
    queryKey: ["graph", "me"],
    queryFn: async () => {
      const token = await getGraphToken(msalInstance);
      return GraphService.getMe(token);
    },
    enabled: !!msalInstance.getActiveAccount(),
  });
}

export function useGraphMail(msalInstance: any, query: string) {
  return useQuery({
    queryKey: ["graph", "mail", query],
    queryFn: async () => {
      const token = await getGraphToken(msalInstance);
      const data = await GraphService.getMail(token, query);
      return data.value || [];
    },
    enabled: !!msalInstance.getActiveAccount(),
  });
}