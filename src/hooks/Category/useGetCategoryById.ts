import { useQuery } from '@tanstack/react-query';
import CategoryService from '../../service/Dashboard/Category';
import { TGetCategoryByIdRequest } from '../../types/hooksTypes/categoryType';

export const useGetCategoryById = (data: TGetCategoryByIdRequest) => {
  return useQuery({
    queryKey: ['use-get-category-by-id', data],
    queryFn: async () => await CategoryService.getCategoryById(data),
  });
};
