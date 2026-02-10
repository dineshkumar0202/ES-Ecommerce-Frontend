import { Box, Typography, Button, Stack, Link } from '@mui/material';

const RetailBanner = () => {
    return (
        <Box sx={{ width: '100%', mb: 6 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                height: { md: '500px' }
            }}>
                {/* Left Large Banner */}
                <Box
                    sx={{
                        flex: 2,
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        minHeight: { xs: '300px', md: 'auto' },
                        backgroundImage: 'url("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        padding: { xs: 4, md: 8 }
                    }}
                >
                    {/* Overlay for better text readability if needed */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            bgcolor: 'rgba(0,0,0,0.1)'
                        }}
                    />

                    <Stack spacing={2} sx={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                        <Box
                            sx={{
                                display: 'inline-block',
                                alignSelf: 'flex-start',
                                px: 2,
                                py: 0.5,
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                color: 'black',
                                borderRadius: 10,
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                letterSpacing: 1,
                                textTransform: 'uppercase'
                            }}
                        >
                            Limited Time
                        </Box>

                        <Typography
                            variant="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 900,
                                fontSize: { xs: '2.5rem', md: '4.5rem' },
                                lineHeight: 1,
                                textTransform: 'uppercase',
                                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                            }}
                        >
                            Summer<br />Sale
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'white',
                                fontSize: '1.1rem',
                                opacity: 0.9,
                                fontWeight: 500,
                                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                            }}
                        >
                            Up to 60% off on the latest seasonal trends. Refresh your wardrobe now.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                width: 'fit-content',
                                bgcolor: 'white',
                                color: 'black',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': { bgcolor: '#f0f0f0' },
                                mt: 2
                            }}
                        >
                            Shop Now
                        </Button>
                    </Stack>
                </Box>

                {/* Right Side Banners Container */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    {/* Top Right Banner */}
                    <Box
                        sx={{
                            flex: 1,
                            position: 'relative',
                            borderRadius: 4,
                            overflow: 'hidden',
                            minHeight: '240px',
                            backgroundImage: 'url("https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: 4
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                bgcolor: 'rgba(0,0,0,0.2)'
                            }}
                        />

                        <Stack spacing={1} sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: 'white',
                                    fontWeight: 800,
                                    fontSize: '1.75rem'
                                }}
                            >
                                New Arrivals
                            </Typography>
                            <Typography sx={{ color: 'white', opacity: 0.8, fontSize: '0.9rem' }}>
                                Discover the latest gear
                            </Typography>
                            <Link
                                href="#"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    borderBottom: '2px solid white',
                                    width: 'fit-content',
                                    mt: 1,
                                    '&:hover': { opacity: 0.8 }
                                }}
                            >
                                Explore
                            </Link>
                        </Stack>
                    </Box>

                    {/* Bottom Right Banner */}
                    <Box
                        sx={{
                            flex: 1,
                            position: 'relative',
                            borderRadius: 4,
                            overflow: 'hidden',
                            minHeight: '240px',
                            backgroundImage: 'url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: 4
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                bgcolor: 'rgba(0,0,0,0.3)'
                            }}
                        />

                        <Stack spacing={1} sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: 'white',
                                    fontWeight: 800,
                                    fontSize: '1.75rem'
                                }}
                            >
                                Trending
                            </Typography>
                            <Typography sx={{ color: 'white', opacity: 0.8, fontSize: '0.9rem' }}>
                                What's hot this week
                            </Typography>
                            <Link
                                href="#"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    borderBottom: '2px solid white',
                                    width: 'fit-content',
                                    mt: 1,
                                    '&:hover': { opacity: 0.8 }
                                }}
                            >
                                Shop Trending
                            </Link>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RetailBanner;
