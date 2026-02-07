
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SHHero = () => {
    return (
        <Box sx={{
            bgcolor: '#1a1a1a', // Dark background
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            minHeight: '320px',
            color: 'white'
        }}>
            {/* Content Content */}
            <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '500px' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, lineHeight: 0.9, letterSpacing: -1, textTransform: 'uppercase' }}>
                    Refurbished<br />
                    <Box component="span" sx={{ color: '#bef264' }}>Tech Deals</Box>
                </Typography>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4, fontSize: '1.1rem' }}>
                    Premium bulk devices inspected by experts.<br />
                    Get industry-leading hardware at fraction of the cost.
                </Typography>
                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        bgcolor: '#bef264',
                        color: 'black',
                        fontWeight: 800,
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#d9f99d' }
                    }}
                >
                    Shop Refurbished
                </Button>
            </Box>

            {/* Laptop Image Placeholder - Right Side */}
            <Box
                component="img"
                src="https://images.unsplash.com/photo-1531297420407-e6f252466041?bg=1a1a1a&auto=format&fit=crop&w=800&q=80"
                sx={{
                    position: 'absolute',
                    right: { xs: -100, md: -50 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '110%',
                    width: 'auto',
                    objectFit: 'cover',
                    zIndex: 1,
                    maskImage: 'linear-gradient(to right, transparent, black 20%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)'
                }}
            />
        </Box>
    );
};

export default SHHero;
