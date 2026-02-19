import React, { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (data) => {
    const response = await authApi.register(data);
    return response.data;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout API errors
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const kakaoLogin = async (code) => {
    const response = await authApi.kakaoLogin(code);
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, kakaoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
