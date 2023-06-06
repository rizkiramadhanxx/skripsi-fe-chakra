import ClientService from "@/service/Dashboard/Client";
import { useQuery } from "@tanstack/react-query";

export const useGetBlockWeb = () =>
  useQuery({
    queryKey: ["use-get-all-web"],
    queryFn: async () => await ClientService.getAllBlockWeb(),
  });
