import { useMutation } from '@tanstack/react-query';
import { TEditBlockWebRequest } from '../../types/hooksTypes/settingType';
import SettingService from '../../service/Dashboard/Setting';

export const useEditBlockWeb = () => {
  return useMutation({
    mutationFn: async (data: TEditBlockWebRequest) =>
      await SettingService.editBlockWeb(data),
  });
};
