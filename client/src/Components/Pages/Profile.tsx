import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Avatar, Paper, Chip, IconButton,
    Stack, Container, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DiamondIcon from '@mui/icons-material/Diamond';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { CartService, WishlistService } from '../../services/api';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: 'Dinesh Kumar M',
        role: 'Verified Member',
        lastLogin: '2 hours ago',
        avatar: '',
        totalInvestment: '₹24,840',
        memberPercentile: 'TOP 2% OF ELITE MEMBERS'
    });

    const [cartCount, setCartCount] = useState(2);
    const [wishlistCount, setWishlistCount] = useState(12);

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');
        if (savedName) setUserData(prev => ({ ...prev, name: savedName }));
        if (savedAvatar) setUserData(prev => ({ ...prev, avatar: savedAvatar }));

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [cartRes, wishlistRes] = await Promise.all([
                CartService.getCart().catch(() => ({ data: { cartItems: [] } })),
                WishlistService.getWishlist().catch(() => ({ data: { products: [] } })),
            ]);

            setCartCount(cartRes.data?.cartItems?.length || 2);
            setWishlistCount(wishlistRes.data?.products?.length || 12);
        } catch (error) {
            console.error("Profile data fetch error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Left Sidebar - Hidden on mobile/tablet */}
            <Paper
                elevation={0}
                sx={{
                    width: { xs: 0, md: 80, lg: 100 },
                    bgcolor: 'black',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 4,
                    borderRadius: 0,
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 1300
                }}
            >
                <IconButton sx={{ mb: 6, color: '#B4D5DC' }} onClick={() => navigate('/')}>
                    <Box sx={{ p: 1, bgcolor: 'rgba(180, 213, 220, 0.2)', borderRadius: 3 }}>
                        <DiamondIcon />
                    </Box>
                </IconButton>

                <Stack spacing={4} sx={{ flex: 1 }}>
                    <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }} onClick={() => navigate('/profile')}>
                        <GridViewIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }} onClick={() => navigate('/retail')}>
                        <LocalMallOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }} onClick={() => navigate('/profile')}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }}>
                        <AccountBalanceWalletOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }}>
                        <SettingsOutlinedIcon />
                    </IconButton>
                </Stack>

                <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }} onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Paper>

            {/* Main Content Area */}
            <Box sx={{ flex: 1, ml: { xs: 0, md: '80px', lg: '100px' }, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
                    {/* Header Banner */}
                    <Box
                        sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: { xs: 8, md: 12 },
                            bgcolor: '#f0f9fa',
                            mb: { xs: 4, md: 6 },
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            textAlign: { xs: 'center', md: 'left' },
                            gap: 4
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={userData.avatar}
                                sx={{
                                    width: { xs: 120, md: 180 },
                                    height: { xs: 120, md: 180 },
                                    border: '4px solid white',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    bgcolor: '#f1f5f9'
                                }}
                            />
                            <Chip
                                label="ELITE"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 10,
                                    bgcolor: 'black',
                                    color: 'white',
                                    fontWeight: 900,
                                    fontSize: '0.65rem'
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 1, letterSpacing: -2, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                                {userData.name}
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <CheckCircleIcon sx={{ color: 'black', fontSize: 18 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#64748b' }}>
                                        {userData.role}
                                    </Typography>
                                </Stack>
                                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                    Last login: {userData.lastLogin}
                                </Typography>
                            </Stack>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            <Button
                                variant="contained"
                                fullWidth={true}
                                sx={{
                                    bgcolor: 'black',
                                    color: 'white',
                                    fontWeight: 900,
                                    borderRadius: 4,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#333' }
                                }}
                            >
                                EDIT PROFILE
                            </Button>
                            <IconButton sx={{ border: '2px solid #e2e8f0', borderRadius: 4, p: 1.5, display: { xs: 'none', sm: 'flex' } }}>
                                <NotificationsNoneOutlinedIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* Dashboard Grid */}
                    <Grid container spacing={4}>
                        {/* Recent Order Tracker */}
                        <Grid size={{ xs: 12, md: 12, lg: 8 }}>
                            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 10, border: '1px solid #f1f5f9' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.5 }}>RECENT ORDER</Typography>
                                        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>Arriving by Thursday, 14th April</Typography>
                                    </Box>
                                    <Chip label="IN TRANSIT" sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, px: 2 }} />
                                </Box>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ mb: { xs: 4, md: 6 } }}>
                                    <Box sx={{ width: { xs: '100%', sm: 140 }, height: 140, bgcolor: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <LocalMallOutlinedIcon sx={{ fontSize: 40, opacity: 0.1 }} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Premium Cotton Structured Tee</Typography>
                                        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, mb: 4 }}>
                                            Midnight Black • Size XL • Qty 01
                                        </Typography>

                                        {/* Progress Bar Staged */}
                                        <Box sx={{ px: { xs: 0, sm: 2 } }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, position: 'relative' }}>
                                                <Box sx={{ position: 'absolute', top: 12, left: 10, right: 10, height: 2, bgcolor: '#f1f5f9', zIndex: 0 }} />
                                                <Box sx={{ position: 'absolute', top: 12, left: 10, width: '66%', height: 2, bgcolor: '#B4D5DC', zIndex: 1 }} />
                                                {['ORDERED', 'SHIPPED', 'INTRANSIT', 'DELIVERED'].map((stage, i) => (
                                                    <Box key={stage} sx={{ textAlign: 'center', zIndex: 2 }}>
                                                        <Box
                                                            sx={{
                                                                width: 14, height: 14, borderRadius: '50%',
                                                                bgcolor: i <= 2 ? '#B4D5DC' : '#f1f5f9',
                                                                mx: 'auto', mb: 1,
                                                                border: '2px solid white',
                                                                boxShadow: i <= 2 ? '0 0 0 2px #B4D5DC' : 'none'
                                                            }}
                                                        />
                                                        <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.55rem', color: i <= 2 ? 'black' : '#94a3b8', letterSpacing: 0.5 }}>
                                                            {stage}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 900, textAlign: { xs: 'left', sm: 'right' } }}>₹2,499.00</Typography>
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                    <Button variant="contained" sx={{ bgcolor: '#B4D5DC', color: '#0f172a', fontWeight: 900, borderRadius: 4, px: 4, py: 1.5, '&:hover': { bgcolor: '#a3c0c7' } }}>
                                        TRACK PACKAGE
                                    </Button>
                                    <Button variant="outlined" sx={{ color: '#0f172a', border: '2px solid #f1f5f9', fontWeight: 900, borderRadius: 4, px: 4, py: 1.5, '&:hover': { border: '2px solid #e2e8f0' } }}>
                                        ORDER DETAILS
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Annual Portfolio */}
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 2 }}>ANNUAL PORTFOLIO</Typography>
                                    <TrendingUpIcon sx={{ color: '#B4D5DC' }} />
                                </Box>

                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 1 }}>Total Investment</Typography>
                                    <Typography variant="h1" sx={{ fontWeight: 900, color: '#B4D5DC', letterSpacing: -2, mb: 1, fontSize: { xs: '3.5rem', md: '6rem' } }}>
                                        {userData.totalInvestment}
                                    </Typography>
                                </Box>

                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1 }}>
                                    {userData.memberPercentile}
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Latest Arrivals Scroller */}
                        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 10, border: '1px solid #f1f5f9' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>LATEST ARRIVALS</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton size="small" sx={{ border: '1px solid #f1f5f9' }}><KeyboardArrowLeftIcon /></IconButton>
                                        <IconButton size="small" sx={{ border: '1px solid #f1f5f9' }}><KeyboardArrowRightIcon /></IconButton>
                                    </Stack>
                                </Box>

                                <Grid container spacing={3}>
                                    {[
                                        { img: '⌚', name: 'QUANTUM CHRONO', price: '₹12,400' },
                                        { img: '🎧', name: 'ELITE AUDIO', price: '₹8,900' },
                                        { img: '🎒', name: 'NOMAD PACK', price: '₹4,200' }
                                    ].map((product) => (
                                        <Grid key={product.name} size={{ xs: 4 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Box sx={{
                                                    pt: '100%',
                                                    bgcolor: '#f8fafc',
                                                    borderRadius: 6,
                                                    mb: 2,
                                                    position: 'relative',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: { xs: '1.2rem', sm: '2rem' } }}>
                                                        {product.img}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#0f172a', display: 'block', fontSize: '0.6rem' }}>{product.name}</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.6rem' }}>{product.price}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Summary Cards */}
                        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ height: '100%' }}>
                                <Paper elevation={0} sx={{ p: 3, flex: 1, borderRadius: 8, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 4 }}>VOUCHERS</Typography>
                                    <Box sx={{ width: 40, height: 40, bgcolor: 'black', borderRadius: 2, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <DiamondIcon sx={{ color: 'white', fontSize: 20 }} />
                                    </Box>
                                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 0.5 }}>04</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 4 }}>ACTIVE REWARDS</Typography>
                                    <Button sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem' }}>VIEW ALL</Button>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 3, flex: 1, borderRadius: 8, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 4 }}>CART</Typography>
                                    <Box sx={{ width: 40, height: 40, bgcolor: '#f8fafc', borderRadius: '50%', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ShoppingCartOutlinedIcon sx={{ color: '#B4D5DC' }} />
                                    </Box>
                                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 0.5 }}>{String(cartCount).padStart(2, '0')}</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 4 }}>ITEMS READY</Typography>
                                    <Button
                                        onClick={() => navigate('/checkout')}
                                        sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, fontSize: '0.7rem', px: 2, borderRadius: 4, '&:hover': { bgcolor: '#333' } }}
                                    >
                                        VIEW ALL
                                    </Button>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 3, flex: 1, borderRadius: 8, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 4 }}>WISHLIST</Typography>
                                    <Box sx={{ width: 40, height: 40, bgcolor: '#f8fafc', borderRadius: '50%', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FavoriteBorderOutlinedIcon sx={{ color: '#B4D5DC' }} />
                                    </Box>
                                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 0.5 }}>{wishlistCount}</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 4 }}>SAVED ITEMS</Typography>
                                    <Button sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem' }}>VIEW ALL</Button>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Floating Theme Toggle */}
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 40,
                    right: 40,
                    width: 60,
                    height: 60,
                    bgcolor: 'black',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    '&:hover': { bgcolor: '#333' }
                }}
            >
                <DarkModeIcon />
            </IconButton>
        </Box>
    );
};

export default Profile;
