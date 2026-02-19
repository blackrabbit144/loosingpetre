import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }} color="text.secondary">
        {t('common.loading')}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
