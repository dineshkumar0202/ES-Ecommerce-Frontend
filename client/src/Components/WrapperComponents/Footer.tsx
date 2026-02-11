import { Box, Container, Typography, Stack, IconButton, Divider, InputBase, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#020617', color: 'white', pt: 10, pb: 6, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' },
                    gap: { xs: 6, md: 8 }
                }}>
                    {/* Brand Section */}
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
                            <Box sx={{
                                bgcolor: '#B4D5DC',
                                width: 32,
                                height: 32,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <LocalMallIcon sx={{ color: '#020617', fontSize: 18 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, color: 'white' }}>ATOZ.IN</Typography>
                        </Stack>

                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4, maxWidth: 320, lineHeight: 1.8, fontWeight: 500 }}>
                            Your premium destination for high-quality electronics, fashion, and home essentials.
                            We curate the best products so you can live your best life.
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            {[FacebookIcon, InstagramIcon, AlternateEmailIcon].map((Icon, idx) => (
                                <IconButton
                                    key={idx}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        color: '#cbd5e1',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }
                                    }}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Stack>
                    </Box>

                    {/* Shop Links */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: 1.5, color: 'white' }}>Shop</Typography>
                        <Stack spacing={2.5}>
                            {['New Arrivals', 'Best Sellers', 'Electronics', 'Home Decor'].map((link) => (
                                <Typography
                                    key={link}
                                    variant="body2"
                                    sx={{
                                        color: '#94a3b8',
                                        cursor: 'pointer',
                                        fontWeight: 500,
                                        '&:hover': { color: 'white' },
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    {link}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>

                    {/* Support Links */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: 1.5, color: 'white' }}>Support</Typography>
                        <Stack spacing={2.5}>
                            {['Help Center', 'Shipping Policy', 'Return & Refund', 'Contact Us'].map((link) => (
                                <Typography
                                    key={link}
                                    variant="body2"
                                    sx={{
                                        color: '#94a3b8',
                                        cursor: 'pointer',
                                        fontWeight: 500,
                                        '&:hover': { color: 'white' },
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    {link}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>

                    {/* Newsletter Section */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 4, textTransform: 'uppercase', letterSpacing: 1.5, color: 'white' }}>Join Our Newsletter</Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, lineHeight: 1.6, fontWeight: 500 }}>
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderRadius: 1.5,
                            p: 0.5,
                            border: '1px solid rgba(255,255,255,0.1)',
                            '&:focus-within': { borderColor: '#B4D5DC' }
                        }}>
                            <InputBase
                                placeholder="Enter your email"
                                sx={{
                                    ml: 2,
                                    flex: 1,
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    fontWeight: 500
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#B4D5DC',
                                    color: '#020617',
                                    fontWeight: 800,
                                    fontSize: '0.75rem',
                                    borderRadius: 1,
                                    px: 3,
                                    '&:hover': { bgcolor: '#9bbec9' }
                                }}
                            >
                                SUBSCRIBE
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mt: 10, mb: 4 }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5 }}>
                        © {new Date().getFullYear()} ATOZ.IN. ALL RIGHTS RESERVED.
                    </Typography>

                    <Stack direction="row" spacing={4}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
                            <Typography
                                key={link}
                                variant="caption"
                                sx={{
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                {link}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
