import api from './api';

export type weatherParams = {
  lat: number;
  lon: number;
};

export const weatherService = {
  get: async (coordinates: weatherParams) => {
    const { lat, lon } = coordinates;
    const params = {
      lat: lat,
      lon: lon,
      appid: 'e6e609b01bd5fdb089d2d68c96db1d45',
      units: 'metric',
      exclude: 'current,minutely,hourly,alerts',
    };

    try {
      const { data } = await api.get('data/3.0/onecall', { params });
      return data;
    } catch (error) {
      return error;
    }
  },
};
