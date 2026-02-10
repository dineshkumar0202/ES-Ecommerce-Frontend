import { Box, Container, Typography, Stack, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'black', color: 'white', pt: 8, pb: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8 }}>
                    {/* Brand & Social */}
                    <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: '#B4D5DC' }}>ATOZ.</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.500', mb: 3, maxWidth: 300 }}>
                            Premium e-commerce experience tailor-made for specific user needs.
                            The ultimate destination for shopping, business, and services.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}><FacebookIcon fontSize="small" /></IconButton>
                            <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}><TwitterIcon fontSize="small" /></IconButton>
                            <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}><InstagramIcon fontSize="small" /></IconButton>
                            <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}><YouTubeIcon fontSize="small" /></IconButton>
                        </Stack>
                    </Box>

                    {/* Links Column 1 */}
                    <Box sx={{ width: { xs: '50%', md: '16.66%' } }}>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>Shop</Typography>
                        <Stack spacing={2} sx={{ color: 'grey.500' }}>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>New Arrivals</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Best Sellers</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Men</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Women</Typography>
                        </Stack>
                    </Box>

                    {/* Links Column 2 */}
                    <Box sx={{ width: { xs: '50%', md: '16.66%' } }}>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>Company</Typography>
                        <Stack spacing={2} sx={{ color: 'grey.500' }}>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>About Us</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Careers</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Press</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Contact</Typography>
                        </Stack>
                    </Box>

                    {/* Links Column 3 */}
                    <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>Support</Typography>
                        <Stack spacing={2} sx={{ color: 'grey.500' }}>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Help Center</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Returns & Exchanges</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Shipping</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: '#B4D5DC' } }}>Terms & Conditions</Typography>
                        </Stack>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mt: 8, mb: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="caption" sx={{ color: 'grey.600' }}>
                        © 2026 ATOZ Inc. All rights reserved.
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Typography variant="caption" sx={{ color: 'grey.600', cursor: 'pointer' }}>Privacy Policy</Typography>
                        <Typography variant="caption" sx={{ color: 'grey.600', cursor: 'pointer' }}>Terms of Use</Typography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
