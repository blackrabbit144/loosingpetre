import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { SPECIES } from '../../utils/constants';
import { getPrefectures } from '../../utils/prefectures';

const SearchFilter = ({ filters, onFilterChange, onSearch }) => {
  const { t, i18n } = useTranslation();
  const prefectures = getPrefectures(i18n.language);

  const handleChange = (field) => (e) => {
    onFilterChange({ ...filters, [field]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, alignItems: 'center' }}>
      <TextField
        label={t('board.keyword')}
        placeholder={t('board.searchPlaceholder')}
        value={filters.keyword || ''}
        onChange={handleChange('keyword')}
        size="small"
        sx={{ minWidth: 200 }}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>{t('board.species')}</InputLabel>
        <Select value={filters.species || ''} onChange={handleChange('species')} label={t('board.species')}>
          <MenuItem value="">{t('common.all')}</MenuItem>
          <MenuItem value={SPECIES.DOG}>{t('board.dog')}</MenuItem>
          <MenuItem value={SPECIES.CAT}>{t('board.cat')}</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>{t('board.prefecture')}</InputLabel>
        <Select
          value={filters.prefecture || ''}
          onChange={handleChange('prefecture')}
          label={t('board.prefecture')}
        >
          <MenuItem value="">{t('common.all')}</MenuItem>
          {prefectures.map((pref) => (
            <MenuItem key={pref} value={pref}>
              {pref}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" startIcon={<SearchIcon />} onClick={onSearch}>
        {t('common.search')}
      </Button>
    </Box>
  );
};

export default SearchFilter;
