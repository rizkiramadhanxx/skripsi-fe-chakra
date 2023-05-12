import { useMutation } from '@tanstack/react-query';
import { TEditBlockImagesRequest } from '../../types/hooksTypes/settingType';
import SettingService from '../../service/Dashboard/Setting';

export const useEditBlockImages = () => {
  return useMutation({
    mutationFn: async (data: TEditBlockImagesRequest) =>
      await SettingService.editBlockImages(data),
  });
};
