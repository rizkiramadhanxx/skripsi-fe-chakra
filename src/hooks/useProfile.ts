import { AuthenticationService } from '@/service/AuthService';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: ['use-profile'],
    queryFn: async () => await AuthenticationService.Profile(),
  });
};
