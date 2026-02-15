import { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Avatar, Paper, Chip, IconButton,
    Stack, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    CircularProgress
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import { CartService, WishlistService, OrderService, AuthService, UserService, WholesaleService, ResaleService, FreelanceService } from '../../services/api';
import { toast } from 'react-toastify';
import StoreIcon from '@mui/icons-material/Store';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

type ViewType = 'overview' | 'cart' | 'wishlist' | 'wallet' | 'orders' | 'analytics';
type ChannelKey = 'retail' | 'wholesale' | 'quick' | 'resale' | 'freelance' | null;

interface UserProfile {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    location?: string;
}

interface UserData {
    name: string;
    email: string;
    phone: string;
    role: string;
    lastLogin: string;
    avatar: string;
    uniqueId: string;
    profile?: UserProfile;
}

interface Product {
    _id: string;
    title: string;
    price: number;
    images?: string[];
    image?: string;
    type?: string;
    condition?: string;
    pricePerUnit?: number;
    stock?: number;
    minOrderQuantity?: number;
    description?: string;
    status?: string;
}

interface CartItem {
    _id: string;
    productId?: Product;
    product?: Product;
    quantity: number;
}

interface OrderItem {
    image?: string;
    title?: string;
    quantity?: number;
    price?: number;
}

interface Order {
    _id: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    orderItems: OrderItem[];
}

const Profile = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
        role: '',
        lastLogin: '',
        avatar: '',
        uniqueId: ''
    });

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentView, setCurrentView] = useState<ViewType>('overview');
    const [selectedChannel, setSelectedChannel] = useState<ChannelKey>(null);
    const [wholesaleProducts, setWholesaleProducts] = useState<Product[]>([]);
    const [resaleItems, setResaleItems] = useState<Product[]>([]);
    // Removed unused qCommerceProducts state since we use orders now
    const [freelancePosts, setFreelancePosts] = useState<Product[]>([]);
    const [channelLoading, setChannelLoading] = useState(false);
    const [stats, setStats] = useState({
        totalSpent: 0,
        pendingCount: 0,
        rewardPoints: 0
    });

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
            setUserData((prev: UserData) => ({ ...prev, ...updated }));
            localStorage.setItem('userName', editName);
            localStorage.setItem('userProfileImage', editAvatar);
            if (userData.uniqueId) {
                const { data } = await UserService.updateUserProfile({
                    username: editName,
                    email: editEmail,
                    profile: { ...userData.profile, avatar: editAvatar, phone: editPhone }
                });

                if (data) {
                    setUserData((prev: any) => ({
                        ...prev,
                        name: data.username || data.profile?.name || prev.name,
                        email: data.email || data.profile?.email || prev.email,
                        phone: data.profile?.phone || prev.phone,
                        avatar: data.profile?.avatar || prev.avatar,
                        profile: data.profile || prev.profile
                    }));
                    toast.success("Profile updated on database!");
                }
            }
        } finally {
            setSavingProfile(false);
            setIsEditOpen(false);
        }
    };

    useEffect(() => {
        const view = searchParams.get('view');
        if (view === 'cart' || view === 'wishlist' || view === 'wallet' || view === 'orders' || view === 'overview' || view === 'analytics') {
            setCurrentView(view as ViewType);
        }

        const channel = searchParams.get('channel');
        if (channel) {
            setSelectedChannel(channel as ChannelKey);
        } else {
            setSelectedChannel(null); // Clear channel if not present
        }
    }, [searchParams]);

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');
        if (savedName) setUserData((prev: UserData) => ({ ...prev, name: savedName }));
        if (savedAvatar) setUserData((prev: UserData) => ({ ...prev, avatar: savedAvatar }));

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
                    const { data } = await ResaleService.getMyProducts().catch(() => ({ data: [] }));
                    setResaleItems(Array.isArray(data) ? data : []);
                } else if (selectedChannel === 'freelance') {
                    const { data } = await FreelanceService.getMyPosts().catch(() => ({ data: [] }));
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
                setUserData((prev: UserData) => ({
                    ...prev,
                    name: d.username || d.profile?.name || prev.name,
                    email: d.email || d.profile?.email || prev.email,
                    phone: d.mobile || d.phone || d.profile?.phone || prev.phone,
                    role: d.role || prev.role,
                    uniqueId: d.uniqueId || d._id,
                    avatar: d.profile?.avatar || prev.avatar,
                    profile: d.profile || prev.profile
                }));
            }

            setCartItems(cartRes.data?.cartItems || []);
            setWishlistItems(wishlistRes.data?.products || []);

            if (ordersRes.data && ordersRes.data.length > 0) {
                // specific logic to sort by date if backend doesn't sorting
                const sortedOrders = ordersRes.data.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
            toast.success("Removed from wishlist");
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove");
        }
    };

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await CartService.removeFromCart(productId);
            setCartItems(prev => prev.filter(item => (item.productId?._id || item.product?._id) !== productId));
            toast.success("Removed from cart");
            fetchData();
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Failed to remove");
        }
    };

    const handleAddToCart = async (product: Product) => {
        try {
            // Map frontend types to backend CartService expectations
            const typeMapping: Record<string, string> = {
                'retail': 'Retail',
                'wholesale': 'Wholesale',
                'q-commerce': 'Quick',
                'resale': 'Resale'
            };
            const mappedType = typeMapping[product.type || ''] || 'Retail';

            await CartService.addToCart({
                productId: product._id,
                quantity: 1,
                type: mappedType
            });
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
            case 'Placed':
            case 'Payment Confirmed':
            case 'Processing':
                return 0;
            case 'Shipped': return 1;
            case 'Out for Delivery': return 2;
            case 'Delivered': return 3;
            default: return 0;
        }
    };


    useEffect(() => {
        if (orders.length >= 0) {
            const total = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
            const pending = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
            const points = Math.floor(total / 10); // Example: 1 point per 10 currency units

            setStats({
                totalSpent: total,
                pendingCount: pending,
                rewardPoints: points
            });
        }
    }, [orders]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#ffffff' }}>
            {/* Sidebar - Matches Screenshot */}
            <Box sx={{
                width: 250,
                bgcolor: '#ffffff',
                borderRight: '1px solid #f1f5f9',
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 1300,
                p: 3
            }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4, px: 1 }}>
                    <IconButton onClick={() => navigate('/retail')} sx={{ p: 1, bgcolor: '#e0f2f1', borderRadius: '50%', '&:hover': { bgcolor: '#b2dfdb' } }}>
                        <ArrowBackIcon sx={{ color: '#0f172a', fontSize: 20 }} />
                    </IconButton>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#000000', letterSpacing: -0.5 }}>AtoZ.in</Typography>
                </Stack>

                <Stack spacing={1} sx={{ mb: 'auto' }}>
                    {[
                        { name: 'Retail', channel: 'retail', icon: <StoreIcon fontSize="small" /> },
                        { name: 'Wholesale', channel: 'wholesale', icon: <WarehouseIcon fontSize="small" /> },
                        { name: 'Q-commerce', channel: 'quick', icon: <FlashOnIcon fontSize="small" /> },
                        { name: 'Resale', channel: 'resale', icon: <AutorenewIcon fontSize="small" /> },
                        { name: 'Freelancer', channel: 'freelance', icon: <WorkOutlineIcon fontSize="small" /> }
                    ].map((item) => (
                        <Button
                            key={item.channel}
                            onClick={() => {
                                setSelectedChannel(item.channel as ChannelKey);
                                navigate(`?view=overview&channel=${item.channel}`);
                            }}
                            startIcon={item.icon}
                            sx={{
                                justifyContent: 'flex-start',
                                px: 2,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 700,
                                color: selectedChannel === item.channel ? '#0f172a' : '#64748b',
                                bgcolor: selectedChannel === item.channel ? '#B4D5DC' : 'transparent',
                                '&:hover': { bgcolor: selectedChannel === item.channel ? '#a3cbd3' : '#f8fafc' }
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}
                </Stack>


                {/* User Mini Profile Footer */}
                <Box sx={{ pt: 3, borderTop: '1px solid #f1f5f9' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={userData.avatar} sx={{ width: 48, height: 48, bgcolor: '#0284c7', fontWeight: 900 }}>
                            {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                        </Avatar>
                        <Box sx={{ flex: 1, overflow: 'hidden' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#000000', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                {userData.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>{userData.role || 'Buyer'}</Typography>
                        </Box>
                        <IconButton size="small" onClick={handleLogout} sx={{ color: '#94a3b8' }}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flex: 1, ml: { xs: 0, md: '250px' }, p: { xs: 2, md: 5 } }}>
                <Container maxWidth="xl">
                    {/* Header - Clean Design */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mb: 5, gap: 4 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar src={userData.avatar} sx={{ width: 100, height: 100, border: '4px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                            <Box sx={{ position: 'absolute', bottom: 5, right: 5, bgcolor: '#64748b', borderRadius: '50%', p: 0.5, border: '2px solid white' }}>
                                <CheckCircleIcon sx={{ fontSize: 14, color: 'white' }} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>{userData.name}</Typography>
                            <Typography variant="body1" sx={{ color: '#64748b', mb: 2 }}>{userData.email}</Typography>
                            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Chip label={`${userData.role || 'MEMBER'} ACCOUNT`} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 700, borderRadius: 1, textTransform: 'uppercase' }} />
                                {userData.profile?.location && (
                                    <Chip label={userData.profile.location} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 700, borderRadius: 1, textTransform: 'uppercase' }} />
                                )}
                            </Stack>
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button
                                onClick={handleOpenEdit}
                                startIcon={<WorkOutlineIcon />} // Placeholder for Edit
                                variant="outlined"
                                sx={{ borderRadius: 5, textTransform: 'none', fontWeight: 700, px: 3, border: '1px solid #e2e8f0', color: '#0f172a' }}
                            >
                                Edit Profile
                            </Button>
                            <Button
                                startIcon={<AutorenewIcon />} // Placeholder for Settings
                                variant="contained"
                                sx={{ borderRadius: 5, textTransform: 'none', fontWeight: 700, px: 3, bgcolor: '#B4D5DC', color: '#0f172a', boxShadow: 'none' }}
                            >
                                Settings
                            </Button>
                        </Stack>
                    </Box>

                    {/* Navigation Tabs - Pill Shape */}
                    <Stack direction="row" spacing={1} sx={{ mb: 5, overflowX: 'auto', pb: 1 }}>
                        {[
                            { label: 'Overview', value: 'overview' },
                            { label: 'Wishlist', value: 'wishlist' },
                            { label: 'Add To Cart', value: 'cart' },
                            { label: 'Order List', value: 'orders' },
                            { label: 'Analytics', value: 'analytics' }
                        ].map((tab) => (
                            <Button
                                key={tab.value}
                                onClick={() => setCurrentView(tab.value as ViewType)}
                                sx={{
                                    borderRadius: 5,
                                    px: 4,
                                    py: 1,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    bgcolor: currentView === tab.value ? '#B4D5DC' : 'transparent',
                                    color: currentView === tab.value ? '#0f172a' : '#64748b',
                                    '&:hover': { bgcolor: currentView === tab.value ? '#a3cbd3' : '#f8fafc' }
                                }}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </Stack>

                    {currentView === 'overview' && (
                        <Box>
                            {!selectedChannel ? (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Welcome back, {userData.name}!</Typography>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
                                                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, mb: 1 }}>TOTAL SPENT</Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900 }}>₹{stats.totalSpent.toLocaleString()}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
                                                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, mb: 1 }}>PENDING ORDERS</Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900 }}>{stats.pendingCount}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
                                                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, mb: 1 }}>REWARD POINTS</Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900 }}>{stats.rewardPoints}</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Quick Links</Typography>
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 6, sm: 3 }}>
                                                <Button fullWidth onClick={() => setCurrentView('orders')} sx={{ py: 3, borderRadius: 4, bgcolor: '#f1f5f9', color: '#0f172a', fontWeight: 700, textTransform: 'none' }}>My Orders</Button>
                                            </Grid>
                                            <Grid size={{ xs: 6, sm: 3 }}>
                                                <Button fullWidth onClick={() => setCurrentView('cart')} sx={{ py: 3, borderRadius: 4, bgcolor: '#f1f5f9', color: '#0f172a', fontWeight: 700, textTransform: 'none' }}>My Cart</Button>
                                            </Grid>
                                            <Grid size={{ xs: 6, sm: 3 }}>
                                                <Button fullWidth onClick={() => setCurrentView('wishlist')} sx={{ py: 3, borderRadius: 4, bgcolor: '#f1f5f9', color: '#0f172a', fontWeight: 700, textTransform: 'none' }}>Wishlist</Button>
                                            </Grid>
                                            <Grid size={{ xs: 6, sm: 3 }}>
                                                <Button fullWidth onClick={() => navigate('/retail')} sx={{ py: 3, borderRadius: 4, bgcolor: '#f1f5f9', color: '#0f172a', fontWeight: 700, textTransform: 'none' }}>Marketplace</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ mt: 6 }}>
                                    {/* Channel Specific Activity Selection */}
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                        <Box sx={{ width: 4, height: 24, bgcolor: '#B4D5DC', borderRadius: 2 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>MY {selectedChannel.toUpperCase()} ACTIVITY</Typography>
                                    </Stack>

                                    {channelLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                                            <CircularProgress sx={{ color: '#B4D5DC' }} />
                                        </Box>
                                    ) : (
                                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: '#f8fafc' }}>
                                            {selectedChannel === 'freelance' && (
                                                <Grid container spacing={3}>
                                                    {freelancePosts.map((post: Product) => (
                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
                                                            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                                                <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
                                                                    <Chip
                                                                        label={post.status}
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: post.status === 'APPROVED' ? '#bef264' : '#f1f5f9',
                                                                            color: post.status === 'APPROVED' ? '#1a2e05' : '#64748b',
                                                                            fontWeight: 800,
                                                                            fontSize: '0.65rem'
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <Box sx={{ height: 160, borderRadius: 3, overflow: 'hidden', mb: 2 }}>
                                                                    <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                </Box>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>{post.title}</Typography>
                                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2, height: 40, overflow: 'hidden' }}>{post.description}</Typography>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>₹{post.price}</Typography>
                                                                    <Button size="small" sx={{ fontWeight: 800, color: '#0f172a' }}>Edit Post</Button>
                                                                </Box>
                                                            </Paper>
                                                        </Grid>
                                                    ))}
                                                    {freelancePosts.length === 0 && (
                                                        <Box sx={{ textAlign: 'center', width: '100%', py: 4, flex: 1 }}>
                                                            <Typography sx={{ color: '#94a3b8', fontWeight: 600 }}>No freelance posts found.</Typography>
                                                        </Box>
                                                    )}
                                                </Grid>
                                            )}

                                            {selectedChannel === 'wholesale' && (
                                                <Grid container spacing={3}>
                                                    {wholesaleProducts.map((product: Product) => (
                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                                                            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0', height: '100%' }}>
                                                                <Box sx={{ height: 160, borderRadius: 3, overflow: 'hidden', mb: 2 }}>
                                                                    <img src={product.images?.[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                </Box>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>{product.title}</Typography>
                                                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>₹{product.pricePerUnit} / Unit</Typography>
                                                                <Stack spacing={1}>
                                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Stock: {product.stock} units</Typography>
                                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Min Order: {product.minOrderQuantity}</Typography>
                                                                </Stack>
                                                            </Paper>
                                                        </Grid>
                                                    ))}
                                                    {wholesaleProducts.length === 0 && (
                                                        <Box sx={{ textAlign: 'center', width: '100%', py: 4, flex: 1 }}>
                                                            <Typography sx={{ color: '#94a3b8', fontWeight: 600 }}>No wholesale products found.</Typography>
                                                        </Box>
                                                    )}
                                                </Grid>
                                            )}

                                            {selectedChannel === 'resale' && (
                                                <Grid container spacing={3}>
                                                    {resaleItems.map((item: Product) => (
                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item._id}>
                                                            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0', height: '100%' }}>
                                                                <Box sx={{ height: 160, borderRadius: 3, overflow: 'hidden', mb: 2 }}>
                                                                    <img src={item.images?.[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                </Box>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>{item.title}</Typography>
                                                                <Typography variant="h6" sx={{ fontWeight: 900 }}>₹{item.price}</Typography>
                                                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>CONDITION: {item.condition}</Typography>
                                                            </Paper>
                                                        </Grid>
                                                    ))}
                                                    {resaleItems.length === 0 && (
                                                        <Box sx={{ textAlign: 'center', width: '100%', py: 4, flex: 1 }}>
                                                            <Typography sx={{ color: '#94a3b8', fontWeight: 600 }}>No resale listings found.</Typography>
                                                        </Box>
                                                    )}
                                                </Grid>
                                            )}
                                        </Paper>
                                    )}
                                </Box>
                            )}
                        </Box>
                    )}



                    {currentView === 'cart' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Your Shopping Cart ({cartItems.length})</Typography>
                            {cartItems.length > 0 ? (
                                <Stack spacing={3}>
                                    {cartItems.map((item: CartItem) => (
                                        <Paper key={item._id} elevation={0} sx={{ p: 3, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                            <Stack direction="row" spacing={3} alignItems="center">
                                                <Box sx={{ width: 100, height: 100, borderRadius: 4, overflow: 'hidden', bgcolor: 'white' }}>
                                                    <img src={item.productId?.images?.[0] || item.product?.images?.[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.productId?.title || item.product?.title}</Typography>
                                                    <Typography variant="body2" sx={{ color: '#64748b' }}>Quantity: {item.quantity}</Typography>
                                                </Box>
                                                <Stack alignItems="flex-end" spacing={1}>
                                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>₹{item.productId?.price || item.product?.price}</Typography>
                                                    <IconButton
                                                        onClick={() => handleRemoveFromCart(item.productId?._id || item.product?._id || '')}
                                                        size="small"
                                                        sx={{ color: '#ef4444', bgcolor: '#fee2e2', borderRadius: 2, '&:hover': { bgcolor: '#fecaca' } }}
                                                    >
                                                        <DeleteOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
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
                                    {wishlistItems.map((product: Product) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
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

                    {currentView === 'orders' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Your Orders ({orders.length})</Typography>

                            {orders.length > 0 ? (
                                <Stack spacing={4}>
                                    {orders.map((order: Order) => (
                                        <Box key={order._id} sx={{ p: 0, overflow: 'hidden' }}>
                                            <Stack direction="row" spacing={3} alignItems="flex-start">
                                                <Box sx={{ width: 140, height: 140, bgcolor: '#f8fafc', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                                    {order.orderItems?.[0]?.image ? (
                                                        <img src={order.orderItems[0].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <LocalMallOutlinedIcon sx={{ fontSize: 40, opacity: 0.1 }} />
                                                    )}
                                                </Box>

                                                <Box sx={{ flex: 1 }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                        <Box>
                                                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                                                                {order.orderItems?.[0]?.title || 'Order #' + order._id?.substring(0, 8).toUpperCase()}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                                                {order.orderItems?.length > 1 ? `+${order.orderItems.length - 1} more items` : `Qty ${order.orderItems?.[0]?.quantity || '1'}`} • Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                            </Typography>
                                                        </Box>
                                                        <Stack alignItems="flex-end">
                                                            <Chip label={order.status.toUpperCase()} size="small" sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, mb: 1, height: 22, fontSize: '0.6rem' }} />
                                                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                                                ₹{(order.totalPrice || 0).toLocaleString('en-IN')}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>

                                                    {/* Horizontal Progress Tracker */}
                                                    <Box sx={{ mt: 4, mb: 4 }}>
                                                        <Box sx={{ position: 'relative', height: 4, bgcolor: '#f1f5f9', borderRadius: 2 }}>
                                                            <Box sx={{ position: 'absolute', height: '100%', bgcolor: '#B4D5DC', borderRadius: 2, width: `${(getStatusIndex(order.status) / 3) * 100}%` }} />
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', top: -4 }}>
                                                                {['ORDERED', 'SHIPPED', 'INTRANSIT', 'DELIVERED'].map((stage, i) => {
                                                                    const isActive = i <= getStatusIndex(order.status);
                                                                    return (
                                                                        <Box key={stage} sx={{ textAlign: 'center' }}>
                                                                            <Box sx={{ width: 12, height: 12, bgcolor: isActive ? '#B4D5DC' : '#f1f5f9', borderRadius: '50%', border: '2px solid white', mx: 'auto', mb: 1 }} />
                                                                            <Typography variant="caption" sx={{ fontSize: '0.55rem', fontWeight: 800, color: isActive ? '#0f172a' : '#94a3b8' }}>
                                                                                {stage}
                                                                            </Typography>
                                                                        </Box>
                                                                    );
                                                                })}
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                    <Stack direction="row" spacing={2}>
                                                        <Button variant="contained" sx={{ bgcolor: '#B4D5DC', color: 'black', fontWeight: 800, borderRadius: 3, textTransform: 'none', px: 3, py: 1, '&:hover': { bgcolor: '#a3c4cb' } }}>
                                                            TRACK PACKAGE
                                                        </Button>
                                                        <Button variant="outlined" sx={{ borderColor: '#e2e8f0', color: '#0f172a', fontWeight: 800, borderRadius: 3, textTransform: 'none', px: 3 }}>
                                                            VIEW INVOICE
                                                        </Button>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                            <Box sx={{ height: 1, bgcolor: '#f1f5f9', mt: 4 }} />
                                        </Box>
                                    ))}
                                </Stack>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 10 }}>
                                    <LocalMallOutlinedIcon sx={{ fontSize: 80, color: '#e2e8f0', mb: 3 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#94a3b8' }}>No orders yet</Typography>
                                    <Button sx={{ mt: 3, color: 'black', fontWeight: 900 }} onClick={() => navigate('/retail')}>Start Shopping</Button>
                                </Box>
                            )}
                        </Paper>
                    )}

                    {currentView === 'analytics' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Account Analytics</Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                        <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, mb: 1 }}>TOTAL SPENT</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 900 }}>₹{stats.totalSpent.toLocaleString()}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                        <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, mb: 1 }}>PENDING ORDERS</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 900 }}>{stats.pendingCount}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                        <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, mb: 1 }}>REWARD POINTS</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 900 }}>{stats.rewardPoints}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}

                    {currentView === 'wallet' && (
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 10, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>My Wallet</Typography>
                            <Box sx={{ textAlign: 'center', py: 10 }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#94a3b8' }}>Wallet feature coming soon</Typography>
                            </Box>
                        </Paper>
                    )}
                </Container>
            </Box >



            {/* Edit Profile Dialog - all data editable except ID */}
            < Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="sm" fullWidth >
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
            </Dialog >
        </Box >
    );
};

export default Profile;