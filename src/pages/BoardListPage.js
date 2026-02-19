import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Tabs, Tab, Grid, Box, Pagination, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import PostCard from '../components/board/PostCard';
import SearchFilter from '../components/board/SearchFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getPosts } from '../api/postApi';
import { POST_TYPES } from '../utils/constants';
import useAuth from '../hooks/useAuth';

const BoardListPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [tab, setTab] = useState(searchParams.get('type') || '');
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    species: searchParams.get('species') || '',
    prefecture: searchParams.get('prefecture') || '',
  });
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: page - 1 };
      if (tab) params.type = tab;
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.species) params.species = filters.species;
      if (filters.prefecture) params.prefecture = filters.prefecture;
      const response = await getPosts(params);
      setPosts(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [tab, filters, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('type', newValue);
    } else {
      params.delete('type');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSearch = () => {
    setPage(1);
    const params = new URLSearchParams();
    if (tab) params.set('type', tab);
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.species) params.set('species', filters.species);
    if (filters.prefecture) params.set('prefecture', filters.prefecture);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(value));
    setSearchParams(params);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h4">
          {t('board.list')}
        </Typography>
        {user && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/posts/new"
          >
            {t('board.createPost')}
          </Button>
        )}
      </Box>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label={t('common.all')} value="" />
        <Tab label={t('board.lost')} value={POST_TYPES.LOST} />
        <Tab label={t('board.protected')} value={POST_TYPES.PROTECTED} />
        <Tab label={t('board.witness')} value={POST_TYPES.WITNESS} />
      </Tabs>
      <SearchFilter filters={filters} onFilterChange={setFilters} onSearch={handleSearch} />
      {loading ? (
        <LoadingSpinner />
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">{t('board.noResults')}</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default BoardListPage;
