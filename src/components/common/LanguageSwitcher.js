import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event, newLang) => {
    if (newLang) {
      i18n.changeLanguage(newLang);
    }
  };

  return (
    <ToggleButtonGroup
      value={i18n.language?.startsWith('ko') ? 'ko' : 'ja'}
      exclusive
      onChange={handleChange}
      size="small"
    >
      <ToggleButton value="ja" sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,0.3)' }}>
        日本語
      </ToggleButton>
      <ToggleButton value="ko" sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,0.3)' }}>
        한국어
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
