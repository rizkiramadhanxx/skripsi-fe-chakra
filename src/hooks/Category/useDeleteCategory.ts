import { useMutation } from '@tanstack/react-query';
import CategoryService from '../../service/Dashboard/Category';
import { TDeleteCategoryRequest } from '../../types/hooksTypes/categoryType';

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (data: TDeleteCategoryRequest) =>
      await CategoryService.deleteCategory(data),
  });
};
