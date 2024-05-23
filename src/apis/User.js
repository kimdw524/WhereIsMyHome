import AxiosInstance from './AxiosInstance';

export const getUser = () => {
  return AxiosInstance.get('/user');
};

export const editUser = (body) => {
  return AxiosInstance.put('/user', body);
};

export const signIn = (body) => {
  return AxiosInstance.post('/session', body);
};

export const logOut = () => {
  return AxiosInstance.delete('/session');
};
