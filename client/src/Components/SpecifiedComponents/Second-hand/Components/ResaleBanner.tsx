import { Box, Container, Typography, Button } from '@mui/material';

const ResaleBanner = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <Box sx={{
                bgcolor: '#c8ddd4',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                minHeight: '260px',
                display: 'flex',
                alignItems: 'stretch'
            }}>
                {/* Left Side - Content */}
                <Box sx={{
                    flex: 1,
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography sx={{
                        fontWeight: 700,
                        color: '#1f2937',
                        fontSize: '0.7rem',
                        letterSpacing: 1.5,
                        mb: 2,
                        textTransform: 'uppercase'
                    }}>
                        CURATED MARKETS
                    </Typography>
                    <Typography sx={{
                        fontWeight: 900,
                        color: '#0f172a',
                        fontSize: { xs: '2rem', md: '2.8rem' },
                        lineHeight: 1.15,
                        mb: 2,
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                        Find Unique<br />Treasures.
                    </Typography>
                    <Typography sx={{
                        color: '#475569',
                        fontSize: '0.9rem',
                        mb: 3,
                        lineHeight: 1.5,
                        maxWidth: '420px'
                    }}>
                        Discover verified pre-owned items from top sellers<br />
                        around the world. Sustainability meets luxury.
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'white',
                                color: '#1f2937',
                                px: 3.5,
                                py: 1.2,
                                fontWeight: 800,
                                borderRadius: 2,
                                fontSize: '0.85rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    bgcolor: '#f8fafc',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }
                            }}
                        >
                            Explore Now →
                        </Button>
                    </Box>
                </Box>

                {/* Right Side - Image */}
                <Box sx={{
                    width: { xs: '0', md: '45%' },
                    display: { xs: 'none', md: 'block' },
                    position: 'relative',
                    bgcolor: '#5a7268',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(90, 114, 104, 0.3)'
                    }
                }}>
                    {/* Vintage items overlay effect */}
                    <Box sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        display: 'flex',
                        gap: 2,
                        zIndex: 1
                    }}>
                        {/* You can add vintage item icons or images here if needed */}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ResaleBanner;
