import {
  TEditBlockImagesRequest,
  TEditBlockWebRequest,
} from '../../types/hooksTypes/settingType';
import ApiService from '../ApiServices';

const SettingService = {
  getSetting: async () => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: '/setting',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  editBlockWeb: async (data: TEditBlockWebRequest) => {
    const requestData = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      url: '/edit-list-block-web',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  editBlockImages: async (data: TEditBlockImagesRequest) => {
    const requestData = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      url: '/edit-block-image',
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

export default SettingService;
