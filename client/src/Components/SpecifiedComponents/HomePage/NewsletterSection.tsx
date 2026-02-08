import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const NewsletterSection = () => {
    return (
        <Box
            sx={{
                bgcolor: '#0f0c29',
                background: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
                color: 'white',
                py: { xs: 6, md: 8 },
                position: 'relative',
                overflow: 'hidden',
                mt: 0
            }}
        >
            {/* Background Decorations */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: -100,
                    width: 300,
                    height: 300,
                    bgcolor: 'rgba(255, 107, 107, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -50,
                    right: -50,
                    width: 250,
                    height: 250,
                    bgcolor: 'rgba(78, 205, 196, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(50px)'
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <Typography variant="overline" sx={{ color: '#4ECDC4', letterSpacing: 2, fontWeight: 700 }}>
                    Stay in the Loop
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
                    Join Our Exclusive Club
                </Typography>
                <Typography variant="body1" sx={{ color: '#b2bec3', mb: 4, maxWidth: '600px', mx: 'auto', fontSize: '1.1rem' }}>
                    Subscribe to receive 10% off your first order, plus exclusive access to new drops, special offers, and behind-the-scenes content.
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                    sx={{ maxWidth: '500px', mx: 'auto' }}
                >
                    <TextField
                        placeholder="Enter your email address"
                        variant="outlined"
                        fullWidth
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50px',
                            input: {
                                color: 'white',
                                px: 3,
                                py: 1.5
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                                '&.Mui-focused fieldset': { borderColor: '#4ECDC4' },
                            },
                            '& .MuiOutlinedInput-input::placeholder': {
                                color: 'rgba(255,255,255,0.5)',
                                opacity: 1
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{
                            borderRadius: '50px',
                            px: 4,
                            py: 1.5,
                            bgcolor: '#FF6B6B',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
                            '&:hover': {
                                bgcolor: '#FF5252',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 25px rgba(255, 107, 107, 0.4)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Subscribe
                    </Button>
                </Stack>

                <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'rgba(255,255,255,0.4)' }}>
                    We respect your privacy. Unsubscribe at any time.
                </Typography>
            </Container>
        </Box>
    );
};

export default NewsletterSection;
