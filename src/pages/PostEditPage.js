import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostForm from '../components/board/PostForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getPost, updatePost } from '../api/postApi';

const PostEditPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (formData) => {
    await updatePost(id, formData);
    navigate(`/posts/${id}`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('board.editPost')}
      </Typography>
      {post && <PostForm initialData={post} onSubmit={handleSubmit} isEdit />}
    </Container>
  );
};

export default PostEditPage;
