type TDeleteCategoryRequest = {
  id: string;
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
  TEditCategoryRequest,
  TGetCategoryByIdRequest,
};

export type TEditManyCategory = {
  data: {
    id: string;
    status: boolean;
  };
};
