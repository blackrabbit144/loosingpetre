import React, { useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Alert,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { POST_TYPES } from '../../utils/constants';
import LostPetFields from './form/LostPetFields';
import ProtectedPetFields from './form/ProtectedPetFields';
import WitnessFields from './form/WitnessFields';

const PostForm = ({ initialData, onSubmit, isEdit }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialData || { postType: POST_TYPES.LOST });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (e) => {
    setForm({ ...form, postType: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });
      images.forEach((img) => {
        formData.append('images', img);
      });
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (form.postType) {
      case POST_TYPES.LOST:
        return <LostPetFields form={form} onChange={setForm} />;
      case POST_TYPES.PROTECTED:
        return <ProtectedPetFields form={form} onChange={setForm} />;
      case POST_TYPES.WITNESS:
        return <WitnessFields form={form} onChange={setForm} />;
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth required>
            <InputLabel>{t('board.postType')}</InputLabel>
            <Select
              value={form.postType || POST_TYPES.LOST}
              onChange={handleTypeChange}
              label={t('board.postType')}
              disabled={isEdit}
            >
              <MenuItem value={POST_TYPES.LOST}>{t('board.lost')}</MenuItem>
              <MenuItem value={POST_TYPES.PROTECTED}>{t('board.protected')}</MenuItem>
              <MenuItem value={POST_TYPES.WITNESS}>{t('board.witness')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {renderFields()}

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('board.image')}
        </Typography>
        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
          {t('board.image')}
          <input type="file" hidden accept="image/*" multiple onChange={handleImageChange} />
        </Button>
        {images.length > 0 && (
          <ImageList sx={{ mt: 2 }} cols={4} rowHeight={120}>
            {images.map((img, index) => (
              <ImageListItem key={index}>
                <img
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  style={{ objectFit: 'cover', height: 120 }}
                />
                <ImageListItemBar
                  position="top"
                  actionIcon={
                    <IconButton size="small" sx={{ color: 'white' }} onClick={() => handleRemoveImage(index)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                  actionPosition="right"
                  sx={{ background: 'rgba(0,0,0,0.3)' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>

      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {isEdit ? t('common.save') : t('common.submit')}
      </Button>
    </Box>
  );
};

export default PostForm;
