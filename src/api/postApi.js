import api from './axiosInstance';

export const getPosts = (params) => {
  return api.get('/posts', { params });
};

export const getPost = (id) => {
  return api.get(`/posts/${id}`);
};

export const createPost = (data) => {
  return api.post('/posts', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updatePost = (id, data) => {
  return api.put(`/posts/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deletePost = (id, password) => {
  return api.delete(`/posts/${id}`, { data: { password } });
};
