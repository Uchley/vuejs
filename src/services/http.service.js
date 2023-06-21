import axios from 'axios';
import authService from './auth.service';
import router from '../router';



const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:8080/';
let config = {
  baseURL: `${API_ENDPOINT}api/`
};

const httpClient = axios.create(config);

// Add CORS headers
httpClient.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8081';
httpClient.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT, UPDATE';

const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${authService.getToken()}`;
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      router.push({ name: 'login' });
    }
  
    return Promise.reject(error);
  }
);

export default httpClient;