import { useMutation } from '@tanstack/react-query';
import { TEditCategoryRequest } from '../../types/hooksTypes/categoryType';
import CategoryService from '../../service/Dashboard/Category';

export const useEditCategory = () => {
  return useMutation({
    mutationFn: async (data: TEditCategoryRequest) =>
      await CategoryService.editCategory(data),
  });
};
