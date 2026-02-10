import { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Paper, Chip, IconButton, CircularProgress, Stack, Divider, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

import Navbar from '../WrapperComponents/Navbar';
import { CartService, WishlistService, OrderService } from '../../services/api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Retail');
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState('User');
    const [name, setName] = useState('User');
    const [avatar, setAvatar] = useState('');

    // State for live data
    const [cart, setCart] = useState<any>(null);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const savedRole = localStorage.getItem('userRole');
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');

        if (savedRole) setRole(savedRole);
        if (savedName) setName(savedName);
        if (savedAvatar) setAvatar(savedAvatar);

        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            const [cartRes, wishlistRes, ordersRes] = await Promise.all([
                CartService.getCart().catch(() => ({ data: null })),
                WishlistService.getWishlist().catch(() => ({ data: [] })),
                OrderService.getMyOrders().catch(() => ({ data: [] }))
            ]);
            setCart(cartRes.data);
            setWishlist(wishlistRes.data?.products || []);
            setOrders(ordersRes.data || []);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            // Set default values on error
            setCart(null);
            setWishlist([]);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };


    const handleRemoveFromCart = async (productId: string) => {
        try {
            await CartService.removeFromCart(productId);
            fetchProfileData();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleRemoveFromWishlist = async (wishlistId: string) => {
        try {
            await WishlistService.removeFromWishlist(wishlistId);
            fetchProfileData();
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const tabs = ['Retail', 'Wholesale', 'Q-Commerce', 'Resale', 'Freelance'];

    const renderRetailOrders = () => {
        const getStatusColor = (status: string) => {
            switch (status) {
                case 'Delivered': return { bg: '#dcfce7', text: '#166534' };
                case 'Shipped': return { bg: '#dbeafe', text: '#1e40af' };
                case 'Out for Delivery': return { bg: '#f3e8ff', text: '#6b21a8' };
                case 'Ordered': return { bg: '#fef3c7', text: '#b45309' };
                default: return { bg: '#f1f5f9', text: '#475569' };
            }
        };

        return (
            <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>
                    Retail Order History & Tracking
                </Typography>
                {orders.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                        <Typography sx={{ color: '#94a3b8' }}>No orders found yet.</Typography>
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {orders.map((order: any) => {
                            if (!order) return null;
                            return (
                                <Paper key={order._id} elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Order ID: {order._id.slice(-8).toUpperCase()}</Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Chip
                                                label={order.status || (order.isDelivered ? 'Delivered' : 'Ordered')}
                                                size="small"
                                                sx={{
                                                    bgcolor: getStatusColor(order.status || (order.isDelivered ? 'Delivered' : 'Ordered')).bg,
                                                    color: getStatusColor(order.status || (order.isDelivered ? 'Delivered' : 'Ordered')).text,
                                                    fontWeight: 800
                                                }}
                                            />
                                            <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#64748b' }}>
                                                {order.isPaid ? 'Paid' : 'Payment Pending'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Tracking Stepper (Simplified) */}
                                    <Box sx={{ mb: 3, mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 3 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <InfoOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>Tracking Status:</Typography>
                                        </Stack>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, position: 'relative' }}>
                                            {['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'].map((s, idx) => {
                                                const statusesList = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];
                                                const currentIdx = statusesList.indexOf(order.status || 'Ordered');
                                                const isActive = idx <= currentIdx;
                                                return (
                                                    <Box key={s} sx={{ textAlign: 'center', flex: 1, zIndex: 1 }}>
                                                        <Box sx={{
                                                            width: 12, height: 12, borderRadius: '50%', mx: 'auto', mb: 1,
                                                            bgcolor: isActive ? '#000' : '#e2e8f0'
                                                        }} />
                                                        <Typography variant="caption" sx={{
                                                            fontSize: '0.65rem', fontWeight: isActive ? 800 : 500,
                                                            color: isActive ? '#000' : '#94a3b8'
                                                        }}>
                                                            {s}
                                                        </Typography>
                                                    </Box>
                                                )
                                            })}
                                            {/* Progress Line */}
                                            <Box sx={{
                                                position: 'absolute', top: 5, left: '12.5%', right: '12.5%', height: 2, bgcolor: '#e2e8f0', zIndex: 0
                                            }}>
                                                <Box sx={{
                                                    height: '100%', bgcolor: '#000',
                                                    width: `${(['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(order.status || 'Ordered') / 3) * 100}%`,
                                                    transition: 'width 0.5s ease'
                                                }} />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Stack spacing={1}>
                                        {order.orderItems?.map((item: any, i: number) => (
                                            <Typography key={i} variant="body2" sx={{ color: '#334155' }}>
                                                • {item?.title || item?.name} x {item?.quantity}
                                            </Typography>
                                        ))}
                                    </Stack>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900 }}>Total: ₹{order.totalPrice.toLocaleString()}</Typography>
                                        <Button variant="text" size="small" onClick={() => navigate(`/checkout`)}>Need Help?</Button>
                                    </Box>
                                </Paper>
                            );
                        })}
                    </Stack>
                )}
            </Box>
        );
    };

    const renderWholesaleSection = () => (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Wholesale Orders</Typography>
                <Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>Request Quiz</Button>
            </Stack>

            {/* Mock Wholesale Data for now - eventually filter from orders or separate API */}
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, mb: 4 }}>
                <Typography sx={{ color: '#94a3b8', mb: 2 }}>No active wholesale bulk orders.</Typography>
                <Button variant="contained" onClick={() => navigate('/wholesale')} sx={{ bgcolor: '#2563eb', textTransform: 'none' }}>
                    Browse Wholesale Catalog
                </Button>
            </Paper>

            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Quote Requests</Typography>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                <Typography sx={{ color: '#94a3b8' }}>You haven't requested any quotes yet.</Typography>
            </Paper>
        </Box>
    );

    const renderQCommerceSection = () => (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Quick Commerce Orders (10-30 min delivery)</Typography>
            {/* eventually filter orders by type='q-commerce' */}
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                <Typography sx={{ color: '#94a3b8', mb: 2 }}>No recent quick orders.</Typography>
                <Button variant="contained" onClick={() => navigate('/quick')} sx={{ bgcolor: '#fb923c', textTransform: 'none' }}>
                    Order Essentials Now
                </Button>
            </Paper>
        </Box>
    );

    const renderResaleSection = () => (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>My Resale Listings</Typography>
                <Button variant="contained" onClick={() => navigate('/resale')} sx={{ bgcolor: '#bef264', color: 'black', textTransform: 'none', fontWeight: 700 }}>
                    Sell an Item
                </Button>
            </Stack>

            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, mb: 6 }}>
                <Typography sx={{ color: '#94a3b8' }}>You haven't listed any items for resale yet.</Typography>
            </Paper>

            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Resale Purchases</Typography>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                <Typography sx={{ color: '#94a3b8' }}>No resale items purchased recently.</Typography>
            </Paper>
        </Box>
    );

    const renderFreelanceSection = () => (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>My Freelance Projects</Typography>
                <Button variant="contained" onClick={() => navigate('/freelance')} sx={{ bgcolor: '#8b5cf6', textTransform: 'none' }}>
                    Post a Request
                </Button>
            </Stack>

            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                <Typography sx={{ color: '#94a3b8', mb: 2 }}>No active projects or hiring requests.</Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>Need work done? Post a request to find top talent.</Typography>
            </Paper>
        </Box>
    );

    const renderCartAndWishlist = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
                {/* Cart Section */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Shopping Cart ({cart?.cartItems?.length || 0})</Typography>
                    {cart?.cartItems?.length > 0 ? (
                        <Stack spacing={2}>
                            {cart.cartItems.map((item: any) => {
                                if (!item || !item.product) return null;
                                return (
                                    <Paper key={item.product._id} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar src={item.product?.images?.[0]} variant="rounded" sx={{ width: 60, height: 60 }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.product?.title}</Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b' }}>Qty: {item.quantity} • ₹{item.price}</Typography>
                                        </Box>
                                        <IconButton color="error" onClick={() => handleRemoveFromCart(item.product._id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Paper>
                                );
                            })}
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('/checkout')}
                                sx={{ bgcolor: '#bef264', color: 'black', borderRadius: 3, py: 1.5, fontWeight: 800, mt: 2 }}
                            >
                                Proceed to Checkout
                            </Button>
                        </Stack>
                    ) : (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                            <Typography sx={{ color: '#94a3b8' }}>Your cart is empty.</Typography>
                        </Box>
                    )}
                </Box>

                {/* Wishlist Section */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Wishlist ({wishlist?.length || 0})</Typography>
                    {wishlist && wishlist.length > 0 ? (
                        <Stack spacing={2}>
                            {wishlist.map((item: any) => {
                                if (!item) return null;
                                return (
                                    <Paper key={item._id} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar src={item.images?.[0]} variant="rounded" sx={{ width: 60, height: 60 }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b' }}>₹{item.price ? item.price.toLocaleString() : 'N/A'}</Typography>
                                        </Box>
                                        <IconButton size="small" onClick={() => handleRemoveFromWishlist(item._id)}>
                                            <DeleteIcon fontSize="small" color="error" />
                                        </IconButton>
                                    </Paper>
                                );
                            })}
                        </Stack>
                    ) : (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4 }}>
                            <Typography sx={{ color: '#94a3b8' }}>Wishlist is empty.</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ flex: 1, py: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                    {/* Sidebar Profile Info */}
                    <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, textAlign: 'center', border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                            <Avatar
                                src={avatar}
                                sx={{ width: 120, height: 120, mb: 3, mx: 'auto', border: '4px solid #bef264' }}
                            />
                            <Typography variant="h5" sx={{ fontWeight: 900 }}>{name}</Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>{role} Account</Typography>

                            <Stack spacing={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<LogoutIcon />}
                                    onClick={() => { localStorage.clear(); navigate('/login'); }}
                                    sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: '#e2e8f0', color: 'black' }}
                                >
                                    Log Out
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>

                    {/* Main Content Areas */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ mb: 4, bgcolor: '#f1f5f9', p: 0.5, borderRadius: 4, display: 'inline-flex' }}>
                            {tabs.map(tab => (
                                <Chip
                                    key={tab}
                                    label={tab}
                                    onClick={() => setActiveTab(tab)}
                                    sx={{
                                        bgcolor: activeTab === tab ? 'white' : 'transparent',
                                        color: 'black',
                                        fontWeight: 800,
                                        px: 2,
                                        height: 40,
                                        borderRadius: 3.5,
                                        '&:hover': { bgcolor: activeTab === tab ? 'white' : '#e2e8f0' }
                                    }}
                                />
                            ))}
                        </Box>

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                            {isLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress color="inherit" /></Box>
                            ) : (
                                <>
                                    {activeTab === 'Retail' && (
                                        <Stack spacing={6}>
                                            {renderCartAndWishlist()}
                                            <Divider />
                                            {renderRetailOrders()}
                                        </Stack>
                                    )}
                                    {activeTab === 'Wholesale' && renderWholesaleSection()}
                                    {activeTab === 'Q-Commerce' && renderQCommerceSection()}
                                    {activeTab === 'Resale' && renderResaleSection()}
                                    {activeTab === 'Freelance' && renderFreelanceSection()}
                                </>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Profile;
