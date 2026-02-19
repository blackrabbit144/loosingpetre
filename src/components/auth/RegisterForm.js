import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

const RegisterForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', nickname: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({ email: form.email, password: form.password, nickname: form.nickname });
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label={t('auth.email')}
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label={t('auth.nickname')}
        name="nickname"
        value={form.nickname}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label={t('auth.password')}
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label={t('auth.passwordConfirm')}
        name="passwordConfirm"
        type="password"
        value={form.passwordConfirm}
        onChange={handleChange}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {t('common.register')}
      </Button>
    </Box>
  );
};

export default RegisterForm;
