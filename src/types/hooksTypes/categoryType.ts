type TDeleteCategoryRequest = {
  id: string;
};

type TAddCategoryRequest = {
  list: string[];
  name: string;
  status: boolean;
};

type TEditCategoryRequest = {
  list: string[];
  name: string;
  id: number | string;
  status: boolean;
};

type TGetCategoryByIdRequest = {
  id: string;
};

export type {
  TDeleteCategoryRequest,
  TAddCategoryRequest,
  TEditCategoryRequest,
  TGetCategoryByIdRequest,
};
