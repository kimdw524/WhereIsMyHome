import AxiosInstance from './AxiosInstance';

export const searchAll = (query) => {
  return AxiosInstance().get(`/home/search?keyword=${query}`);
};

export const getMatchHome = (body) => {
  return AxiosInstance().post('home', body);
};
