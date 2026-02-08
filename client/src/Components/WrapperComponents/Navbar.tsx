import { useState } from 'react';
import { Box, Container, Stack, Typography, Divider, InputBase, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HubIcon from '@mui/icons-material/Hub';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FactoryIcon from '@mui/icons-material/Factory';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Mapping active path to category label for highlight
    const getActiveCategory = () => {
        if (location.pathname.startsWith('/wholesale')) return 'Wholesale';
        if (location.pathname.startsWith('/quick')) return 'Q-Commerce';
        if (location.pathname.startsWith('/resale')) return 'Resale';
        if (location.pathname.startsWith('/freelance')) return 'Freelance';
        return 'Retail';
    };

    const activeCategory = getActiveCategory();

    return (
        <>
            <Box sx={{ bgcolor: 'white', py: 2, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
                <Container maxWidth="xl">
                    {/* Header Row - Black Pill */}
                    <Box sx={{
                        bgcolor: 'black',
                        borderRadius: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 3,
                        px: 3,
                        py: 1.5,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>

                        {/* Logo */}
                        <Stack direction="row" spacing={2} alignItems="center" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                            <Box sx={{ bgcolor: '#bef264', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <HubIcon sx={{ color: 'black', fontSize: 24 }} />
                            </Box>
                            <Box>
                                <Typography variant="h6" fontWeight={800} sx={{ color: 'white', lineHeight: 1, letterSpacing: -0.5 }}>
                                    AtoZ
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Search Bar - White Background, Black Text, Centered */}
                        <Box sx={{
                            bgcolor: 'white',
                            borderRadius: 50,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            px: 2.5,
                            py: 0.8,
                            width: '450px',
                            mx: 'auto', // Auto margin for centering
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <SearchIcon sx={{ color: '#0a0a0a', mr: 1.5, fontSize: 20 }} />
                            <InputBase
                                placeholder="Search products, services..."
                                sx={{ color: '#0a0a0a', flex: 1, fontSize: '0.9rem', fontWeight: 500 }}
                            />
                            <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1.5, px: 0.8, py: 0.1, color: '#64748b', fontSize: '0.7rem', fontWeight: 600, bgcolor: '#f1f5f9' }}>
                                ⌘K
                            </Box>
                        </Box>

                        {/* Right Actions */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* Notification Icon Removed as per request */}

                            <IconButton sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }} onClick={() => navigate('/products/categories')}>
                                <ShoppingCartOutlinedIcon />
                            </IconButton>

                            <Divider orientation="vertical" flexItem sx={{ bgcolor: '#334155', height: 24, mx: 1, alignSelf: 'center' }} />

                            {localStorage.getItem('userName') ? (
                                <>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={handleMenuOpen}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                                            <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600, lineHeight: 1.2, fontSize: '0.9rem' }}>
                                                {localStorage.getItem('userName')}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>
                                                {localStorage.getItem('userRole')} Account
                                            </Typography>
                                        </Box>
                                        <Avatar
                                            src={localStorage.getItem('userProfileImage') || undefined}
                                            sx={{ border: '2px solid white', width: 40, height: 40 }}
                                        />
                                    </Stack>
                                    <Menu
                                        id="account-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        disableScrollLock={true}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        sx={{ mt: 1 }}
                                    >
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            const role = localStorage.getItem('userRole');
                                            if (role === 'Admin') navigate('/admin');
                                            else navigate('/profile');
                                        }}>
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            localStorage.clear();
                                            navigate('/login');
                                        }}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Box
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'white',
                                        fontWeight: 600,
                                        '&:hover': { color: '#bef264' }
                                    }}
                                >
                                    Login
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    {/* Categories Row (Modules) - Light Background, Active Black */}
                    <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ overflowX: 'auto', pb: 0, position: 'relative', zIndex: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                        <CategoryChip
                            icon={<StorefrontIcon />}
                            label="Retail"
                            isActive={activeCategory === 'Retail'}
                            onClick={() => navigate('/')}
                        />
                        <CategoryChip
                            icon={<FactoryIcon />}
                            label="Wholesale"
                            isActive={activeCategory === 'Wholesale'}
                            onClick={() => navigate('/wholesale')}
                        />
                        <CategoryChip
                            icon={<RocketLaunchIcon />}
                            label="Q-Commerce"
                            isActive={activeCategory === 'Q-Commerce'}
                            onClick={() => navigate('/quick')}
                        />
                        <CategoryChip
                            icon={<AutorenewIcon />}
                            label="Resale"
                            isActive={activeCategory === 'Resale'}
                            onClick={() => navigate('/resale')}
                        />
                        <CategoryChip
                            icon={<WorkIcon />}
                            label="Freelance"
                            isActive={activeCategory === 'Freelance'}
                            onClick={() => navigate('/freelance')}
                        />
                    </Stack>
                </Container>
            </Box>
            <Box sx={{ height: '180px' }} />
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
            bgcolor: isActive ? '#bef264' : '#f8fafc', // Lime green for active
            color: isActive ? 'black' : '#64748b',
            px: 2.5,
            py: 1.2,
            borderRadius: 50,
            cursor: 'pointer',
            border: isActive ? 'none' : '1px solid transparent', // Optional border
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            boxShadow: isActive ? '0 4px 12px rgba(190, 242, 100, 0.4)' : 'none',
            '&:hover': {
                bgcolor: isActive ? '#d9f99d' : '#f1f5f9',
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
