import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostForm from '../components/board/PostForm';
import { createPost } from '../api/postApi';
import useAuth from '../hooks/useAuth';

const PostCreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const handleSubmit = async (formData) => {
    const response = await createPost(formData);
    navigate(`/posts/${response.data.id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('board.createPost')}
      </Typography>
      <PostForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default PostCreatePage;
