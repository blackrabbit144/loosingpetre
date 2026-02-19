import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { POST_TYPES } from '../../utils/constants';

const typeColors = {
  [POST_TYPES.LOST]: 'error',
  [POST_TYPES.PROTECTED]: 'success',
  [POST_TYPES.WITNESS]: 'info',
};

const PostCard = ({ post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const typeLabel = {
    [POST_TYPES.LOST]: t('board.lost'),
    [POST_TYPES.PROTECTED]: t('board.protected'),
    [POST_TYPES.WITNESS]: t('board.witness'),
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
        {post.imageUrl ? (
          <CardMedia component="img" height="200" image={post.imageUrl} alt={post.title} />
        ) : (
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            <PetsIcon sx={{ fontSize: 64, color: '#ccc' }} />
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip label={typeLabel[post.postType]} color={typeColors[post.postType]} size="small" />
            <Chip
              label={post.species === 'DOG' ? t('board.dog') : t('board.cat')}
              variant="outlined"
              size="small"
            />
          </Box>
          <Typography variant="h6" gutterBottom noWrap>
            {post.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">
              {post.prefecture} {post.city}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {post.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
