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
import DiamondIcon from '@mui/icons-material/Diamond';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

<<<<<<< HEAD
import { CartService, WishlistService, OrderService } from '../../services/api';
=======

import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, CircularProgress, Snackbar, Alert
} from '@mui/material';

import { CartService, WishlistService, AuthService, UserService, OrderService } from '../../services/api';
import SegmentedNav from '../WrapperComponents/SegmentedNav';
>>>>>>> 54040806 (Profile)

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: 'Dinesh Kumar M',
        role: 'Verified Member',
        lastLogin: '2 hours ago',
        avatar: '',
        totalInvestment: '₹24,840',
        memberPercentile: 'TOP 2% OF ELITE MEMBERS',
        email: 'dinesh@atoz.in',
        mobile: '+91 98765 43210',
        joinedDate: 'Jan 2024'
    });

<<<<<<< HEAD
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
        setUserData(prev => ({ ...prev, name: editName, avatar: editAvatar }));
        localStorage.setItem('userName', editName);
        localStorage.setItem('userProfileImage', editAvatar);
        setIsEditOpen(false);
    };
=======
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({ name: '', email: '', mobile: '' });
    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
    const [openTerms, setOpenTerms] = useState(false);

    const [addresses] = useState([
        { id: 1, type: 'Home', address: '123 Tech Park, Silicon Valley, CA 94043', isDefault: true },
        { id: 2, type: 'Office', address: 'AtoZ HQ, 45 Future St, Bangalore, KA 560001', isDefault: false }
    ]);

    const [activeOrders, setActiveOrders] = useState<any[]>([]);
