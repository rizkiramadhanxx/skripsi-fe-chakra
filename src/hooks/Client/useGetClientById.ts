import ClientService from '@/service/Dashboard/Client';
import { useQuery } from '@tanstack/react-query';

export const useGetClientByNumber = (number: number) =>
  useQuery({
    queryKey: ['use-get-client-by-number', number],
    queryFn: async () => await ClientService.getClientByNumber(number),
  });
