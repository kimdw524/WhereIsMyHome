import AxiosInstance from './AxiosInstance';

export const getNews = (offset) => {
  return AxiosInstance.get(`/news?offset=${offset}&limit=8`);
};
