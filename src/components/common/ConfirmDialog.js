import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title || t('common.confirm')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t('common.cancel')}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
