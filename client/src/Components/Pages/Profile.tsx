import { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Paper, Chip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Navbar from '../WrapperComponents/Navbar';

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Retail');
    const [role, setRole] = useState('Seller');
    const [name, setName] = useState('User');
    const [avatar, setAvatar] = useState('');

    // State for data management
    const [cart, setCart] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [orders, setOrders] = useState<{ [key: string]: any[] }>({
        Retail: [],
        Wholesale: [],
        'Q-Commerce': [],
        Resale: [],
        Freelance: []
    });

    useEffect(() => {
        const savedRole = localStorage.getItem('userRole');
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');

        if (savedRole) setRole(savedRole);
        if (savedName) setName(savedName);
        if (savedAvatar) setAvatar(savedAvatar);

        // Load Data
        setCart(JSON.parse(localStorage.getItem('userCart') || '[]'));
        setWishlist(JSON.parse(localStorage.getItem('userWishlist') || '[]'));
        setOrders({
            Retail: JSON.parse(localStorage.getItem('userOrders_Retail') || '[]'),
            Wholesale: JSON.parse(localStorage.getItem('userOrders_Wholesale') || '[]'),
            'Q-Commerce': JSON.parse(localStorage.getItem('userOrders_QCommerce') || '[]'),
            Resale: JSON.parse(localStorage.getItem('userOrders_Resale') || '[]'),
            Freelance: JSON.parse(localStorage.getItem('userOrders_Freelance') || '[]'),
        });
    }, []);

    // CRUD Helper Functions
    const handleCreateOrder = (type: string) => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            status: 'Processing',
            total: Math.floor(Math.random() * 5000) + 500,
            items: [`Item ${Math.floor(Math.random() * 100)}`]
        };
        const updatedOrders = { ...orders, [type]: [...orders[type], newOrder] };
        setOrders(updatedOrders);
        localStorage.setItem(`userOrders_${type.replace('-', '')}`, JSON.stringify(updatedOrders[type]));
    };

    const handleDeleteOrder = (type: string, id: number) => {
        const updatedOrders = { ...orders, [type]: orders[type].filter(o => o.id !== id) };
        setOrders(updatedOrders);
        localStorage.setItem(`userOrders_${type.replace('-', '')}`, JSON.stringify(updatedOrders[type]));
    };

    const handleUpdateOrderStatus = (type: string, id: number) => {
        const updatedOrders = {
            ...orders,
            [type]: orders[type].map(o => o.id === id ? { ...o, status: o.status === 'Processing' ? 'Shipped' : 'Delivered' } : o)
        };
        setOrders(updatedOrders);
        localStorage.setItem(`userOrders_${type.replace('-', '')}`, JSON.stringify(updatedOrders[type]));
    };

    const handleAddToCart = () => {
        // Simulating adding to cart for demo
        const newItem = { id: Date.now(), name: `Product ${Math.floor(Math.random() * 100)}`, price: 999 };
        const updatedCart = [...cart, newItem];
        setCart(updatedCart);
        localStorage.setItem('userCart', JSON.stringify(updatedCart));
    };

    const handleDeleteFromCart = (id: number) => {
        const updatedCart = cart.filter(i => i.id !== id);
        setCart(updatedCart);
        localStorage.setItem('userCart', JSON.stringify(updatedCart));
    };

    const tabs = ['Retail', 'Wholesale', 'Q-Commerce', 'Resale', 'Freelance'];

    const quickActions = [
        { label: 'Add To Cart', icon: <ShoppingCartOutlinedIcon fontSize="large" />, color: '#dcfce7', action: handleAddToCart },
        { label: 'Wishlist', icon: <FavoriteBorderOutlinedIcon fontSize="large" />, color: '#fce7f3', action: () => { } }, // Placeholder
        { label: 'Buy Order', icon: <ReceiptLongOutlinedIcon fontSize="large" />, color: '#e0f2fe', action: () => { } }, // Placeholder
        { label: 'Create Order', icon: <AddCircleOutlineOutlinedIcon fontSize="large" />, color: '#fef3c7', action: () => handleCreateOrder(activeTab) },
    ];

    const renderContent = () => {
        const currentOrders = orders[activeTab] || [];

        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {activeTab} Management
                    </Typography>
                    {activeTab !== 'Retail' && (
                        <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => handleCreateOrder(activeTab)} sx={{ bgcolor: '#0a0a0a' }}>
                            Create {activeTab} Order
                        </Button>
                    )}
                </Box>

                {activeTab === 'Retail' && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>My Cart ({cart.length})</Typography>
                        {cart.length === 0 ? (
                            <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>Your cart is empty.</Typography>
                        ) : (
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                {cart.map((item) => (
                                    <Paper key={item.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc' }} elevation={0}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#059669' }}>₹{item.price}</Typography>
                                            <IconButton size="small" onClick={() => handleDeleteFromCart(item.id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        )}
                        <Button onClick={handleAddToCart} sx={{ mt: 2, textTransform: 'none' }} startIcon={<AddCircleOutlineOutlinedIcon />}>Simulate Add Item</Button>
                    </Box>
                )}

                {activeTab === 'Retail' && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>My Wishlist ({wishlist.length})</Typography>
                        {wishlist.length === 0 ? (
                            <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>Your wishlist is empty.</Typography>
                        ) : (
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                {wishlist.map((item) => (
                                    <Paper key={item.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fff1f2' }} elevation={0}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                        <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                                    </Paper>
                                ))}
                            </Box>
                        )}
                    </Box>
                )}

                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#64748b' }}>
                    {activeTab} Orders ({currentOrders.length})
                </Typography>

                {currentOrders.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic', py: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: 2 }}>
                        No orders found for {activeTab}. Create one to get started!
                    </Typography>
                ) : (
                    <Box sx={{ display: 'grid', gap: 2 }}>
                        {currentOrders.map((order: any) => (
                            <Paper key={order.id} sx={{ p: 2, borderRadius: 2, border: '1px solid #e2e8f0' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Order #{order.id}</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>{order.date}</Typography>
                                    </Box>
                                    <Chip
                                        label={order.status}
                                        size="small"
                                        onClick={() => handleUpdateOrderStatus(activeTab, order.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            bgcolor: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Shipped' ? '#e0f2fe' : '#fef3c7',
                                            color: order.status === 'Delivered' ? '#166534' : order.status === 'Shipped' ? '#075985' : '#b45309',
                                            fontWeight: 700
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Total: ₹{order.total}</Typography>
                                    <Box>
                                        <IconButton size="small" sx={{ mr: 1 }}><ReceiptLongOutlinedIcon fontSize="small" /></IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteOrder(activeTab, order.id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        maxWidth: 1200,
                        borderRadius: 4,
                        bgcolor: 'white',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    {/* Left Sidebar */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 320 },
                            p: 4,
                            borderRight: { xs: 'none', md: '1px solid #f1f5f9' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <Box sx={{ position: 'relative', mb: 2 }}>
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    border: '4px solid #bef264',
                                    p: 0.5,
                                    mb: 2
                                }}
                            >
                                <Avatar
                                    src={avatar || "https://placehold.co/200x200/ffedd5/333?text=AT"}
                                    sx={{ width: '100%', height: '100%', bgcolor: '#ffedd5', color: '#fb923c' }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0a0a0a' }}>
                            {name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            {role} Account
                        </Typography>

                        <Box sx={{ width: '100%', textAlign: 'left', mb: 'auto' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', display: 'block', mb: 1.5, letterSpacing: 0.5 }}>
                                ABOUT
                            </Typography>
                            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                                    Passionate about suatainable retail and innovative e-commerce solutions. Active contributor since 2022. Focused on high-quality freelance partnerships and wholesale distribution.
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LogoutIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                                mt: 4,
                                mb: 2,
                                color: '#0a0a0a',
                                borderColor: '#e2e8f0',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: '#cbd5e1',
                                    bgcolor: '#f8fafc'
                                }
                            }}
                        >
                            Logout
                        </Button>

                        <Button
                            fullWidth
                            startIcon={<DeleteIcon sx={{ fontSize: '1.1rem' }} />}
                            sx={{
                                color: '#ef4444',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: '#fef2f2'
                                }
                            }}
                        >
                            Delete Account
                        </Button>
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ flex: 1, p: 4, bgcolor: 'white' }}>
                        {/* Header Nav */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1, bgcolor: '#f8fafc', p: 0.5, borderRadius: 3 }}>
                                {tabs.map((tab) => (
                                    <Chip
                                        key={tab}
                                        label={tab}
                                        onClick={() => setActiveTab(tab)}
                                        sx={{
                                            bgcolor: activeTab === tab ? '#bef264' : 'transparent',
                                            color: '#0a0a0a',
                                            fontWeight: activeTab === tab ? 700 : 500,
                                            borderRadius: 2.5,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: activeTab === tab ? '#bef264' : '#f1f5f9'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton sx={{ border: '1px solid #f1f5f9', borderRadius: '50%' }}>
                                    <NotificationsNoneIcon sx={{ color: '#64748b' }} />
                                </IconButton>
                                <IconButton sx={{ border: '1px solid #f1f5f9', borderRadius: '50%' }}>
                                    <DarkModeOutlinedIcon sx={{ color: '#64748b' }} />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Quick Actions */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 6 }}>
                            {quickActions.map((action, index) => (
                                <Paper
                                    key={index}
                                    elevation={0}
                                    onClick={action.action}
                                    sx={{
                                        bgcolor: action.color,
                                        borderRadius: 3,
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 140,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)'
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 1.5, color: '#0a0a0a' }}>
                                        {action.icon}
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0a0a0a' }}>
                                        {action.label}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>

                        {/* Render Active Content */}
                        {renderContent()}

                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Profile;
