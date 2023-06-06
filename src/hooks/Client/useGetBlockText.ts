import ClientService from "@/service/Dashboard/Client";
import { useQuery } from "@tanstack/react-query";

export const useGetBlockText = () =>
  useQuery({
    queryKey: ["use-get-all-text"],
    queryFn: async () => await ClientService.getAllBlockText(),
  });