>>>>>>> 54040806 (Profile)

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) setUserData(prev => ({ ...prev, name: savedName }));

        fetchData();
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await AuthService.getMe();
            const user = response.data;
            setUserData(prev => ({
                ...prev,
                name: user.username || prev.name,
                email: user.email || prev.email,
                mobile: user.mobile || prev.mobile,
                role: user.role || prev.role,
                joinedDate: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            }));
            setEditData({
                name: user.username || '',
                email: user.email || '',
                mobile: user.mobile || ''
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchData = async () => {
        try {
            const [cartRes, wishlistRes, ordersRes] = await Promise.all([
                CartService.getCart().catch(() => ({ data: { cartItems: [] } })),
                WishlistService.getWishlist().catch(() => ({ data: { products: [] } })),
                OrderService.getMyOrders().catch(() => ({ data: [] }))
            ]);

            setCartCount(cartRes.data?.cartItems?.length || 0);
            setWishlistCount(wishlistRes.data?.products?.length || 0);

<<<<<<< HEAD
            if (ordersRes.data && ordersRes.data.length > 0) {
                // specific logic to sort by date if backend doesn't sorting
                const sortedOrders = ordersRes.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setOrders(sortedOrders);
=======
            // Map orders
            if (ordersRes.data) {
                setActiveOrders(ordersRes.data.map((o: any) => ({
                    id: o._id,
                    item: o.orderItems?.[0]?.title || 'Multiple Items',
                    status: o.status ? o.status.toUpperCase() : 'PROCESSING',
                    eta: o.isDelivered ? 'Delivered' : 'Arriving Soon',
                    payment: `${o.paymentMethod}${o.isPaid ? ' (Paid)' : ' (Pending)'}`,
                    amount: `₹${o.totalPrice}`,
                    type: o.orderType || 'Retail'
                })));
>>>>>>> 54040806 (Profile)
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
                </Stack>

                <IconButton sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1 } }} onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Paper>

            {/* Main Content Area */}
            <Box sx={{ flex: 1, ml: { xs: 0, md: '80px', lg: '100px' }, display: 'flex', flexDirection: 'column' }}>
                <SegmentedNav />
                <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
                    {/* Header Banner */}
                    <Box
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: { xs: 6, md: 8 },
                            bgcolor: '#f0f9fa',
                            mb: { xs: 3, md: 4 },
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            textAlign: { xs: 'center', md: 'left' },
                            gap: 3
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={userData.avatar}
                                sx={{
                                    width: { xs: 80, md: 110 },
                                    height: { xs: 80, md: 110 },
                                    border: '3px solid white',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
                                    bgcolor: '#f1f5f9'
                                }}
                            />
                            <Chip
                                label="ELITE"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    bottom: 5,
                                    right: 5,
                                    bgcolor: 'black',
                                    color: 'white',
                                    fontWeight: 900,
                                    fontSize: '0.55rem',
                                    height: 18
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.5, letterSpacing: -1, fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
                                {userData.name}
                            </Typography>
                            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <CheckCircleIcon sx={{ color: 'black', fontSize: 14 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b' }}>
                                        {userData.role}
                                    </Typography>
                                </Stack>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                    Last login: {userData.lastLogin}
                                </Typography>
                            </Stack>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            <Button
                                onClick={handleOpenEdit}
                                variant="contained"
                                fullWidth={true}
                                onClick={() => setIsEditModalOpen(true)}
                                sx={{
                                    bgcolor: 'black',
                                    color: 'white',
                                    fontWeight: 900,
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1,
                                    fontSize: '0.75rem',
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#333' }
                                }}
                            >
                                EDIT PROFILE
                            </Button>
                            <IconButton sx={{ border: '2px solid #e2e8f0', borderRadius: 3, p: 1, display: { xs: 'none', sm: 'flex' } }}>
                                <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* Dashboard Grid */}
                    <Grid container spacing={3}>
                        {/* Recent Order Tracker */}
<<<<<<< HEAD
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
=======
                        {activeOrders.map((order) => (
                            <Grid size={{ xs: 12 }} key={order.id}>
                                <Paper elevation={0} sx={{ p: 3.5, borderRadius: 8, border: '1px solid #f1f5f9' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.2 }}>MY ORDERS</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Order ID: {order.id} • {order.type}</Typography>
                                        </Box>
                                        <Chip label={order.status} size="small" sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, px: 1, fontSize: '0.6rem' }} />
                                    </Box>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 3 }}>
                                        <Box sx={{ width: { xs: '100%', sm: 110 }, height: 110, bgcolor: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <LocalMallOutlinedIcon sx={{ fontSize: 30, opacity: 0.1 }} />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5, fontSize: { xs: '1rem', md: '1.2rem' } }}>{order.item}</Typography>
                                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <AccessTimeIcon sx={{ fontSize: 14, color: '#B4D5DC' }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>ETA: {order.eta}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CheckCircleIcon sx={{ fontSize: 14, color: '#4caf50' }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>{order.payment}</Typography>
                                                </Box>
                                            </Stack>

                                            {/* Progress Bar Staged */}
                                            <Box sx={{ px: { xs: 0, sm: 1 } }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, position: 'relative' }}>
                                                    <Box sx={{ position: 'absolute', top: 10, left: 10, right: 10, height: 1.5, bgcolor: '#f1f5f9', zIndex: 0 }} />
                                                    <Box sx={{ position: 'absolute', top: 10, left: 10, width: '75%', height: 1.5, bgcolor: '#B4D5DC', zIndex: 1 }} />
                                                    {['PLACED', 'SHIPPED', 'TRACKING', 'DELIVERED'].map((stage, i) => (
                                                        <Box key={stage} sx={{ textAlign: 'center', zIndex: 2 }}>
                                                            <Box
                                                                sx={{
                                                                    width: 10, height: 10, borderRadius: '50%',
                                                                    bgcolor: i <= 2 ? '#B4D5DC' : '#f1f5f9',
                                                                    mx: 'auto', mb: 0.5,
                                                                    border: '2px solid white',
                                                                    boxShadow: i <= 2 ? '0 0 0 2px #B4D5DC' : 'none'
                                                                }}
                                                            />
                                                            <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.45rem', color: i <= 2 ? 'black' : '#94a3b8', letterSpacing: 0.2 }}>
                                                                {stage}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 900, textAlign: { xs: 'left', sm: 'right' } }}>{order.amount}</Typography>
                                    </Stack>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <Button variant="contained" sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, borderRadius: 3, px: 3, py: 1, fontSize: '0.75rem', '&:hover': { bgcolor: '#333' } }}>
                                            TRACK LIVE
                                        </Button>
                                        <Button variant="outlined" sx={{ color: '#0f172a', border: '2px solid #f1f5f9', fontWeight: 900, borderRadius: 3, px: 3, py: 1, fontSize: '0.75rem', '&:hover': { border: '2px solid #e2e8f0' } }}>
                                            VIEW INVOICE
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
>>>>>>> 54040806 (Profile)

                        {/* Annual Portfolio */}
                        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 8, border: '1px solid #f1f5f9', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1.5 }}>ANNUAL PORTFOLIO</Typography>
                                    <TrendingUpIcon sx={{ color: '#B4D5DC', fontSize: 20 }} />
                                </Box>

                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, mb: 0.2 }}>Total Investment</Typography>
                                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#B4D5DC', letterSpacing: -1, mb: 0.5, fontSize: { xs: '2.5rem', md: '3.8rem' } }}>
                                        {userData.totalInvestment}
                                    </Typography>
                                </Box>

                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 0.5, fontSize: '0.6rem' }}>
                                    {userData.memberPercentile}
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Summary Cards */}
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ height: '100%' }}>
                                <Paper elevation={0} sx={{ p: 2, flex: 1, borderRadius: 6, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 1.5, fontSize: '0.6rem' }}>ADDRESSES</Typography>
                                    <Box sx={{ width: 28, height: 28, bgcolor: 'black', borderRadius: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <LocationOnOutlinedIcon sx={{ color: 'white', fontSize: 14 }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.2 }}>02</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 1.5, fontSize: '0.55rem' }}>SAVED PLACES</Typography>
                                    <Button sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.6rem' }}>MANAGE</Button>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 2, flex: 1, borderRadius: 6, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 1.5, fontSize: '0.6rem' }}>FREELANCE</Typography>
                                    <Box sx={{ width: 28, height: 28, bgcolor: '#f8fafc', borderRadius: '50%', mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <WorkOutlineOutlinedIcon sx={{ color: '#B4D5DC', fontSize: 16 }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.2 }}>01</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 1.5, fontSize: '0.55rem' }}>ACTIVE WIP</Typography>
                                    <Button sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.6rem' }}>TRACK</Button>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 2, flex: 1, borderRadius: 6, border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#94a3b8', letterSpacing: 1, mb: 1.5, fontSize: '0.6rem' }}>WISHLIST</Typography>
                                    <Box sx={{ width: 28, height: 28, bgcolor: '#f8fafc', borderRadius: '50%', mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FavoriteBorderOutlinedIcon sx={{ color: '#B4D5DC', fontSize: 16 }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.2 }}>{wishlistCount}</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', mb: 1.5, fontSize: '0.55rem' }}>SAVED ITEMS</Typography>
                                    <Button sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.6rem' }}>VIEW ALL</Button>
                                </Paper>
                            </Stack>
                        </Grid>

                        {/* Login Details Card */}
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid #f1f5f9', height: '100%', bgcolor: 'rgba(180, 213, 220, 0.05)' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 900, letterSpacing: 0.5 }}>ACCOUNT DETAILS</Typography>
                                    <IconButton size="small" onClick={() => setIsEditModalOpen(true)}>
                                        <EditOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                    </IconButton>
                                </Box>

                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                                            <MailOutlineIcon sx={{ fontSize: 16, color: '#B4D5DC' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', fontWeight: 700, fontSize: '0.55rem' }}>EMAIL ADDRESS</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a' }}>{userData.email}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                                            <PhoneOutlinedIcon sx={{ fontSize: 16, color: '#B4D5DC' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', fontWeight: 700, fontSize: '0.55rem' }}>MOBILE NUMBER</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a' }}>{userData.mobile}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                                            <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: '#B4D5DC' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', fontWeight: 700, fontSize: '0.55rem' }}>MEMBER SINCE</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#0f172a' }}>{userData.joinedDate}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                {/* Additional Settings & Help Section */}
                <Container maxWidth="xl" sx={{ pb: 6 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 2.5 }}>SAVED ADDRESSES</Typography>
                                <Stack spacing={2}>
                                    {addresses.map((addr) => (
                                        <Box key={addr.id} sx={{ p: 1.5, borderRadius: 3, bgcolor: '#f8fafc', display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                            <LocationOnOutlinedIcon sx={{ mt: 0.2, fontSize: 18, color: '#B4D5DC' }} />
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 900 }}>{addr.type}</Typography>
                                                    {addr.isDefault && <Chip label="DEFAULT" size="small" sx={{ height: 16, fontSize: '0.5rem', fontWeight: 900, bgcolor: 'black', color: 'white' }} />}
                                                </Box>
                                                <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontSize: '0.65rem', lineHeight: 1.3 }}>{addr.address}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                    <Button fullWidth sx={{ color: 'black', fontWeight: 900, fontSize: '0.7rem', py: 1 }}>+ ADD NEW ADDRESS</Button>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 2.5 }}>HELP & SUPPORT</Typography>
                                <Stack spacing={1.5}>
                                    {[
                                        { icon: <HelpOutlineOutlinedIcon fontSize="small" />, label: 'Customer Support Tickets', action: () => { } },
                                        { icon: <DescriptionOutlinedIcon fontSize="small" />, label: 'Terms & Conditions', action: () => setOpenTerms(true) },
                                        { icon: <ReceiptLongIcon fontSize="small" />, label: 'Payment & Refund Policies', action: () => { } }
                                    ].map((item) => (
                                        <Box key={item.label} onClick={item.action} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderRadius: 3, cursor: 'pointer', '&:hover': { bgcolor: '#f8fafc' } }}>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Box sx={{ color: '#B4D5DC' }}>{item.icon}</Box>
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>{item.label}</Typography>
                                            </Stack>
                                            <Typography variant="caption" sx={{ fontWeight: 900, color: '#B4D5DC' }}>→</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'rgba(0,0,0,0.02)' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 2.5 }}>PAYMENT HISTORY</Typography>
                                <Box sx={{ textAlign: 'center', py: 2 }}>
                                    <PaymentOutlinedIcon sx={{ fontSize: 40, color: '#e2e8f0', mb: 1.5 }} />
                                    <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', fontWeight: 600 }}>No recent transactions found.</Typography>
                                    <Button sx={{ mt: 2, bgcolor: 'black', color: 'white', px: 3, py: 1, borderRadius: '100px', fontSize: '0.65rem', fontWeight: 900, '&:hover': { bgcolor: '#333' } }}>
                                        EXPLORE OFFERS
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Edit Profile Modal */}
            <Dialog
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                PaperProps={{ sx: { borderRadius: 6, p: 1, width: '100%', maxWidth: 450 } }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900 }}>
                    Edit Profile
                    <IconButton size="small" onClick={() => setIsEditModalOpen(false)}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="User Name"
                            variant="outlined"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            InputProps={{ sx: { borderRadius: 3 } }}
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            InputProps={{ sx: { borderRadius: 3 } }}
                        />
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            variant="outlined"
                            value={editData.mobile}
                            onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                            InputProps={{ sx: { borderRadius: 3 } }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            try {
                                await UserService.updateUserProfile(localStorage.getItem('userId') || '', {
                                    username: editData.name,
                                    email: editData.email,
                                    mobile: editData.mobile
                                });
                                localStorage.setItem('userName', editData.name);
                                setUserData(prev => ({ ...prev, ...editData }));
                                setNotification({ open: true, message: 'Profile updated successfully!', severity: 'success' });
                                setIsEditModalOpen(false);
                            } catch (err) {
                                setNotification({ open: true, message: 'Failed to update profile', severity: 'error' });
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, borderRadius: 3, py: 1.5, '&:hover': { bgcolor: '#333' } }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'SAVE CHANGES'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Terms Modal */}
            <Dialog open={openTerms} onClose={() => setOpenTerms(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 6, p: 2 } }}>
                <DialogTitle sx={{ fontWeight: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Terms & Conditions
                    <IconButton onClick={() => setOpenTerms(false)}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>📜 For Users</Typography>
                            <ul style={{ paddingLeft: 20, margin: 0 }}>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Platform acts as a marketplace</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Customized products are non‑refundable</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Resale payments are user‑to‑user</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Refund only for damaged products (with proof)</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Misuse leads to account suspension</Typography></li>
                            </ul>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>📜 For Sellers</Typography>
                            <ul style={{ paddingLeft: 20, margin: 0 }}>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Must provide accurate product info</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Fake listings lead to removal</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Late delivery affects rating</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Payments released after order completion</Typography></li>
                                <li><Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Admin has final approval rights</Typography></li>
                            </ul>
                        </Box>
                    </Stack>
                </DialogContent>
            </Dialog>

            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={() => setNotification({ ...notification, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={notification.severity} sx={{ borderRadius: 3, fontWeight: 700 }}>
                    {notification.message}
                </Alert>
            </Snackbar>

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
<<<<<<< HEAD

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
=======
        </Box >
>>>>>>> 54040806 (Profile)
    );
};

export default Profile;
