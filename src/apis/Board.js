import AxiosInstance from './AxiosInstance';

export const getBoardList = (board, page) => {
  return AxiosInstance.get(`/${board}?page=${page}`);
};

export const writePost = (board, body) => {
  return AxiosInstance.post(`/${board}`, body);
};

export const readPost = (board, id) => {
  return AxiosInstance.get(`/${board}/${id}`);
};
