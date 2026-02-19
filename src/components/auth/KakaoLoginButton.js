import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { KAKAO_APP_KEY } from '../../utils/constants';

const KakaoLoginButton = () => {
  const { t } = useTranslation();

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK not loaded');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
    window.Kakao.Auth.authorize({
      redirectUri: window.location.origin + '/oauth/kakao',
    });
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleKakaoLogin}
      sx={{ backgroundColor: '#FEE500', color: '#000', '&:hover': { backgroundColor: '#FDD835' } }}
    >
      {t('auth.kakaoLogin')}
    </Button>
  );
};

export default KakaoLoginButton;
