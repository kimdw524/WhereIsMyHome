import AxiosInstance from './AxiosInstance';

export const getBoardList = (board, page) => {
  return AxiosInstance.get(`/${board}?page=${page}`);
};

export const writePost = (board, body) => {
  return AxiosInstance.post(`/${board}`, body);
};

export const editPost = (id, body) => {
  return AxiosInstance.put(`/board/${id}`, body);
};

export const readPost = (board, id) => {
  return AxiosInstance.get(`/${board}/${id}`);
};

export const getComments = (id) => {
  return AxiosInstance.get(`/board/${id}/comments`);
};

export const writeComment = (id, content) => {
  return AxiosInstance.post(`/board/${id}/comments`, { content });
};

export const deleteComment = (postId, id) => {
  return AxiosInstance.delete(`/board/${postId}/comments/${id}`);
};

export const deletePost = (board, id) => {
  return AxiosInstance.delete(`/${board}/${id}`);
};
