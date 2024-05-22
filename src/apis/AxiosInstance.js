import axios from 'axios';
import { API_SERVER } from '@/config';
import { deleteCookie } from '@/utils/utils.js';

const AxiosInstance = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      deleteCookie('userData');
      location.href = './signin';
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
