import api from './axiosInstance';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (data) => {
  return api.post('/auth/register', data);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const kakaoLogin = (code) => {
  return api.post('/auth/kakao', { code });
};
