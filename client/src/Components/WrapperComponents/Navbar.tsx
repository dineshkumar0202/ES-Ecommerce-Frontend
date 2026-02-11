import { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography, Divider, InputBase, IconButton, Avatar, Menu, MenuItem, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import HubIcon from '@mui/icons-material/Hub';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FactoryIcon from '@mui/icons-material/Factory';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkIcon from '@mui/icons-material/Work';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartService } from '../../services/api';
import { useSocket } from '../../hooks/useSocket';
import { Snackbar, Alert } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

    const open = Boolean(anchorEl);

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    // Socket initialized for real-time features (e.g., notifications)
    useSocket(user?._id || null);

    useEffect(() => {
        // Only set up fetching if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            setCartCount(0);
            return; // Exit early - don't set up any API calls or intervals
        }

        const fetchCartCount = async () => {
            try {
                const { data } = await CartService.getCart();
                const count = data?.cartItems?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
                setCartCount(count);
            } catch (error: any) {
                // Silently handle 401 errors (user not authenticated)
                if (error.response?.status !== 401) {
                    console.error("Error fetching cart count:", error);
                }
                setCartCount(0);
            }
        };



        // Initial fetch
        fetchCartCount();

        // Set up interval - only runs if we have a token
        const interval = setInterval(() => {
            fetchCartCount();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/retail?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    // Mapping active path to category label for highlight
    const getActiveCategory = () => {
        if (location.pathname.startsWith('/wholesale')) return 'Wholesale';
        if (location.pathname.startsWith('/quick')) return 'Q-Commerce';
        if (location.pathname.startsWith('/resale')) return 'Resale';
        if (location.pathname.startsWith('/freelance')) return 'Freelance';
        return 'Retail';
    };

    // Active category determined by path (used for future styling/features)
    getActiveCategory();

    return (
        <>
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
                {/* Top Header Section */}
                <Box sx={{ bgcolor: '#B4D5DC', py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <Container maxWidth="xl">
                        <Stack direction="row" alignItems="center" spacing={4}>
                            <Stack direction="row" alignItems="center" spacing={1} onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                                <Box sx={{
                                    bgcolor: 'black',
                                    width: 32,
                                    height: 32,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <RocketLaunchIcon sx={{ color: '#B4D5DC', fontSize: 18 }} />
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 900,
                                        color: 'black',
                                        letterSpacing: 1,
                                        display: 'flex',
                                        alignItems: 'baseline'
                                    }}
                                >
                                    ATOZ<Box component="span" sx={{ color: '#64748b', fontWeight: 500, fontSize: '1rem' }}>.IN</Box>
                                </Typography>
                            </Stack>

                            {/* Search Area */}
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{
                                    display: 'flex',
                                    bgcolor: 'white',
                                    borderRadius: '4px',
                                    width: '100%',
                                    maxWidth: '700px',
                                    height: '45px',
                                    overflow: 'hidden',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <InputBase
                                        placeholder="Search for products, brands and more..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={handleSearch}
                                        sx={{ ml: 2, flex: 1, fontSize: '0.9rem', color: '#6b7280' }}
                                    />
                                    <Box
                                        onClick={() => searchTerm.trim() && navigate(`/retail?search=${encodeURIComponent(searchTerm)}`)}
                                        sx={{
                                            bgcolor: 'black',
                                            color: 'white',
                                            px: 4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            '&:hover': { bgcolor: '#1f2937' }
                                        }}
                                    >
                                        Search
                                    </Box>
                                </Box>
                            </Box>

                            {/* Actions Area */}
                            <Stack direction="row" spacing={3} alignItems="center">
                                {localStorage.getItem('userName') ? (
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer', color: 'black' }} onClick={handleMenuOpen}>
                                        <PersonOutlineIcon sx={{ fontSize: 24 }} />
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{localStorage.getItem('userName')}</Typography>
                                    </Stack>
                                ) : (
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{ cursor: 'pointer', color: 'black' }}
                                        onClick={() => navigate('/login')}
                                    >
                                        <PersonOutlineIcon sx={{ fontSize: 24 }} />
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Login</Typography>
                                    </Stack>
                                )}

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ cursor: 'pointer', color: 'black' }}
                                    onClick={() => navigate('/profile?view=wishlist')}
                                >
                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 24 }} />
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', ml: 1, display: { xs: 'none', lg: 'block' } }}>Wishlist</Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ cursor: 'pointer', color: 'black', position: 'relative' }}
                                    onClick={() => navigate('/profile?view=cart')}
                                >
                                    <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { bgcolor: 'black', color: 'white', fontWeight: 800 } }}>
                                        <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
                                    </Badge>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', ml: 1, display: { xs: 'none', lg: 'block' } }}>Cart</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>

                {/* Bottom Navigation Section */}
                <Box sx={{ bgcolor: 'white', py: 1.5, borderBottom: '1px solid #f3f4f6' }}>
                    <Container maxWidth="xl">
                        <Stack direction="row" spacing={4} justifyContent="flex-start">
                            {(() => {
                                const role = localStorage.getItem('userRole');
                                let navItems = ['RETAIL', 'WHOLESALE', 'Q-COMMERCE', 'RESALE', 'FREELANCE'];

                                if (role === 'Seller') {
                                    navItems = ['RETAIL', 'WHOLESALE', 'FREELANCE'];
                                }

                                return navItems.map((item) => {
                                    const path = item === 'FREELANCE' ? '/freelance' :
                                        item === 'Q-COMMERCE' ? '/quick' :
                                            `/${item.toLowerCase()}`;
                                    const isActive = location.pathname.startsWith(path);

                                    return (
                                        <Typography
                                            key={item}
                                            onClick={() => navigate(path)}
                                            sx={{
                                                fontSize: '0.85rem',
                                                fontWeight: isActive ? 800 : 700,
                                                color: isActive ? 'black' : '#111827',
                                                cursor: 'pointer',
                                                letterSpacing: 0.5,
                                                '&:hover': { opacity: 0.7 }
                                            }}
                                        >
                                            {item}
                                        </Typography>
                                    );
                                });
                            })()}
                        </Stack>
                    </Container>
                </Box>

                {/* Account Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    sx={{ mt: 1 }}
                >
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        const role = localStorage.getItem('userRole');
                        if (role === 'Admin') navigate('/admin');
                        else if (role === 'Seller') navigate('/seller/profile');
                        else navigate('/profile');
                    }}>
                        Profile / Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        localStorage.clear();
                        navigate('/login');
                    }}>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>

            <Box sx={{ height: '115px' }} />

            {/* Notification Snackbar */}
            <Snackbar
                open={Boolean(notification)}
                autoHideDuration={6000}
                onClose={() => setNotification(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {notification ? (
                    <Alert onClose={() => setNotification(null)} severity={notification.type} variant="filled" sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                ) : undefined}
            </Snackbar>
        </>
    );
};

const CategoryChip = ({
    icon,
    label,
    isActive = false,
    onClick
}: {
    icon: React.ReactNode,
    label: string,
    isActive?: boolean,
    onClick?: () => void
}) => (
    <Box
        onClick={onClick}
        sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: isActive ? '#B4D5DC' : '#f8fafc', // Blue for active
            color: isActive ? 'black' : '#64748b',
            px: 2.5,
            py: 1.2,
            borderRadius: 50,
            cursor: 'pointer',
            border: isActive ? 'none' : '1px solid transparent', // Optional border
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            boxShadow: isActive ? '0 4px 12px rgba(180, 213, 220, 0.4)' : 'none',
            '&:hover': {
                bgcolor: isActive ? '#9cc3cd' : '#f1f5f9',
                transform: 'translateY(-1px)'
            }
        }}
    >
        <Box sx={{
            display: 'flex',
            mr: 1.5,
            color: isActive ? 'black' : '#64748b',
            '& svg': { fontSize: 20 }
        }}>
            {icon}
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
            {label}
        </Typography>
    </Box>
);

export default Navbar;
