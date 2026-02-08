import { Box, Typography, Button, Container } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ValentineBanner = () => {
    return (
        <Box
            sx={{
                mt: 4,
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f48fb1 0%, #ec407a 100%)',
                boxShadow: '0 8px 24px rgba(236, 64, 122, 0.25)',
                color: 'white',
                position: 'relative',
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        py: 6,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50px',
                            px: 2,
                            py: 0.5,
                            mb: 2,
                            backdropFilter: 'blur(5px)',
                        }}
                    >
                        <FavoriteIcon sx={{ color: '#fff', fontSize: 18, mr: 1 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            Valentine's Special
                        </Typography>
                    </Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        Gift Your Loved Ones
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            opacity: 0.95,
                            maxWidth: '600px',
                        }}
                    >
                        Get up to 50% off on our exclusive Valentine's collection.
                        Make this day unforgettable.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'white',
                            color: '#ec407a',
                            fontWeight: 'bold',
                            px: 5,
                            py: 1.5,
                            borderRadius: '30px',
                            '&:hover': {
                                bgcolor: '#fce4ec',
                                transform: 'scale(1.05)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}
                    >
                        Shop Gifts
                    </Button>
                </Box>
            </Container>

            {/* Decorative circles */}
            <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Box sx={{ position: 'absolute', bottom: -30, right: -30, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
    );
};

export default ValentineBanner;
