import axios from 'axios';
import TokenService from './TokenService';
import { AuthenticationService } from './AuthService';

const ApiService = {
  _401interceptor: null || 0,

  init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  },

  customRequest(data: object) {
    return axios(data);
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  setHeader(token = TokenService.getToken()) {
    axios.defaults.headers.common['Authorization'] = token;
  },

  unmount401Interceptor() {
    axios.interceptors.response.eject(this._401interceptor);
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      (next) => {
        return next;
      },
      async function (err) {
        if (err.response.status === 401) {
          if (err.config.url.includes('login')) {
            AuthenticationService.Logout();
            throw err;
          } else {
            try {
              const res = await AuthenticationService.refreshToken();
              TokenService.saveRefreshToken(res?.data?.data.refresh_token);
              TokenService.saveToken(res?.data?.data.token);
            } catch (err) {
              throw err;
            }
          }
        }
        if (err.response.status === 422) {
          AuthenticationService.Logout();
          window.location.reload();
        }
        throw err;
      }
    );
  },
};

export default ApiService;
