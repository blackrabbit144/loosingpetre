import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { getComments, createComment, updateComment, deleteComment } from '../../api/commentApi';
import ConfirmDialog from '../common/ConfirmDialog';

const CommentSection = ({ postId }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editContent, setEditContent] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const response = await getComments(postId);
      setComments(response.data || []);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await createComment(postId, { content });
      setContent('');
      fetchComments();
    } catch (err) {
      console.error('Failed to create comment:', err);
    }
  };

  const handleEditStart = (comment) => {
    setEditTarget(comment.id);
    setEditContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditTarget(null);
    setEditContent('');
  };

  const handleEditSubmit = async () => {
    if (!editContent.trim()) return;
    try {
      await updateComment(editTarget, { content: editContent });
      setEditTarget(null);
      setEditContent('');
      fetchComments();
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteComment(deleteTarget);
      setDeleteTarget(null);
      fetchComments();
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {t('board.comments')} ({comments.length})
      </Typography>
      {user && (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            placeholder={t('board.writeComment')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            size="small"
          />
          <Button type="submit" variant="contained">
            {t('common.submit')}
          </Button>
        </Box>
      )}
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            {index > 0 && <Divider />}
            <ListItem
              secondaryAction={
                user?.id === comment.userId && (
                  <Box>
                    <IconButton edge="end" onClick={() => handleEditStart(comment)} sx={{ mr: 0.5 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => setDeleteTarget(comment.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )
              }
            >
              {editTarget === comment.id ? (
                <Box sx={{ display: 'flex', gap: 1, width: '100%', pr: 10 }}>
                  <TextField
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <Button size="small" variant="contained" onClick={handleEditSubmit}>
                    {t('common.save')}
                  </Button>
                  <Button size="small" onClick={handleEditCancel}>
                    {t('common.cancel')}
                  </Button>
                </Box>
              ) : (
                <ListItemText
                  primary={comment.content}
                  secondary={`${comment.nickname || ''} - ${comment.createdAt || ''}`}
                />
              )}
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <ConfirmDialog
        open={!!deleteTarget}
        message={t('board.commentDeleteConfirm')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
};

export default CommentSection;
