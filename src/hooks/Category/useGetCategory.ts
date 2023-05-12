import { useQuery } from '@tanstack/react-query';
import CategoryService from '../../service/Dashboard/Category';

export const useGetCategory = () =>
  useQuery({
    queryKey: ['use-get-category'],
    queryFn: async () => await CategoryService.getCategory(),
  });
