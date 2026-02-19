import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label={t('auth.email')}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label={t('auth.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {t('common.login')}
      </Button>
    </Box>
  );
};

export default LoginForm;
