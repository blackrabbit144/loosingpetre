import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={{ backgroundColor: '#f5f5f5', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {t('footer.copyright')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
