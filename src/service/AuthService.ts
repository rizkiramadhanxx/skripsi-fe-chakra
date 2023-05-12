import { TLoginForm, TRegisterForm } from '@/types/form';
import ApiService from './ApiService';
import TokenService from './TokenService';

const AuthenticationService = {
  login: async (props: TLoginForm) => {
    const requestData = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: props,
      url: `/login`,
    };
    try {
      const response = await ApiService.customRequest(requestData);
      TokenService.saveToken(response.data.data.token);
      TokenService.saveRefreshToken(response.data.data.refresh_token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  register: async (props: TRegisterForm) => {
    const requestData = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: props,
      url: `/register`,
    };
    try {
      const response = await ApiService.customRequest(requestData);
      TokenService.saveToken(response.data.data.token);
      TokenService.saveRefreshToken(response.data.data.refresh_token);
      return response;
    } catch (error) {
      throw console.log(error);
    }
  },

  Logout: () => {
    ApiService.removeHeader();
    TokenService.removeToken();
    TokenService.removeRefreshToken();
  },

  refreshToken: async () => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      url: '/refreshToken',
    };
    try {
      ApiService.setHeader(TokenService.getRefreshToken());
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  Profile: async () => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: '/me',
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

export { AuthenticationService };
