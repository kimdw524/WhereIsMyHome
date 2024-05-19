import AxiosInstance from './AxiosInstance';

export const searchAll = (query) => {
  return AxiosInstance().get(`/home/search?keyword=${query}`);
};

export const getMatchHome = (body) => {
  return AxiosInstance().post('/home', body);
};

export const getHomeDetail = (houseCode) => {
  return AxiosInstance().post(`/home/${houseCode}`, {
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
