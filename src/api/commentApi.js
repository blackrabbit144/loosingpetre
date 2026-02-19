import api from './axiosInstance';

export const getComments = (postId) => {
  return api.get(`/posts/${postId}/comments`);
};

export const createComment = (postId, data) => {
  return api.post(`/posts/${postId}/comments`, data);
};

export const updateComment = (commentId, data) => {
  return api.put(`/comments/${commentId}`, data);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
