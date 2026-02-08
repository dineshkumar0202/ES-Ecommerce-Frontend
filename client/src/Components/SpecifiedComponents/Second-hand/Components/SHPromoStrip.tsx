
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const SHPromoStrip = () => {
    return (
        <Box sx={{
            bgcolor: '#bef264',
            borderRadius: 3,
            py: 2,
            px: 3,
            mb: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.01)' }
        }}>
            <LocalOfferIcon sx={{ color: 'black' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'black', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                GET 10% OFF ON YOUR FIRST REFURBISHED PURCHASE
            </Typography>
            <ArrowForwardIcon sx={{ fontSize: 18, color: 'black' }} />
        </Box>
    );
};

export default SHPromoStrip;
