import ApiService from '../ApiServices';

const ClientService = {
  getAllClient: async () => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: '/get-all-client',
    };

    try {
      ApiService.setHeader();
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getClientByNumber: async (id: number) => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: '/get-client/' + id,
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

export default ClientService;
