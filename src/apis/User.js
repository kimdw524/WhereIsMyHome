import AxiosInstance from './AxiosInstance';

export const signIn = (body) => {
  return AxiosInstance().post('/session', body);
};
