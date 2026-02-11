import { Box, Container, Typography, Button, Stack } from '@mui/material';

const QBanner = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <Box sx={{
                bgcolor: '#4a5f5e',
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(74, 95, 94, 0.85)'
                }
            }}>
                <Box sx={{ position: 'relative', zIndex: 1, p: 6 }}>
                    <Stack spacing={3} sx={{ maxWidth: '500px' }}>
                        <Typography variant="h2" sx={{
                            fontWeight: 900,
                            color: 'white',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            lineHeight: 1.1
                        }}>
                            Get it in<br />15 Minutes
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
                            Fresh groceries & essentials delivered to your doorstep
                        </Typography>
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'white',
                                    color: '#4a5f5e',
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 800,
                                    borderRadius: 3,
                                    '&:hover': { bgcolor: '#f5f5f5' }
                                }}
                            >
                                ORDER NOW
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default QBanner;
