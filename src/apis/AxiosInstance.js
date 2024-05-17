import axios from 'axios';
import { API_SERVER } from '@/config';

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_SERVER,
    withCredentials: true,
  });

  return instance;
};

export default AxiosInstance;
