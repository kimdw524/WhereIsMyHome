import axios from 'axios';
import { API_SERVER } from '@/config';

const AxiosInstance = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

export default AxiosInstance;
