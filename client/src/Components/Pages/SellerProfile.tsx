import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Stack, Button, Avatar, Chip, IconButton, Divider, CircularProgress } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancerDashboard from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { WholesaleService, CartService, WishlistService, OrderService } from '../../services/api';

const SellerProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Retail');
    const [loading, setLoading] = useState(false);

    // User info for sidebar
    const name = localStorage.getItem('userName') || 'Seller Name';
    const role = localStorage.getItem('userRole') || 'Seller';
    const avatar = localStorage.getItem('userProfileImage') || '';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

    // Data states
    const [wholesaleProducts, setWholesaleProducts] = useState<any[]>([]);
    const [cart, setCart] = useState<any>(null);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [wsRes, cartRes, wishlistRes, ordersRes] = await Promise.all([
                WholesaleService.getMyProducts().catch(() => ({ data: [] })),
                CartService.getCart().catch(() => ({ data: null })),
                WishlistService.getWishlist().catch(() => ({ data: { products: [] } })),
                OrderService.getMyOrders().catch(() => ({ data: [] }))
            ]);
            setWholesaleProducts(wsRes.data);
            setCart(cartRes.data);
            setWishlist(wishlistRes.data?.products || []);
            setOrders(ordersRes.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRemoveFromCart = async (id: string) => {
        try { await CartService.removeFromCart(id); fetchData(); } catch (e) { }
    };

    const handleRemoveFromWishlist = async (id: string) => {
        try { await WishlistService.removeFromWishlist(id); fetchData(); } catch (e) { }
    };

    const handleDeleteWholesale = async (id: string) => {
        if (window.confirm("Delete this product?")) {
            try { await WholesaleService.delete(id); fetchData(); } catch (e) { }
        }
    };

    const tabs = ['Retail', 'Wholesale', 'Q-Commerce', 'Resale', 'Freelance'];

    const renderCartAndWishlist = () => (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
            {/* Cart Column */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Shopping Cart ({cart?.cartItems?.length || 0})</Typography>
                {cart?.cartItems?.length > 0 ? (
                    <Stack spacing={2}>
                        {cart.cartItems.map((item: any) => {
                            if (!item || !item.product) return null;
                            return (
                                <Paper key={item.product._id} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'white' }}>
                                    <Avatar src={item.product?.images?.[0]} variant="rounded" sx={{ width: 60, height: 60 }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.product?.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>Qty: {item.quantity} • ₹{item.price}</Typography>
                                    </Box>
                                    <IconButton color="error" size="small" onClick={() => handleRemoveFromCart(item.product?._id)}>
                                        <DeleteIcon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Paper>
                            );
                        })}
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: '#bef264', color: 'black', borderRadius: 3,
                                py: 1.5, fontWeight: 900, mt: 2,
                                textTransform: 'none', fontSize: '1rem',
                                boxShadow: '0 4px 14px 0 rgba(190, 242, 100, 0.39)',
                                '&:hover': { bgcolor: '#a3d94d' }
                            }}
                        >
                            PROCEED TO CHECKOUT
                        </Button>
                    </Stack>
                ) : (
                    <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #e2e8f0' }}>
                        <Typography sx={{ color: '#94a3b8' }}>Your shopping cart is empty.</Typography>
                    </Paper>
                )}
            </Box>

            {/* Wishlist Column */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Wishlist ({wishlist.length})</Typography>
                {wishlist.length > 0 ? (
                    <Stack spacing={2}>
                        {wishlist.map((item: any) => {
                            if (!item) return null;
                            return (
                                <Paper key={item._id} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'white' }}>
                                    <Avatar src={item.images?.[0]} variant="rounded" sx={{ width: 60, height: 60 }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>₹{item.price}</Typography>
                                    </Box>
                                    <IconButton color="error" size="small" onClick={() => handleRemoveFromWishlist(item._id)}>
                                        <DeleteIcon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Paper>
                            );
                        })}
                    </Stack>
                ) : (
                    <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #e2e8f0' }}>
                        <Typography sx={{ color: '#94a3b8' }}>Your wishlist is empty.</Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );

    const renderRetailOrders = () => (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Retail Order History & Tracking</Typography>
            {orders.length === 0 ? (
                <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #e2e8f0' }}>
                    <Typography sx={{ color: '#94a3b8' }}>No order history found.</Typography>
                </Paper>
            ) : (
                <Stack spacing={3}>
                    {orders.map((order: any) => (
                        <Paper key={order._id} elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>Order ID: {order._id.slice(-8).toUpperCase()}</Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                </Box>
                                <Chip
                                    label={order.status || 'Ordered'}
                                    sx={{ bgcolor: '#fef3c7', color: '#b45309', fontWeight: 800, borderRadius: 2 }}
                                    size="small"
                                />
                            </Box>

                            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 4, mb: 3 }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                    <InfoOutlinedIcon sx={{ fontSize: 18, color: '#64748b' }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>Tracking Status:</Typography>
                                </Stack>
                                <Box sx={{ px: 2, py: 1, position: 'relative' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                                        {['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, i) => {
                                            const isActive = i === 0; // In a real app, compare with order.status
                                            return (
                                                <Box key={step} sx={{ textAlign: 'center', flex: 1 }}>
                                                    <Box sx={{
                                                        width: 12, height: 12, borderRadius: '50%',
                                                        bgcolor: isActive ? '#000' : '#cbd5e1',
                                                        mx: 'auto', mb: 1.5,
                                                        border: isActive ? '3px solid #bef264' : 'none',
                                                        boxSizing: 'content-box'
                                                    }} />
                                                    <Typography sx={{
                                                        fontSize: '0.7rem',
                                                        color: isActive ? '#0f172a' : '#94a3b8',
                                                        fontWeight: isActive ? 900 : 500
                                                    }}>{step}</Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                    {/* Progress Line */}
                                    <Box sx={{
                                        position: 'absolute', top: 12, left: '12.5%',
                                        right: '12.5%', height: 2, bgcolor: '#e2e8f0',
                                        zIndex: 0
                                    }} />
                                </Box>
                            </Box>

                            <Stack spacing={1.5} sx={{ mb: 3 }}>
                                {order.orderItems?.map((item: any, i: number) => {
                                    if (!item) return null;
                                    return (
                                        <Typography key={i} variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
                                            {item.title || item.name} <strong>x {item.quantity}</strong>
                                        </Typography>
                                    );
                                })}
                            </Stack>
                            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>Total: ₹{order.totalPrice.toLocaleString()}</Typography>
                                <Typography sx={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                    NEED HELP?
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );

    const renderWholesaleContent = () => (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>My Wholesale Storefront</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/wholesale')} sx={{ bgcolor: '#bef264', color: 'black', textTransform: 'none', fontWeight: 900, borderRadius: 2.5, px: 3 }}>
                    Add Wholesale Listing
                </Button>
            </Stack>
            {wholesaleProducts.length === 0 ? (
                <Paper elevation={0} sx={{ p: 8, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #e2e8f0' }}>
                    <InventoryIcon sx={{ fontSize: 64, color: '#cbd5e1', mb: 2 }} />
                    <Typography sx={{ color: '#94a3b8', fontWeight: 600 }}>You don't have any wholesale products listed.</Typography>
                    <Button variant="outlined" sx={{ mt: 3, borderRadius: 2, textTransform: 'none', fontWeight: 800 }} onClick={() => navigate('/wholesale')}>Get Started</Button>
                </Paper>
            ) : (
                <Stack spacing={2.5}>
                    {wholesaleProducts.map((p) => (
                        <Paper key={p._id} elevation={0} sx={{ p: 2.5, borderRadius: 4, border: '1px solid #f1f5f9', display: 'flex', gap: 3, alignItems: 'center', bgcolor: 'white', '&:hover': { border: '1px solid #0f172a' } }}>
                            <Box component="img" src={p.images?.[0] || p.image} sx={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 3 }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>{p.title}</Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>₹{p.pricePerUnit} per unit • Pack of {p.packSize}</Typography>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 800 }} onClick={() => navigate(`/wholesale/product/${p._id}`)}>Edit</Button>
                                <IconButton color="error" onClick={() => handleDeleteWholesale(p._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 4, md: 8 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5 }}>

                    {/* Sidebar Profile Card */}
                    <Box sx={{ width: { xs: '100%', md: 340 }, flexShrink: 0 }}>
                        <Paper elevation={0} sx={{ p: 5, borderRadius: 8, border: '1px solid #e2e8f0', bgcolor: 'white', textAlign: 'center', position: 'sticky', top: 100 }}>
                            <Avatar
                                sx={{
                                    width: 130, height: 130, mb: 3, mx: 'auto',
                                    border: '5px solid #bef264', bgcolor: '#f1f5f9',
                                    color: '#0f172a', fontWeight: 900, fontSize: '3rem',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                                }}
                                src={avatar}
                            >
                                {initials}
                            </Avatar>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#0f172a' }}>{name}</Typography>
                            <Typography variant="subtitle1" sx={{ color: '#64748b', mb: 5, fontWeight: 700 }}>{role} Account</Typography>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                onClick={() => { localStorage.clear(); navigate('/login'); }}
                                sx={{
                                    borderRadius: 4, py: 1.5, textTransform: 'none',
                                    fontWeight: 900, fontSize: '1rem',
                                    borderColor: '#e2e8f0', color: '#0f172a',
                                    '&:hover': { borderColor: '#0f172a', bgcolor: '#0f172a', color: 'white' }
                                }}
                            >
                                Log Out
                            </Button>
                        </Paper>
                    </Box>

                    {/* Main Content Area */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ mb: 6, bgcolor: '#f1f5f9', p: 0.7, borderRadius: 5, display: 'inline-flex', gap: 1 }}>
                            {tabs.map(tab => (
                                <Chip
                                    key={tab}
                                    label={tab}
                                    onClick={() => setActiveTab(tab)}
                                    sx={{
                                        bgcolor: activeTab === tab ? 'white' : 'transparent',
                                        color: '#0f172a', fontWeight: 900, px: 3, height: 48,
                                        borderRadius: 4, border: 'none',
                                        fontSize: '0.95rem',
                                        boxShadow: activeTab === tab ? '0 10px 15px -3px rgba(0,0,0,0.1)' : 'none',
                                        '&:hover': { bgcolor: activeTab === tab ? 'white' : '#e2e8f0' }
                                    }}
                                />
                            ))}
                        </Box>

                        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 8, border: '1px solid #e2e8f0', bgcolor: 'white', minHeight: 700 }}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}><CircularProgress size={60} sx={{ color: '#0f172a' }} /></Box>
                            ) : (
                                <Box>
                                    {activeTab === 'Retail' && (
                                        <Box>
                                            {renderCartAndWishlist()}
                                            <Divider sx={{ my: 8, borderStyle: 'dashed' }} />
                                            {renderRetailOrders()}
                                        </Box>
                                    )}
                                    {activeTab === 'Wholesale' && renderWholesaleContent()}
                                    {activeTab === 'Freelance' && (
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Freelancer Profile & Active Gigs</Typography>
                                            <FreelancerDashboard onPost={() => fetchData()} />
                                        </Box>
                                    )}
                                    {['Q-Commerce', 'Resale'].includes(activeTab) && (
                                        <Box sx={{ py: 15, textAlign: 'center' }}>
                                            <Typography variant="h5" sx={{ color: '#94a3b8', fontWeight: 800 }}>{activeTab} stats coming soon.</Typography>
                                            <Typography sx={{ color: '#cbd5e1', mt: 1 }}>We're working on integrating your {activeTab.toLowerCase()} history.</Typography>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Paper>
                    </Box>

                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default SellerProfile;
