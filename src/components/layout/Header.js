import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PetsIcon from '@mui/icons-material/Pets';
import useAuth from '../../hooks/useAuth';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ff6f00' }}>
      <Toolbar>
        <PetsIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          {t('common.appName')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" component={Link} to="/board">
            {t('board.list')}
          </Button>
          {user ? (
            <>
              <Typography variant="body2" sx={{ mx: 1 }}>
                {user.nickname}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                {t('common.logout')}
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              {t('common.login')}
            </Button>
          )}
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
