import {
  TAddCategoryRequest,
  TDeleteCategoryRequest,
  TEditCategoryRequest,
  TGetCategoryByIdRequest,
} from '../../types/hooksTypes/categoryType';
import ApiService from '../ApiServices';

const CategoryService = {
  getCategory: async () => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: '/get-category-list',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteCategory: async (data: TDeleteCategoryRequest) => {
    const requestData = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: data,
      url: '/delete-category-list',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  addCategory: async (data: TAddCategoryRequest) => {
    const requestData = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: data,
      url: '/add-category-list',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  editCategory: async (data: TEditCategoryRequest) => {
    const requestData = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: data,
      url: '/edit-category-list',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getCategoryById: async (data: TGetCategoryByIdRequest) => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `/get-category-by-id?id=${data.id}`,
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default CategoryService;
