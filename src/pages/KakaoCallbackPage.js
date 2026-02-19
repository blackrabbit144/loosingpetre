import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

const KakaoCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { kakaoLogin } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (processed.current) return;
    processed.current = true;

    if (error) {
      console.error('Kakao auth error:', error);
      navigate('/login');
      return;
    }

    if (code) {
      kakaoLogin(code)
        .then(() => navigate('/'))
        .catch((err) => {
          console.error('Kakao login failed:', err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, kakaoLogin, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>ログイン中...</Typography>
    </Box>
  );
};

export default KakaoCallbackPage;
