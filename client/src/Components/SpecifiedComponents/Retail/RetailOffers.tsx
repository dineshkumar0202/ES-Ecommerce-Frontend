import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Container, Grid, Paper, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const offers = [
    {
        id: 1,
        title: "UpTo 60% Off",
        subtitle: "Mobiles & Laptops",
        bg: "linear-gradient(135deg, #0288d1 0%, #26c6da 100%)",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Mobile/Laptop example
        tag: "TOP DEAL | APPLE"
    },
    {
        id: 2,
        title: "New Arrivals",
        subtitle: "Summer Collection",
        bg: "linear-gradient(135deg, #f57f17 0%, #ffb74d 100%)",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fashion example
        tag: "TRENDING"
    },
    {
        id: 3,
        title: "Mega Sale",
        subtitle: "Home & Living",
        bg: "linear-gradient(135deg, #d32f2f 0%, #ef5350 100%)",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Home example
        tag: "LIMITED TIME"
    }
];

const RetailOffers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % offers.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ width: '100%', mb: 6 }}>
            {/* Main Carousel Slider */}
            <Paper
                elevation={0}
                sx={{
                    position: 'relative',
                    height: { xs: 300, md: 400 },
                    overflow: 'hidden',
                    borderRadius: 4,
                    mb: 3,
                    background: offers[currentIndex].bg,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.5s ease-in-out',
                    color: 'white'
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ height: '100%', px: { xs: 2, md: 6 } }}
                    >
                        {/* Text Content */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mb: { xs: 3, md: 0 } }}>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    px: 2,
                                    py: 0.5,
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 2,
                                    mb: 2,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: 1
                                }}
                            >
                                {offers[currentIndex].tag}
                            </Box>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    mb: 1,
                                    lineHeight: 1.1
                                }}
                            >
                                {offers[currentIndex].title}
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
                                {offers[currentIndex].subtitle}
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: 'white',
                                    color: 'black',
                                    fontWeight: 800,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    '&:hover': { bgcolor: '#f5f5f5' }
                                }}
                            >
                                Shop Now
                            </Button>
                        </Box>

                        {/* Image Content (with animation key) */}
                        <Box
                            key={currentIndex}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: { xs: 'center', md: 'flex-end' },
                                animation: 'fadeInRight 0.8s ease-out'
                            }}
                        >
                            <Box
                                component="img"
                                src={offers[currentIndex].image}
                                alt="Offer"
                                sx={{
                                    maxWidth: '100%',
                                    height: { xs: 180, md: 300 },
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
                                    transform: 'perspective(1000px) rotateY(-15deg)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'perspective(1000px) rotateY(-5deg) scale(1.05)'
                                    }
                                }}
                            />
                        </Box>
                    </Stack>
                </Container>

                {/* Dots Indicators */}
                <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
                    {offers.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            sx={{
                                width: index === currentIndex ? 24 : 8,
                                height: 8,
                                borderRadius: 4,
                                bgcolor: 'white',
                                opacity: index === currentIndex ? 1 : 0.5,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </Stack>
            </Paper>

            {/* Bottom Grid Section */}
            <Grid container spacing={3}>
                {/* Valentine's Offer */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #b71c1c 0%, #ef5350 100%)',
                            color: 'white',
                            height: '100%',
                            minHeight: 250,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ zIndex: 2, flex: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Valentine's</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, opacity: 0.9 }}>Offers</Typography>
                            <Button
                                variant="contained"
                                startIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: 'white',
                                    color: '#c62828',
                                    fontWeight: 700,
                                    borderRadius: 3,
                                    '&:hover': { bgcolor: '#ffebee' }
                                }}
                            >
                                Shop Gifts
                            </Button>
                        </Box>

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" // Gift box example
                            sx={{
                                position: 'absolute',
                                right: -20,
                                bottom: -20,
                                width: 220,
                                transform: 'rotate(-15deg)',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                            }}
                        />
                    </Paper>
                </Grid>

                {/* Flash Sale */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #1b5e20 0%, #43a047 100%)',
                            color: 'white',
                            height: '100%',
                            minHeight: 250,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ zIndex: 2, flex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, bgcolor: 'rgba(0,0,0,0.2)', width: 'fit-content', px: 2, py: 0.5, borderRadius: 2 }}>
                                <AccessTimeIcon fontSize="small" />
                                <Typography sx={{ fontWeight: 700, letterSpacing: 1 }}>12 : 23 : 21</Typography>
                            </Stack>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Flash Sale</Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, mb: 0 }}>Ending soon! Don't miss out.</Typography>
                        </Box>

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1594038683836-b6a21961e1bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" // Perfume/Product example
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                height: '80%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <style>{`
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </Box>
    );
};

export default RetailOffers;
