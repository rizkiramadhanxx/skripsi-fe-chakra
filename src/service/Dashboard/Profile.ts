import ApiService from '../ApiServices';

const DashboardService = {
  profile: async () => {
    const requestData = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: '/profile',
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

export default DashboardService;
