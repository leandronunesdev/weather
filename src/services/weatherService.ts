import api from './api';

export type weatherParams = {
  lat: number;
  lon: number;
  units: string;
};

export const weatherService = {
  get: async (coordinates: weatherParams) => {
    const { lat, lon, units } = coordinates;
    const params = {
      lat: lat,
      lon: lon,
      appid: 'e6e609b01bd5fdb089d2d68c96db1d45',
      units: units,
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
