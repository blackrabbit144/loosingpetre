import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BoardListPage from './pages/BoardListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';
import PostEditPage from './pages/PostEditPage';
import KakaoCallbackPage from './pages/KakaoCallbackPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/board" element={<BoardListPage />} />
            <Route path="/posts/new" element={<PostCreatePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/:id/edit" element={<PostEditPage />} />
            <Route path="/oauth/kakao" element={<KakaoCallbackPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
