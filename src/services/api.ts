import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/';
const api = axios.create({
  baseURL,
});

export default api;
