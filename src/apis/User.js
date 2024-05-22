import AxiosInstance from './AxiosInstance';

export const signIn = (body) => {
  return AxiosInstance.post('/session', body);
};

export const logOut = () => {
  return AxiosInstance.delete('/session');
};
