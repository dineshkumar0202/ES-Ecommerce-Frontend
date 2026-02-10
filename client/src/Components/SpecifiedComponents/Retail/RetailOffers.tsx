import { Box, Typography, Button, Stack, Paper, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BoltIcon from '@mui/icons-material/Bolt';

const RetailOffers = () => {
    return (
        <Box sx={{ width: '100%', mb: 6 }}>
            {/* Main Mega Deal Banner */}
            <Paper
                elevation={0}
                sx={{
                    position: 'relative',
                    height: { xs: 400, md: 500 },
                    overflow: 'hidden',
                    borderRadius: 4,
                    mb: 3,
                    bgcolor: '#0f172a', // Dark background
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {/* Background Gradient Accent */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(190, 242, 100, 0.1) 0%, rgba(190, 242, 100, 0) 100%)',
                        clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)'
                    }}
                />

                <Box sx={{ position: 'relative', zIndex: 2, height: '100%', width: '100%' }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ height: '100%', px: { xs: 4, md: 8 } }}
                    >
                        {/* Text Content */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, pt: { xs: 4, md: 0 } }}>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    px: 2,
                                    py: 1,
                                    bgcolor: '#bef264', // Lime Green
                                    color: 'black',
                                    borderRadius: 5,
                                    mb: 3,
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase'
                                }}
                            >
                                Limited Time Only
                            </Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '2.5rem', md: '5rem' },
                                    mb: 2,
                                    lineHeight: 1,
                                    textTransform: 'uppercase'
                                }}
                            >
                                Mega Deal:<br />
                                <span style={{ color: '#bef264' }}>Up To 50%</span><br />
                                Off
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: '#94a3b8', maxWidth: 450 }}>
                                Experience the ultimate in retail excellence. Premium tech and lifestyle products at unbeatable prices.
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        bgcolor: '#bef264',
                                        color: 'black',
                                        fontWeight: 800,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': { bgcolor: '#a3d94d' }
                                    }}
                                >
                                    Shop the Sale
                                </Button>
                                <Button
                                    variant="text"
                                    size="large"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': { color: '#bef264' }
                                    }}
                                >
                                    View Details
                                </Button>
                            </Stack>
                        </Box>

                        {/* Image Content */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: { xs: 'center', md: 'flex-end' },
                                height: '100%',
                                position: 'relative'
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" // Headphones
                                alt="Headphones"
                                sx={{
                                    height: { xs: 250, md: 450 },
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    mt: { xs: 2, md: 5 },
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                                }}
                            />
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            {/* Bottom Grid Section */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Valentine's Offer */}
                <Box sx={{ flex: 1 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #be4d25 0%, #ed8936 30%, #f6ad55 100%)', // Adjusted to reddish/pink tone
                            bgcolor: '#a94442',
                            backgroundBlendMode: 'overlay', // mixing for texture
                            color: 'white',
                            height: 280,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        style={{
                            background: 'linear-gradient(to right, #b9646c, #ce8f96)'
                        }}
                    >
                        <Box sx={{ zIndex: 2, flex: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Valentine's Offers</Typography>
                            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, fontWeight: 500 }}>
                                Gifts for your loved ones up to 30% off
                            </Typography>
                            <Button
                                variant="text"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    p: 0,
                                    textTransform: 'none',
                                    '&:hover': { transform: 'translateX(5px)', bgcolor: 'transparent' },
                                    transition: 'transform 0.2s'
                                }}
                            >
                                Explore Now
                            </Button>
                        </Box>

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            sx={{
                                position: 'absolute',
                                right: -20,
                                bottom: -30,
                                width: 250,
                                transform: 'rotate(-10deg)',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2)) opacity(0.9)'
                            }}
                        />
                    </Paper>
                </Box>

                {/* Flash Sale */}
                <Box sx={{ flex: 1 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: 4,
                            bgcolor: '#0f172a', // Dark blue/black
                            color: 'white',
                            height: 280,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: 20, right: 30, opacity: 0.3, letterSpacing: 2, fontFamily: 'monospace' }}>
                            10 : 42 : 15
                        </Box>

                        <Box sx={{ zIndex: 2, flex: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 1 }}>
                                FLASH SALE
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, opacity: 0.7, color: '#94a3b8' }}>
                                Hurry! The best deals disappear fast.
                            </Typography>
                            <Button
                                variant="text"
                                endIcon={<BoltIcon sx={{ color: '#bef264' }} />}
                                sx={{
                                    color: '#bef264',
                                    fontWeight: 700,
                                    p: 0,
                                    textTransform: 'none',
                                    '&:hover': { color: 'white', bgcolor: 'transparent' }
                                }}
                            >
                                Shop Fast
                            </Button>
                        </Box>

                        {/* Abstract background shape for Flash Sale */}
                        <Box
                            sx={{
                                position: 'absolute',
                                right: -50,
                                top: -50,
                                width: 200,
                                height: 200,
                                bgcolor: '#bef264',
                                opacity: 0.05,
                                borderRadius: '50%',
                                filter: 'blur(40px)'
                            }}
                        />
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default RetailOffers;
