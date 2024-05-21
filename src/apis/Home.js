import AxiosInstance from './AxiosInstance';

export const searchAll = (query) => {
  return AxiosInstance.get(`/home/search?keyword=${query}`);
};

export const getMatchHome = (body) => {
  return AxiosInstance.post('/home', body);
};

export const getHomeDetail = (houseCode) => {
  return AxiosInstance.post(`/home/${houseCode}`, {
    isDeal: true,
    isFullRent: true,
    isMonthlyRent: true,
    startDealAmount: 0,
    endDealAmount: 999999999,
    startDeposit: 0,
    endDeposit: 999999999,
    startRentCost: 0,
    endRentCost: 999999999,
  });
};

export const getDebate = (houseCode) => {
  return AxiosInstance.get(`/home/${houseCode}/tok`);
};

export const writeDebate = (houseCode, content) => {
  return AxiosInstance.post(`/home/${houseCode}/tok`, { content });
};

export const deleteDebate = (houseCode, id) => {
  return AxiosInstance.delete(`/home/${houseCode}/tok/${id}`);
};

export const setStar = (houseCode) => {
  return AxiosInstance.put(`/home/favorite`, { houseCode });
};

export const removeStar = (houseCode) => {
  return AxiosInstance.delete(`/home/favorite`, { data: { houseCode } });
};

export const getInterest = () => {
  return AxiosInstance.get('/home/favorite');
};
