import { Box, Typography, Paper, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const QHero = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, md: 5 },
                mb: 4,
                background: 'linear-gradient(135deg, #ecfccb 0%, #bef264 100%)',
                borderRadius: 4,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.4)'
            }}
        >
            <Box sx={{ zIndex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 900,
                        color: '#1a2e05',
                        mb: 1,
                        fontSize: { xs: '2rem', md: '3rem' },
                        letterSpacing: '-0.02em'
                    }}
                >
                    10 Minute Delivery
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mt: 1,
                    color: '#3f6212',
                    bgcolor: 'rgba(255,255,255,0.5)',
                    py: 1,
                    px: 2,
                    borderRadius: 20,
                    width: 'fit-content',
                    mx: { xs: 'auto', md: 0 }
                }}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" fontWeight="700">
                        Super fast delivery to your door
                    </Typography>
                </Box>
            </Box>
            <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                    bgcolor: '#1a2e05',
                    color: '#fff',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: 50,
                    textTransform: 'none',
                    mt: { xs: 3, md: 0 },
                    boxShadow: '0 4px 14px 0 rgba(26, 46, 5, 0.39)',
                    '&:hover': {
                        bgcolor: '#365314',
                        boxShadow: '0 6px 20px rgba(26, 46, 5, 0.23)',
                        transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                Order Now
            </Button>

            {/* Decoration Circles */}
            <Box sx={{
                position: 'absolute',
                right: -50,
                bottom: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.3)',
                zIndex: 0
            }} />
        </Paper>
    );
};

export default QHero;
