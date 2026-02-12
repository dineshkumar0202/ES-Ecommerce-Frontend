import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Avatar, Paper, Chip, IconButton,
    Stack, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { CartService, WishlistService, OrderService, AuthService, UserService, WholesaleService, ResaleService, QProductService, FreelanceService } from '../../services/api';
import { toast } from 'react-toastify';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StoreIcon from '@mui/icons-material/Store';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const Profile = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState<any>({
        name: 'Dinesh Kumar M',
        email: 'dinesh.kumar@example.com',
        phone: '+919876543210',
        role: 'Verified Member',
        lastLogin: '2 hours ago',
        avatar: '',
        uniqueId: ''
    });

    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [currentView, setCurrentView] = useState<'overview' | 'cart' | 'wishlist' | 'wallet'>('overview');
    type ChannelKey = 'retail' | 'wholesale' | 'quick' | 'resale' | 'freelance' | null;
    const [selectedChannel, setSelectedChannel] = useState<ChannelKey>(null);
    const [wholesaleProducts, setWholesaleProducts] = useState<any[]>([]);
    const [resaleItems, setResaleItems] = useState<any[]>([]);
    const [qCommerceProducts, setQCommerceProducts] = useState<any[]>([]);
    const [freelancePosts, setFreelancePosts] = useState<any[]>([]);
    const [channelLoading, setChannelLoading] = useState(false);

    // Edit Profile State (all editable except ID)
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAvatar, setEditAvatar] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);

    const handleOpenEdit = () => {
        setEditName(userData.name);
        setEditEmail(userData.email || '');
        setEditPhone(userData.phone || '');
        setEditAvatar(userData.avatar || '');
        setIsEditOpen(true);
    };

    const handleEditSave = async () => {
        setSavingProfile(true);
        try {
            const updated = {
                name: editName,
                email: editEmail,
                phone: editPhone,
                avatar: editAvatar
            };
            setUserData((prev: any) => ({ ...prev, ...updated }));
            localStorage.setItem('userName', editName);
            localStorage.setItem('userProfileImage', editAvatar);
            if (userData.uniqueId) {
                await UserService.updateUserProfile(userData.uniqueId, {
                    username: editName,
                    email: editEmail,
                    profile: { ...userData.profile, avatar: editAvatar, phone: editPhone }
                }).catch(() => { });
            }
        } finally {
            setSavingProfile(false);
            setIsEditOpen(false);
        }
    };

    useEffect(() => {
        const view = searchParams.get('view');
        if (view === 'cart' || view === 'wishlist' || view === 'wallet' || view === 'overview') {
            setCurrentView(view as any);
        }
    }, [searchParams]);

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');
        if (savedName) setUserData((prev: any) => ({ ...prev, name: savedName }));
        if (savedAvatar) setUserData((prev: any) => ({ ...prev, avatar: savedAvatar }));

        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedChannel) return;
        setChannelLoading(true);
        const load = async () => {
            try {
                if (selectedChannel === 'wholesale') {
                    const { data } = await WholesaleService.getMyProducts().catch(() => ({ data: [] }));
                    setWholesaleProducts(Array.isArray(data) ? data : []);
                } else if (selectedChannel === 'resale') {
                    const { data } = await ResaleService.getAll().catch(() => ({ data: [] }));
                    setResaleItems(Array.isArray(data) ? data : []);
                } else if (selectedChannel === 'quick') {
                    const { data } = await QProductService.getAll().catch(() => ({ data: [] }));
                    setQCommerceProducts(Array.isArray(data) ? data : []);
                } else if (selectedChannel === 'freelance') {
                    const { data } = await FreelanceService.getAll().catch(() => ({ data: [] }));
                    setFreelancePosts(Array.isArray(data) ? data : []);
                }
            } finally {
                setChannelLoading(false);
            }
        };
        load();
    }, [selectedChannel]);

    const fetchData = async () => {
        try {
            const [cartRes, wishlistRes, ordersRes, userRes] = await Promise.all([
                CartService.getCart().catch(() => ({ data: { cartItems: [] } })),
                WishlistService.getWishlist().catch(() => ({ data: { products: [] } })),
                OrderService.getMyOrders().catch(() => ({ data: [] })),
                AuthService.getMe().catch(() => ({ data: null }))
            ]);

            if (userRes && userRes.data) {
                const d = userRes.data;
                setUserData((prev: any) => ({
                    ...prev,
                    name: d.username || d.profile?.name || prev.name,
                    email: d.email || d.profile?.email || prev.email,
                    phone: d.phone || d.profile?.phone || prev.phone,
                    role: d.role || prev.role,
                    uniqueId: d.uniqueId || d._id,
                    avatar: d.profile?.avatar || prev.avatar,
                    profile: d.profile || prev.profile
                }));
            }

            setCartCount(cartRes.data?.cartItems?.length || 0);
            setCartItems(cartRes.data?.cartItems || []);
            setWishlistCount(wishlistRes.data?.products?.length || 0);
            setWishlistItems(wishlistRes.data?.products || []);

            if (ordersRes.data && ordersRes.data.length > 0) {
                // specific logic to sort by date if backend doesn't sorting
                const sortedOrders = ordersRes.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error("Profile data fetch error:", error);
        }
    };

    const handleRemoveWishlist = async (productId: string) => {
        try {
            await WishlistService.removeFromWishlist(productId);
            setWishlistItems(prev => prev.filter(item => item._id !== productId));
            setWishlistCount(prev => prev - 1);
            toast.success("Removed from wishlist");
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove");
        }
    };

    const handleAddToCart = async (product: any) => {
        try {
            // Map frontend types to backend CartService expectations
            const typeMapping: any = {
                'retail': 'Retail',
                'wholesale': 'Wholesale',
                'q-commerce': 'Quick',
                'resale': 'Resale'
            };
            const mappedType = typeMapping[product.type] || 'Retail';

            await CartService.addToCart({
                productId: product._id,
                quantity: 1,
                type: mappedType
            });
            setCartCount(prev => prev + 1);
            toast.success("Added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart");
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
                    width: { xs: 0, md: 80, lg: 220 },
                    bgcolor: 'black',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    alignItems: { md: 'center', lg: 'stretch' },
                    py: 4,
                    px: { lg: 2 },
                    borderRadius: 0,
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 1300
                }}
            >
                <IconButton sx={{ mb: 2, color: '#B4D5DC' }} onClick={() => navigate('/')}>
                    <Box sx={{ p: 1, bgcolor: 'rgba(180, 213, 220, 0.2)', borderRadius: 3 }}>
                        <DiamondIcon />
                    </Box>
                </IconButton>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 900, letterSpacing: 1.5, mb: 2, display: { md: 'none', lg: 'block' }, px: 1 }}>
                    MARKETPLACE CHANNELS
                </Typography>

                {/* Marketplace channels - show activity on profile (no redirect) */}
                <Stack spacing={0.5} sx={{ mb: 2 }}>
                    {[
                        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, channel: 'retail' as ChannelKey },
                        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, channel: 'wholesale' as ChannelKey },
                        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, channel: 'quick' as ChannelKey },
                        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, channel: 'resale' as ChannelKey },
                        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, channel: 'freelance' as ChannelKey }
                    ].map((item) => (
                        <Button
                            key={item.channel}
                            fullWidth
                            startIcon={item.icon}
                            onClick={() => { setSelectedChannel(item.channel); setCurrentView('overview'); }}
                            sx={{
                                justifyContent: { md: 'center', lg: 'flex-start' },
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 700,
                                borderRadius: 2,
                                py: 1.25,
                                px: { lg: 2 },
                                bgcolor: selectedChannel === item.channel ? 'rgba(255,255,255,0.15)' : 'transparent',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' }
                            }}
                        >
                            <Typography variant="body2" sx={{ display: { md: 'none', lg: 'block' } }}>{item.name}</Typography>
                        </Button>
                    ))}
                </Stack>

                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 900, letterSpacing: 1, mt: 2, mb: 1, display: { md: 'none', lg: 'block' }, px: 1 }}>
                    ACCOUNT
                </Typography>
                <Stack spacing={0.5} sx={{ flex: 1 }}>
                    <IconButton
                        sx={{ color: 'white', bgcolor: currentView === 'overview' && !selectedChannel ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 3, p: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
                        onClick={() => { setCurrentView('overview'); setSelectedChannel(null); }}
                        title="Dashboard"
                    >
                        <GridViewIcon />
                    </IconButton>
                    <IconButton
                        sx={{ color: 'white', bgcolor: currentView === 'cart' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 3, p: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
                        onClick={() => setCurrentView('cart')}
                        title="Cart"
                    >
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton
                        sx={{ color: 'white', bgcolor: currentView === 'wishlist' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 3, p: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
                        onClick={() => setCurrentView('wishlist')}
                        title="Wishlist"
                    >
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                    <IconButton
                        sx={{ color: 'white', bgcolor: currentView === 'wallet' ? 'rgba(255,255,255,0.1)' : 'transparent', borderRadius: 3, p: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}
                        onClick={() => setCurrentView('wallet')}
                        title="Wallet"
                    >
                        <AccountBalanceWalletOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1 } }} title="Gallery">
                        <ImageOutlinedIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1 } }} title="Settings">
                        <SettingsOutlinedIcon />
                    </IconButton>
                </Stack>

                <Box sx={{ display: { md: 'none', lg: 'block' }, px: 1, py: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: 1 }}>TOTAL BALANCE</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#B4D5DC', fontWeight: 900 }}>₹1,24,000</Typography>
                </Box>
                <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }} onClick={handleLogout} title="Logout">
                    <LogoutIcon />
                </IconButton>
            </Paper>

            {/* Main Content Area */}
            <Box sx={{ flex: 1, ml: { xs: 0, md: '80px', lg: '220px' }, display: 'flex', flexDirection: 'column' }}>
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
                            {(userData.email || userData.phone) && (
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1.5 }} alignItems={{ xs: 'center', md: 'flex-start' }}>
                                    {userData.email && (
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <EmailOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>{userData.email}</Typography>
                                        </Stack>
                                    )}
                                    {userData.phone && (
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <PhoneOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>{userData.phone}</Typography>
                                        </Stack>
                                    )}
                                </Stack>
                            )}
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

                    {/* Dynamic View Replacement */}
                    {currentView === 'overview' && (
                        <>
                            {/* Channel-specific activity (when a channel is selected) - stay on profile */}
                            {selectedChannel && (
                                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 10, border: '1px solid #f1f5f9', mb: 4 }}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4, pb: 2, borderBottom: '1px solid #f1f5f9' }}>
                                        {selectedChannel === 'retail' && <StoreIcon sx={{ color: '#B4D5DC', fontSize: 28 }} />}
                                        {selectedChannel === 'wholesale' && <WarehouseIcon sx={{ color: '#B4D5DC', fontSize: 28 }} />}
                                        {selectedChannel === 'quick' && <FlashOnIcon sx={{ color: '#B4D5DC', fontSize: 28 }} />}
                                        {selectedChannel === 'resale' && <AutorenewIcon sx={{ color: '#B4D5DC', fontSize: 28 }} />}
                                        {selectedChannel === 'freelance' && <WorkOutlineIcon sx={{ color: '#B4D5DC', fontSize: 28 }} />}
                                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                            {selectedChannel === 'retail' && 'Retail Activity'}
                                            {selectedChannel === 'wholesale' && 'Wholesale Activity'}
                                            {selectedChannel === 'quick' && 'Q-Commerce Activity'}
                                            {selectedChannel === 'resale' && 'Resale Activity'}
                                            {selectedChannel === 'freelance' && 'Freelance Activity'}
                                        </Typography>
                                    </Stack>
                                    {channelLoading ? (
                                        <Typography sx={{ py: 4, color: '#64748b', fontWeight: 600 }}>Loading...</Typography>
                                    ) : selectedChannel === 'retail' ? (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#64748b', mb: 2 }}>Your retail orders</Typography>
                                            {orders.length > 0 ? (
                                                <Stack spacing={3}>
                                                    {orders.map((order: any) => (
                                                        <Box key={order._id} sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Order #{order._id.substring(0, 8).toUpperCase()}</Typography>
                                                                <Chip label={order.status} size="small" sx={{ bgcolor: 'black', color: 'white', fontWeight: 700 }} />
                                                            </Stack>
                                                            {order.orderItems?.map((item: any) => (
                                                                <Typography key={item._id} variant="body2" sx={{ color: '#64748b' }}>• {item.title} × {item.quantity}</Typography>
                                                            ))}
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <LocalMallOutlinedIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 700 }}>No retail orders yet</Typography>
                                                    <Button onClick={() => navigate('/retail')} sx={{ mt: 2, fontWeight: 800 }}>Browse Retail</Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ) : selectedChannel === 'wholesale' ? (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#64748b', mb: 2 }}>Your wholesale listings</Typography>
                                            {wholesaleProducts.length > 0 ? (
                                                <Stack spacing={2}>
                                                    {wholesaleProducts.map((p: any) => (
                                                        <Stack key={p._id} direction="row" spacing={2} alignItems="center" sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                            <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: '#e2e8f0', overflow: 'hidden' }}>
                                                                {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <WarehouseIcon sx={{ color: '#94a3b8', mt: 1.5, ml: 1.5 }} />}
                                                            </Box>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{p.title || p.name}</Typography>
                                                                <Typography variant="caption" sx={{ color: '#64748b' }}>₹{p.price ?? p.minPrice ?? '—'}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    ))}
                                                </Stack>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <WarehouseIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 700 }}>No wholesale products listed</Typography>
                                                    <Button onClick={() => navigate('/wholesale')} sx={{ mt: 2, fontWeight: 800 }}>Go to Wholesale</Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ) : selectedChannel === 'quick' ? (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#64748b', mb: 2 }}>Q-Commerce products & orders</Typography>
                                            {qCommerceProducts.length > 0 ? (
                                                <Stack spacing={2}>
                                                    {qCommerceProducts.slice(0, 10).map((p: any) => (
                                                        <Stack key={p._id} direction="row" spacing={2} alignItems="center" sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                            <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: '#e2e8f0', overflow: 'hidden' }}>
                                                                {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FlashOnIcon sx={{ color: '#94a3b8', mt: 1.5, ml: 1.5 }} />}
                                                            </Box>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{p.title || p.name}</Typography>
                                                                <Typography variant="caption" sx={{ color: '#64748b' }}>₹{p.price ?? '—'}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    ))}
                                                </Stack>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <FlashOnIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 700 }}>No Q-Commerce activity yet</Typography>
                                                    <Button onClick={() => navigate('/quick')} sx={{ mt: 2, fontWeight: 800 }}>Browse Q-Commerce</Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ) : selectedChannel === 'resale' ? (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#64748b', mb: 2 }}>Resale listings</Typography>
                                            {resaleItems.length > 0 ? (
                                                <Stack spacing={2}>
                                                    {resaleItems.slice(0, 10).map((p: any) => (
                                                        <Stack key={p._id} direction="row" spacing={2} alignItems="center" sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                            <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: '#e2e8f0', overflow: 'hidden' }}>
                                                                {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <AutorenewIcon sx={{ color: '#94a3b8', mt: 1.5, ml: 1.5 }} />}
                                                            </Box>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{p.title || p.name}</Typography>
                                                                <Typography variant="caption" sx={{ color: '#64748b' }}>₹{p.price ?? '—'}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    ))}
                                                </Stack>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <AutorenewIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 700 }}>No resale items yet</Typography>
                                                    <Button onClick={() => navigate('/resale')} sx={{ mt: 2, fontWeight: 800 }}>Browse Resale</Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ) : selectedChannel === 'freelance' ? (
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#64748b', mb: 2 }}>Freelance posts & activity</Typography>
                                            {freelancePosts.length > 0 ? (
                                                <Stack spacing={2}>
                                                    {freelancePosts.slice(0, 10).map((p: any) => (
                                                        <Box key={p._id} sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{p.title || p.headline}</Typography>
                                                            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>{p.description?.slice(0, 120)}...</Typography>
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <WorkOutlineIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 700 }}>No freelance posts yet</Typography>
                                                    <Button onClick={() => navigate('/freelance')} sx={{ mt: 2, fontWeight: 800 }}>Browse Freelance</Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ) : null}
                                </Paper>
                            )}

                            {!selectedChannel && (
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
                                                                                Qty {item.quantity} • ₹{(Number(item.price) || 0).toLocaleString('en-IN')}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>₹{((Number(item.price) || 0) * (Number(item.quantity) || 0)).toLocaleString('en-IN')}</Typography>
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

                                    {/* Activity Feed */}
                                    <Grid size={{ xs: 12 }}>
                                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 10, border: '1px solid #f1f5f9' }}>
                                            <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 2, display: 'block', mb: 0.5 }}>ACTIVITY FEED</Typography>
                                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 700, mb: 3 }}>REAL-TIME HISTORY</Typography>
                                            <Stack spacing={2}>
                                                {[
                                                    { label: 'REVIEWED ITEM', time: '5 HOURS AGO' },
                                                    { label: 'ACHIEVED ORDER', time: 'YESTERDAY' },
                                                    { label: 'PRE-ORDERED', time: '3 DAYS AGO' },
                                                    { label: 'VERIFIED', time: '1 WEEK AGO' },
                                                    { label: 'JOINED ELITE', time: 'MAR 2004' }
                                                ].map((act, i) => (
                                                    <Stack key={i} direction="row" alignItems="center" spacing={2}>
                                                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <CheckCircleIcon sx={{ fontSize: 18, color: '#B4D5DC' }} />
                                                        </Box>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{act.label}</Typography>
                                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{act.time}</Typography>
                                                        </Box>
                                                    </Stack>
                                                ))}
                                            </Stack>
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

                                            <Paper elevation={0} sx={{ p: 3, flex: 1, borderRadius: 8, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setCurrentView('cart')}>
                                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 4 }}>CART</Typography>
                                                <Box sx={{ width: 40, height: 40, bgcolor: '#f8fafc', borderRadius: '50%', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ShoppingCartOutlinedIcon sx={{ color: '#B4D5DC' }} />
                                                </Box>
                                                <Typography variant="h2" sx={{ fontWeight: 900, mb: 0.5 }}>{String(cartCount).padStart(2, '0')}</Typography>
                                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 4 }}>ITEMS READY</Typography>
                                                <Button
                                                    onClick={(e) => { e.stopPropagation(); setCurrentView('cart'); }}
                                                    sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, fontSize: '0.7rem', px: 2, borderRadius: 4, '&:hover': { bgcolor: '#333' } }}
                                                >
                                                    VIEW ALL
                                                </Button>
                                            </Paper>

                                            <Paper elevation={0} sx={{ p: 3, flex: 1, borderRadius: 8, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => setCurrentView('wishlist')}>
                                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 4 }}>WISHLIST</Typography>
                                                <Box sx={{ width: 40, height: 40, bgcolor: '#f8fafc', borderRadius: '50%', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <FavoriteBorderOutlinedIcon sx={{ color: '#B4D5DC' }} />
                                                </Box>
                                                <Typography variant="h2" sx={{ fontWeight: 900, mb: 0.5 }}>{wishlistCount}</Typography>
                                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 4 }}>SAVED ITEMS</Typography>
                                                <Button
                                                    onClick={(e) => { e.stopPropagation(); setCurrentView('wishlist'); }}
                                                    sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem' }}
                                                >
                                                    VIEW ALL
                                                </Button>
                                            </Paper>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            )}
                        </>
                    )}

                    {currentView === 'cart' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Your Shopping Cart ({cartItems.length})</Typography>
                            {cartItems.length > 0 ? (
                                <Stack spacing={3}>
                                    {cartItems.map((item: any) => (
                                        <Paper key={item._id} elevation={0} sx={{ p: 3, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                            <Stack direction="row" spacing={3} alignItems="center">
                                                <Box sx={{ width: 100, height: 100, borderRadius: 4, overflow: 'hidden', bgcolor: 'white' }}>
                                                    <img src={item.productId?.images?.[0] || item.product?.images?.[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.productId?.title || item.product?.title}</Typography>
                                                    <Typography variant="body2" sx={{ color: '#64748b' }}>Quantity: {item.quantity}</Typography>
                                                </Box>
                                                <Typography variant="h5" sx={{ fontWeight: 900 }}>₹{item.productId?.price || item.product?.price}</Typography>
                                            </Stack>
                                        </Paper>
                                    ))}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                        <Button variant="contained" sx={{ bgcolor: 'black', color: 'white', borderRadius: 4, px: 6, py: 2, fontWeight: 900 }} onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT</Button>
                                    </Box>
                                </Stack>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 10 }}>
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: '#e2e8f0', mb: 3 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#94a3b8' }}>Your cart is empty</Typography>
                                    <Button sx={{ mt: 3, color: 'black', fontWeight: 900 }} onClick={() => navigate('/retail')}>Start Shopping</Button>
                                </Box>
                            )}
                        </Paper>
                    )}

                    {currentView === 'wishlist' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Saved for Later ({wishlistItems.length})</Typography>
                            {wishlistItems.length > 0 ? (
                                <Grid container spacing={4}>
                                    {wishlistItems.map((product: any) => (
                                        <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                            <Paper elevation={0} sx={{ p: 2, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9', height: '100%' }}>
                                                <Box sx={{ pt: '100%', position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 2 }}>
                                                    <img src={product.images?.[0] || product.image} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>{product.title}</Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#B4D5DC' }}>₹{product.price}</Typography>

                                                <Stack spacing={1} sx={{ mt: 2 }}>
                                                    {product.type !== 'freelance' && (
                                                        <Button
                                                            fullWidth
                                                            onClick={() => handleAddToCart(product)}
                                                            sx={{ bgcolor: 'black', color: 'white', borderRadius: 3, fontWeight: 900, fontSize: '0.75rem' }}
                                                        >
                                                            ADD TO CART
                                                        </Button>
                                                    )}
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={() => handleRemoveWishlist(product._id)}
                                                        sx={{
                                                            bgcolor: '#fee2e2',
                                                            color: '#ef4444',
                                                            borderRadius: 3,
                                                            fontWeight: 900,
                                                            fontSize: '0.75rem',
                                                            '&:hover': { bgcolor: '#fecaca' }
                                                        }}
                                                    >
                                                        REMOVE
                                                    </Button>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 10 }}>
                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 80, color: '#e2e8f0', mb: 3 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#94a3b8' }}>Your wishlist is empty</Typography>
                                    <Button sx={{ mt: 3, color: 'black', fontWeight: 900 }} onClick={() => navigate('/retail')}>Explore Products</Button>
                                </Box>
                            )}
                        </Paper>
                    )}

                    {currentView === 'wallet' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Digital Wallet</Typography>
                            <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: 8, bgcolor: 'black', color: 'white', mb: 6 }}>
                                <Typography variant="caption" sx={{ opacity: 0.5, letterSpacing: 2, fontWeight: 900 }}>CURRENT BALANCE</Typography>
                                <Typography variant="h1" sx={{ fontWeight: 900, mt: 1, letterSpacing: -2 }}>₹1,24,000</Typography>
                                <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                                    <Button sx={{ bgcolor: 'white', color: 'black', borderRadius: 3, px: 3, fontWeight: 900 }}>ADD FUNDS</Button>
                                    <Button sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 3, px: 3, fontWeight: 900 }}>TRANSACTIONS</Button>
                                </Stack>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Recent Activity</Typography>
                            <Stack spacing={2}>
                                {[
                                    { title: 'Refund for Order #QM-9921', date: 'Yesterday', amount: '+₹1,200', type: 'plus' },
                                    { title: 'Payment for Order #RT-1122', date: '3 days ago', amount: '-₹4,840', type: 'minus' }
                                ].map((tx, idx) => (
                                    <Paper key={idx} elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{tx.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{tx.date}</Typography>
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 900, color: tx.type === 'plus' ? '#22c55e' : 'black' }}>{tx.amount}</Typography>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </Paper>
                    )}
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

            {/* Edit Profile Dialog - all data editable except ID */}
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 900 }}>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {userData.uniqueId && (
                            <TextField
                                label="User ID"
                                fullWidth
                                value={userData.uniqueId}
                                variant="outlined"
                                disabled
                                helperText="ID cannot be changed"
                            />
                        )}
                        <TextField
                            label="Display Name"
                            fullWidth
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            label="Phone"
                            fullWidth
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
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
                    <Button onClick={handleEditSave} variant="contained" disabled={savingProfile} sx={{ bgcolor: 'black', color: 'white', fontWeight: 900 }}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Profile;