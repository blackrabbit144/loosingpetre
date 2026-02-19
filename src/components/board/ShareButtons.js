import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
} from 'react-share';
import { useTranslation } from 'react-i18next';

const ShareButtons = ({ url, title }) => {
  const { t } = useTranslation();
  const shareUrl = url || window.location.href;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {t('board.share')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={36} round />
        </TwitterShareButton>
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <LineShareButton url={shareUrl} title={title}>
          <LineIcon size={36} round />
        </LineShareButton>
      </Box>
    </Box>
  );
};

export default ShareButtons;
