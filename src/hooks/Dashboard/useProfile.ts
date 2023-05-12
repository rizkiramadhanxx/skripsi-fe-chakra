import { useQuery } from '@tanstack/react-query';
import DashboardService from '../../service/Dashboard/Profile';

export const useProfile = () => {
  return useQuery({
    queryKey: ['use-profile'],
    queryFn: async () => await DashboardService.profile(),
  });
};
