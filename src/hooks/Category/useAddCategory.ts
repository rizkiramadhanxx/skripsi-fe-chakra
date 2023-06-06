import { useMutation } from "@tanstack/react-query";
import CategoryService from "../../service/Dashboard/Category";

type TAddCategoryRequest = any;
export const useAddCategory = () => {
  return useMutation({
    mutationFn: async (data: TAddCategoryRequest) =>
      await CategoryService.addCategory(data),
  });
};
