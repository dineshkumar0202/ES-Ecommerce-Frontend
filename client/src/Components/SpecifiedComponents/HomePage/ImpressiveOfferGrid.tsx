import React from 'react';
import { Box, Paper, Typography, Button, Grid, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ImpressiveOfferGrid = () => {
    const navigate = useNavigate();

    // Mock Data for this specific impressive section
    const spotlightProduct = {
        id: 101, // Mock ID
        name: "Sony WH-1000XM5",
        desc: "Industry Leading Noise Cancelling",
        price: 29990,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
        rating: 4.8
    };



    return (
        <Box sx={{ py: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 3,
                    px: 1
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(45deg, #2d3436 30%, #636e72 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Exclusive Drops
                </Typography>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#2d3436', fontWeight: 700, textTransform: 'none' }}
                >
                    View All
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ height: { md: '500px', xs: 'auto' } }}>
                {/* Spotlight Hero Card (Full Width) */}
                <Grid size={{ xs: 12 }} sx={{ height: '100%' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            height: '100%',
                            minHeight: { xs: '400px', md: '100%' },
                            borderRadius: 6,
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'all 0.4s ease',
                            display: 'flex',
                            bgcolor: '#000',
                            '&:hover': {
                                transform: 'scale-[1.01]',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                            },
                            '&:hover .bg-img': {
                                transform: 'scale(1.1)'
                            }
                        }}
                        onClick={() => navigate('/product/1')} // Link to generic product
                    >
                        {/* Background Image */}
                        <Box
                            className="bg-img"
                            component="img"
                            src={spotlightProduct.image}
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.8,
                                transition: 'transform 0.6s ease'
                            }}
                        />

                        {/* Gradient Overlay */}
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

                        {/* Content */}
                        <Box sx={{ position: 'relative', zIndex: 2, p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '60%' }}>
                            <Box sx={{ bgcolor: '#ff7675', width: 'fit-content', px: 2, py: 0.5, borderRadius: 20, mb: 2 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#fff' }}>DEAL OF THE MONTH</Typography>
                            </Box>
                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, lineHeight: 1, mb: 2 }}>
                                {spotlightProduct.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, fontWeight: 400 }}>
                                {spotlightProduct.desc}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                                    ₹{spotlightProduct.price.toLocaleString()}
                                </Typography>
                                <Rating value={spotlightProduct.rating} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }} />
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: 'white',
                                    color: 'black',
                                    borderRadius: 10,
                                    py: 1.5,
                                    px: 4,
                                    fontWeight: 800,
                                    width: 'fit-content',
                                    '&:hover': { bgcolor: '#f5f5f5', transform: 'translateX(5px)' }
                                }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
};

export default ImpressiveOfferGrid;
