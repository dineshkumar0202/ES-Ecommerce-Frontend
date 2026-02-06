import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroBanner = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: 'background.paper',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                color: 'white',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                fontWeight: 'bold',
                                letterSpacing: 2,
                                color: '#4fc3f7',
                                mb: 1,
                                display: 'block'
                            }}
                        >
                            New Arrivals
                        </Typography>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(45deg, #ffffff 30%, #bbdefb 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Discover Your Style
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: '400px' }}>
                            Explore our latest collection of premium products designed to elevate your lifestyle.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                bgcolor: 'white',
                                color: '#0d47a1',
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                '&:hover': {
                                    bgcolor: '#f5f5f5',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Shop Now
                        </Button>
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Box
                            sx={{
                                height: '100%',
                                minHeight: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                            }}
                        >
                            {/* Placeholder for Hero Image */}
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Shopping"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                    transform: 'perspective(1000px) rotateY(-10deg)',
                                    boxShadow: '20px 20px 60px rgba(0,0,0,0.2)',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroBanner;
