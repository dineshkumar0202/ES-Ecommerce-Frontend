import { Box, Typography, Button, Stack, Chip, Avatar } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ValentineBanner = () => {
    return (
        <Box sx={{ width: '100%', mb: 6 }}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: 'white',
                    borderRadius: 6,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f1f5f9',
                    minHeight: 450
                }}
            >
                {/* Left Content Side */}
                <Box sx={{
                    flex: 1.2,
                    p: { xs: 4, md: 8 },
                    zIndex: 2,
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {/* Tag */}
                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <Chip
                            icon={<FavoriteIcon sx={{ fontSize: '0.8rem !important', color: '#e11d48 !important' }} />}
                            label="SEASONAL EXCLUSIVE"
                            sx={{
                                bgcolor: '#ffe4e6',
                                color: '#e11d48',
                                fontWeight: 800,
                                fontSize: '0.65rem',
                                letterSpacing: 1,
                                height: 24,
                                borderRadius: 1,
                                '& .MuiChip-label': { px: 1.5 }
                            }}
                        />
                    </Box>

                    {/* Heading */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            lineHeight: 0.95,
                            color: '#0f172a',
                            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                            letterSpacing: '-1.5px',
                            mb: 1
                        }}
                    >
                        Valentine's Day
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            lineHeight: 0.95,
                            color: '#dc2626',
                            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                            letterSpacing: '-1.5px',
                            mb: 3
                        }}
                    >
                        Flash Deal
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            fontSize: '1rem',
                            maxWidth: '460px',
                            mb: 4,
                            lineHeight: 1.6,
                            fontWeight: 500
                        }}
                    >
                        Get the perfect gift for your loved ones. Luxury jewelry sets,
                        premium fragrances, and tech gifts at unbeatable prices.
                    </Typography>

                    {/* Discount & Avatars */}
                    <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 5 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#dc2626', letterSpacing: '-1px' }}>
                                Up to 60% OFF
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block', mt: 0.5 }}>
                                Limited inventory available
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', ml: 2 }}>
                            {[
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64',
                                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64',
                                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64'
                            ].map((src, i) => (
                                <Avatar
                                    key={i}
                                    src={src}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        border: '2px solid white',
                                        ml: i === 0 ? 0 : -1.5,
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                />
                            ))}
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: '#dc2626',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    ml: -1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                            >
                                +12k
                            </Box>
                        </Box>
                    </Stack>

                    {/* Buttons */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            variant="contained"
                            size="large"
                            disableElevation
                            sx={{
                                bgcolor: '#dc2626',
                                color: 'white',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                borderRadius: 2,
                                fontSize: '1rem',
                                '&:hover': {
                                    bgcolor: '#b91c1c',
                                }
                            }}
                        >
                            Shop Valentine's Collection
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: '#e2e8f0',
                                color: '#0f172a',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                borderRadius: 2,
                                fontSize: '1rem',
                                '&:hover': {
                                    borderColor: '#cbd5e1',
                                    bgcolor: '#f8fafc'
                                }
                            }}
                        >
                            View Guide
                        </Button>
                    </Stack>
                </Box>

                {/* Right Image Side */}
                <Box
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(90deg, #ffffff 0%, #ef4444 30%, #7f1d1d 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: { xs: 300, md: 'auto' },
                        overflow: 'hidden',
                        // Mask gradient to fade into white on the left
                        maskImage: 'linear-gradient(to right, transparent, black 20%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)',
                    }}
                >
                    {/* Real background color to back the gradient */}
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                        background: 'linear-gradient(135deg, #fecaca 0%, #dc2626 50%, #7f1d1d 100%)',
                    }} />

                    {/* Free Wrapping Badge */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 40,
                            right: 40,
                            bgcolor: 'white',
                            pl: 0.8,
                            pr: 2,
                            py: 0.8,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            zIndex: 10
                        }}
                    >
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: '#fee2e2',
                                borderRadius: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <CardGiftcardIcon sx={{ color: '#dc2626', fontSize: 18 }} />
                        </Box>
                        <Stack spacing={0}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.75rem', lineHeight: 1.2 }}>
                                Free Premium Wrapping
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Gift Box Image */}
                    <Box
                        component="img"
                        src="/gift-1.png"
                        alt="Valentine Gift Box"
                        sx={{
                            width: '85%',
                            maxWidth: 500,
                            height: 'auto',
                            filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))',
                            transform: 'scale(1) rotate(-5deg)',
                            transition: 'transform 0.5s ease',
                            mixBlendMode: 'normal',
                            '&:hover': {
                                transform: 'scale(1.05) rotate(0deg)',
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ValentineBanner;
