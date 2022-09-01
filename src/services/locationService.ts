import api from './api';

export const locationService = {
  get: async (query: string) => {
    const params = {
      q: query,
      appid: 'e6e609b01bd5fdb089d2d68c96db1d45',
    };
    try {
      const data = api.get('geo/1.0/direct', { params });
      return data as any;
    } catch (error) {
      return error;
    }
  },
};
