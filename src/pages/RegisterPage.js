import React from 'react';
import { Container, Paper, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {t('auth.registerTitle')}
        </Typography>
        <RegisterForm onSuccess={handleSuccess} />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            {t('auth.hasAccount')}{' '}
            <MuiLink component={Link} to="/login">
              {t('auth.loginLink')}
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
