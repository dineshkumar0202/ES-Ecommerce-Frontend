import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Avatar, Paper, Chip, IconButton,
    Stack, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField
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

import { CartService, WishlistService, OrderService, AuthService } from '../../services/api';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>({
        name: 'Dinesh Kumar M',
        role: 'Verified Member',
        lastLogin: '2 hours ago',
        avatar: '',
        totalInvestment: '₹24,840',
        memberPercentile: 'TOP 2% OF ELITE MEMBERS',
        uniqueId: ''
    });

    const [cartCount, setCartCount] = useState(2);
    const [wishlistCount, setWishlistCount] = useState(12);
    const [orders, setOrders] = useState<any[]>([]);

    // Edit Profile State
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editAvatar, setEditAvatar] = useState('');

    const handleOpenEdit = () => {
        setEditName(userData.name);
        setEditAvatar(userData.avatar);
        setIsEditOpen(true);
    };

    const handleEditSave = () => {
        setUserData((prev: any) => ({ ...prev, name: editName, avatar: editAvatar }));
        localStorage.setItem('userName', editName);
        localStorage.setItem('userProfileImage', editAvatar);
        setIsEditOpen(false);
    };

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');
        if (savedName) setUserData((prev: any) => ({ ...prev, name: savedName }));
        if (savedAvatar) setUserData((prev: any) => ({ ...prev, avatar: savedAvatar }));

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [cartRes, wishlistRes, ordersRes, userRes] = await Promise.all([
                CartService.getCart().catch(() => ({ data: { cartItems: [] } })),
                WishlistService.getWishlist().catch(() => ({ data: { products: [] } })),
                OrderService.getMyOrders().catch(() => ({ data: [] })),
                AuthService.getMe().catch(() => ({ data: null }))
            ]);

            if (userRes && userRes.data) {
                setUserData((prev: any) => ({
                    ...prev,
                    name: userRes.data.username || userRes.data.profile?.name || prev.name,
                    role: userRes.data.role || prev.role,
                    uniqueId: userRes.data.uniqueId || userRes.data._id,
                    avatar: userRes.data.profile?.avatar || prev.avatar
                }));
            }

            setCartCount(cartRes.data?.cartItems?.length || 0);
            setWishlistCount(wishlistRes.data?.products?.length || 0);

            if (ordersRes.data && ordersRes.data.length > 0) {
                // specific logic to sort by date if backend doesn't sorting
                const sortedOrders = ordersRes.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error("Profile data fetch error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const getStatusIndex = (status: string) => {
        switch (status) {
            case 'Ordered': return 0;
            case 'Shipped': return 1;
            case 'Out for Delivery': return 2;
            case 'Delivered': return 3;
            default: return 0;
        }
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
                                {userData.uniqueId && (
                                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ bgcolor: '#f1f5f9', px: 1, borderRadius: 1 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 900, color: '#0f172a' }}>ID: {userData.uniqueId}</Typography>
                                    </Stack>
                                )}
                                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                    Last login: {userData.lastLogin}
                                </Typography>
                            </Stack>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            <Button
                                onClick={handleOpenEdit}
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
                            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 10, border: '1px solid #f1f5f9', maxHeight: '800px', overflowY: 'auto' }}>
                                <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, position: 'sticky', top: 0, bgcolor: 'white', zIndex: 10, pb: 2, borderBottom: '1px solid #f1f5f9' }}>ORDER HISTORY ({orders.length})</Typography>

                                {orders && orders.length > 0 ? (
                                    <Stack spacing={6}>
                                        {orders.map((order: any) => (
                                            <Box key={order._id} sx={{ pb: 6, borderBottom: '1px dashed #e2e8f0', '&:last-child': { borderBottom: 'none', pb: 0 } }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Order #{order._id.substring(0, 8).toUpperCase()}</Typography>
                                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString()}</Typography>
                                                    </Box>
                                                    <Chip label={order.status.toUpperCase()} sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, px: 2, height: 24, fontSize: '0.65rem' }} />
                                                </Box>

                                                <Stack spacing={3}>
                                                    {order.orderItems.map((item: any) => (
                                                        <Stack key={item._id} direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                                            <Box sx={{ width: 80, height: 80, bgcolor: '#f1f5f9', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                ) : (
                                                                    <LocalMallOutlinedIcon sx={{ fontSize: 24, opacity: 0.1 }} />
                                                                )}
                                                            </Box>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>{item.title}</Typography>
                                                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 1 }}>
                                                                    Qty {item.quantity} • ₹{item.price}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>₹{item.price * item.quantity}</Typography>
                                                        </Stack>
                                                    ))}
                                                </Stack>

                                                {/* Progress Bar for each order */}
                                                <Box sx={{ mt: 4, px: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, position: 'relative' }}>
                                                        <Box sx={{ position: 'absolute', top: 6, left: 10, right: 10, height: 2, bgcolor: '#f1f5f9', zIndex: 0 }} />
                                                        <Box sx={{ position: 'absolute', top: 6, left: 10, width: `${(getStatusIndex(order.status) / 3) * 100}%`, height: 2, bgcolor: '#B4D5DC', zIndex: 1 }} />
                                                        {['ORDERED', 'SHIPPED', 'INTRANSIT', 'DELIVERED'].map((stage, i) => {
                                                            const isActive = i <= getStatusIndex(order.status);
                                                            return (
                                                                <Box key={stage} sx={{ textAlign: 'center', zIndex: 2 }}>
                                                                    <Box
                                                                        sx={{
                                                                            width: 14, height: 14, borderRadius: '50%',
                                                                            bgcolor: isActive ? '#B4D5DC' : '#f1f5f9',
                                                                            mx: 'auto', mb: 1,
                                                                            border: '2px solid white',
                                                                            boxShadow: isActive ? '0 0 0 2px #B4D5DC' : 'none'
                                                                        }}
                                                                    />
                                                                    <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.55rem', color: isActive ? 'black' : '#94a3b8', letterSpacing: 0.5, display: { xs: 'none', sm: 'block' } }}>
                                                                        {stage}
                                                                    </Typography>
                                                                </Box>
                                                            );
                                                        })}
                                                    </Box>
                                                </Box>

                                                <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
                                                    <Button size="small" variant="outlined" sx={{ color: '#0f172a', borderColor: '#e2e8f0', fontWeight: 800, borderRadius: 3 }}>
                                                        DETAILS
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <LocalMallOutlinedIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#94a3b8' }}>No orders found</Typography>
                                        <Button
                                            onClick={() => navigate('/retail')}
                                            sx={{ mt: 2, color: '#0f172a', fontWeight: 900 }}
                                        >
                                            Browse Products
                                        </Button>
                                    </Box>
                                )}
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

            {/* Edit Profile Dialog */}
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 900 }}>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Display Name"
                            fullWidth
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            label="Avatar URL"
                            fullWidth
                            value={editAvatar}
                            onChange={(e) => setEditAvatar(e.target.value)}
                            variant="outlined"
                            helperText="Enter a URL for your profile picture"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setIsEditOpen(false)} sx={{ color: '#64748b', fontWeight: 900 }}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" sx={{ bgcolor: 'black', color: 'white', fontWeight: 900 }}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Profile;