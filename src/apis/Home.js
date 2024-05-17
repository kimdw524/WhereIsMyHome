import AxiosInstance from './AxiosInstance';

export const searchAll = async (query) => {
  const result = AxiosInstance().get(`/home/search?keyword=${query}`);
  return result;
};
