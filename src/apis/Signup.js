import AxiosInstance from './AxiosInstance';

export const validateEmail = (email) => {
  return AxiosInstance.post(`/validation/email`, {
    email,
  });
};

export const validatePassword = (password) => {
  return AxiosInstance.post(`/validation/password`, {
    password,
  });
};

export const validateName = (name) => {
  return AxiosInstance.post(`/validation/name`, {
    name,
  });
};

export const validateTelephone = (telephone) => {
  return AxiosInstance.post(`/validation/telephone`, {
    telephone,
  });
};

export const signUp = (body) => {
  return AxiosInstance.post('/user', body);
};

export const kakaoOAuth = (body) => {
  return AxiosInstance.post('/oauth2/login', body);
};

export const findPassword = (body) => {
  return AxiosInstance.post('/user/findpassword', body);
};
