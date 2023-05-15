import { useMutation } from '@tanstack/react-query';
import CategoryService from '../../service/Dashboard/Category';
import { TEditManyCategory } from '../../types/hooksTypes/categoryType';

export const useEditManyCategory = () => {
  return useMutation({
    mutationFn: async (data: TEditManyCategory) =>
      await CategoryService.editManyCategory(data),
  });
};
