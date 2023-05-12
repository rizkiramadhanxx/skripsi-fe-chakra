import { useMutation } from '@tanstack/react-query';
import { TAddCategoryRequest } from '../../types/hooksTypes/categoryType';
import CategoryService from '../../service/Dashboard/Category';

export const useAddCategory = () => {
  return useMutation({
    mutationFn: async (data: TAddCategoryRequest) =>
      await CategoryService.addCategory(data),
  });
};
