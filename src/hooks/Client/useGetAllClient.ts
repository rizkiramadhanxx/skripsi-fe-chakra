import ClientService from '@/service/Dashboard/Client';
import { useQuery } from '@tanstack/react-query';

export const useGetAllClient = () =>
  useQuery({
    queryKey: ['use-get-client-all'],
    queryFn: async () => await ClientService.getAllClient(),
  });
