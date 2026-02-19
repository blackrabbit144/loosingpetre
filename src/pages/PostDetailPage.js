import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Paper,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import { getPost, deletePost } from '../api/postApi';
import { POST_TYPES } from '../utils/constants';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CommentSection from '../components/board/CommentSection';
import GoogleMapView from '../components/board/GoogleMapView';
import ShareButtons from '../components/board/ShareButtons';
import ConfirmDialog from '../components/common/ConfirmDialog';

const typeColors = {
  [POST_TYPES.LOST]: 'error',
  [POST_TYPES.PROTECTED]: 'success',
  [POST_TYPES.WITNESS]: 'info',
};

const PostDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [deleteAction, setDeleteAction] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const typeLabel = {
    [POST_TYPES.LOST]: t('board.lost'),
    [POST_TYPES.PROTECTED]: t('board.protected'),
    [POST_TYPES.WITNESS]: t('board.witness'),
  };

  const handleDeleteClick = () => {
    setDeleteAction('delete');
    setShowPasswordDialog(true);
  };

  const handleEditClick = () => {
    setDeleteAction('edit');
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = async () => {
    if (deleteAction === 'delete') {
      try {
        await deletePost(id, password);
        navigate('/board');
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    } else if (deleteAction === 'edit') {
      navigate(`/posts/${id}/edit`);
    }
    setShowPasswordDialog(false);
    setPassword('');
  };

  if (loading) return <LoadingSpinner />;
  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography>{t('common.noData')}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/board')} sx={{ mb: 2 }}>
        {t('common.back')}
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={typeLabel[post.postType]} color={typeColors[post.postType]} />
            <Chip
              label={post.species === 'DOG' ? t('board.dog') : t('board.cat')}
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" startIcon={<EditIcon />} onClick={handleEditClick}>
              {t('common.edit')}
            </Button>
            <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
              {t('common.delete')}
            </Button>
          </Box>
        </Box>

        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>

        {post.imageUrls && post.imageUrls.length > 0 ? (
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {post.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${post.title} ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: 500, borderRadius: 8 }}
              />
            ))}
          </Box>
        ) : post.imageUrl ? (
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <img
              src={post.imageUrl}
              alt={post.title}
              style={{ maxWidth: '100%', maxHeight: 500, borderRadius: 8 }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              mb: 3,
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
            }}
          >
            <PetsIcon sx={{ fontSize: 100, color: '#ddd' }} />
          </Box>
        )}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {post.petName && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">{t('board.petName')}</Typography>
              <Typography>{post.petName}</Typography>
            </Grid>
          )}
          {post.petGender && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">{t('board.petGender')}</Typography>
              <Typography>
                {post.petGender === 'MALE' ? t('board.male') : post.petGender === 'FEMALE' ? t('board.female') : t('board.unknown')}
              </Typography>
            </Grid>
          )}
          {post.petAge && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">{t('board.petAge')}</Typography>
              <Typography>{post.petAge}</Typography>
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">{t('board.date')}</Typography>
            <Typography>{post.date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">{t('board.location')}</Typography>
            <Typography>{post.prefecture} {post.city}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">{t('board.contact')}</Typography>
            <Typography>{post.contact}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">{t('board.emailAddress')}</Typography>
            <Typography>{post.email}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>{t('board.content')}</Typography>
        <Typography sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>{post.content}</Typography>

        <GoogleMapView lat={post.latitude} lng={post.longitude} />
        <ShareButtons title={post.title} />
      </Paper>

      <CommentSection postId={id} />

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <DialogTitle>{t('board.postPassword')}</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            label={t('board.postPassword')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>{t('common.cancel')}</Button>
          <Button onClick={handlePasswordSubmit} variant="contained">
            {t('common.confirm')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={showDeleteConfirm}
        message={t('board.deleteConfirm')}
        onConfirm={handleDeleteClick}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </Container>
  );
};

export default PostDetailPage;
