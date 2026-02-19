import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PostCard from '../components/board/PostCard';
import { getPosts } from '../api/postApi';

const SLIDE_INTERVAL = 5000;

const HomePage = () => {
  const { t } = useTranslation();
  const [recentPosts, setRecentPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgrounds = [
    'linear-gradient(135deg, #ff6f00 0%, #ff8f00 100%)',
    'url(/images/slide-lost.svg) center/cover no-repeat',
    'url(/images/slide-protected.svg) center/cover no-repeat',
    'url(/images/slide-witness.svg) center/cover no-repeat',
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % backgrounds.length);
  }, [backgrounds.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await getPosts({ page: 0, size: 6 });
        setRecentPosts(response.data.content || []);
      } catch (err) {
        console.error('Failed to fetch recent posts:', err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <Box>
      {/* Hero Carousel */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: 350, md: 450 } }}>
        {/* Sliding backgrounds */}
        {backgrounds.map((bg, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              inset: 0,
              background: bg,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}

        {/* Fixed text overlay */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Container maxWidth="md">
            <PetsIcon sx={{ fontSize: 80, mb: 2 }} />
            <Typography
              variant="h3"
              gutterBottom
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.8rem', md: '3rem' }, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
            >
              {t('home.heroTitle')}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, opacity: 0.95, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {t('home.heroSubtitle')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/board"
                startIcon={<SearchIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: '#ff6f00',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                {t('home.startSearch')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/posts/new"
                startIcon={<AddIcon />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                {t('home.registerPet')}
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Arrows */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.25)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.45)' },
            zIndex: 2,
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.25)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.45)' },
            zIndex: 2,
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

        {/* Dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
            zIndex: 2,
          }}
        >
          {backgrounds.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: currentSlide === index ? 28 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {[
            { label: t('home.lostCount'), color: '#f44336', type: 'LOST' },
            { label: t('home.protectedCount'), color: '#4caf50', type: 'PROTECTED' },
            { label: t('home.witnessCount'), color: '#2196f3', type: 'WITNESS' },
          ].map((stat) => (
            <Grid item xs={12} sm={4} key={stat.type}>
              <Paper
                component={Link}
                to={`/board?type=${stat.type}`}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderTop: `4px solid ${stat.color}`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'block',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                }}
              >
                <Typography variant="h6">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Posts */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">{t('board.recentPosts')}</Typography>
          <Button component={Link} to="/board">
            {t('board.viewAll')}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {recentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
