import { TAuthLoginRequest } from '../types/hooksTypes/authType';
import ApiService from './ApiServices';
import TokenService from './Token';

const AuthenticationService = {
  login: async (props: TAuthLoginRequest) => {
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
};

export { AuthenticationService };
