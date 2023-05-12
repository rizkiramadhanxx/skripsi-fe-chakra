import { useQuery } from '@tanstack/react-query';
import SettingService from '../../service/Dashboard/Setting';

export const useGetSetting = () => {
  return useQuery({
    queryKey: ['use-get-setting'],
    queryFn: async () => await SettingService.getSetting(),
  });
};
