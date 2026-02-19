import React from 'react';
import { Container, Paper, Typography, Box, Divider, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/auth/LoginForm';
import KakaoLoginButton from '../components/auth/KakaoLoginButton';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {t('auth.loginTitle')}
        </Typography>
        <LoginForm onSuccess={handleSuccess} />
        <Divider sx={{ my: 3 }}>{t('auth.loginWith')}</Divider>
        <KakaoLoginButton />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            {t('auth.noAccount')}{' '}
            <MuiLink component={Link} to="/register">
              {t('auth.registerLink')}
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
