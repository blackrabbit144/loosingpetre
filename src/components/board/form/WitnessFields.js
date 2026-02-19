import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPECIES } from '../../../utils/constants';
import { getPrefectures } from '../../../utils/prefectures';

const WitnessFields = ({ form, onChange }) => {
  const { t, i18n } = useTranslation();
  const prefectures = getPrefectures(i18n.language);

  const handleChange = (field) => (e) => {
    onChange({ ...form, [field]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>{t('board.species')}</InputLabel>
          <Select value={form.species || ''} onChange={handleChange('species')} label={t('board.species')}>
            <MenuItem value={SPECIES.DOG}>{t('board.dog')}</MenuItem>
            <MenuItem value={SPECIES.CAT}>{t('board.cat')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('board.witnessDate')}
          type="datetime-local"
          value={form.date || ''}
          onChange={handleChange('date')}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth required>
          <InputLabel>{t('board.prefecture')}</InputLabel>
          <Select value={form.prefecture || ''} onChange={handleChange('prefecture')} label={t('board.prefecture')}>
            {prefectures.map((pref) => (
              <MenuItem key={pref} value={pref}>{pref}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('board.city')}
          value={form.city || ''}
          onChange={handleChange('city')}
          fullWidth
          required
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('board.title')}
          value={form.title || ''}
          onChange={handleChange('title')}
          fullWidth
          required
        />
      </Grid>
      <Grid size={12}>
        <TextField
          label={t('board.content')}
          value={form.content || ''}
          onChange={handleChange('content')}
          fullWidth
          required
          multiline
          rows={4}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('board.witnessName')}
          value={form.contactName || ''}
          onChange={handleChange('contactName')}
          fullWidth
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('board.contact')}
          value={form.contact || ''}
          onChange={handleChange('contact')}
          fullWidth
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('board.emailAddress')}
          type="email"
          value={form.email || ''}
          onChange={handleChange('email')}
          fullWidth
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>{t('board.emailNotification')}</InputLabel>
          <Select
            value={form.emailNotification || 'false'}
            onChange={handleChange('emailNotification')}
            label={t('board.emailNotification')}
          >
            <MenuItem value="true">{t('common.yes')}</MenuItem>
            <MenuItem value="false">{t('common.no')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('board.postPassword')}
          type="password"
          value={form.password || ''}
          onChange={handleChange('password')}
          fullWidth
          required
        />
      </Grid>
    </Grid>
  );
};

export default WitnessFields;
