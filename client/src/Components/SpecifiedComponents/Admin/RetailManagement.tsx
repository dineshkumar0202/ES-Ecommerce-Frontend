import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Grid, Chip, TextField, Dialog, Drawer, MenuItem, InputAdornment } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    VerifiedUser as VerifiedUserIcon,
    CreditCard as CreditCardIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    AccessTime as AccessTimeIcon,
    LocalShipping as LocalShippingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RetailManagement = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail', active: true },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    const pendingOrders = [
        { id: '#ORD-8829', name: 'Wireless Headphones Max', price: '$299.00', status: 'PENDING' },
        { id: '#ORD-8830', name: 'Ergonomic Office Chair', price: '$145.50', status: 'PENDING' },
    ];

    const completedOrders = [
        { id: '#ORD-8812', name: 'Mechanical Keyboard G-Pro', price: '$129.00', status: 'COMPLETED' },
        { id: '#ORD-8805', name: 'USB-C Fast Charging Hub', price: '$45.00', status: 'COMPLETED' },
        { id: '#ORD-8799', name: 'Curved UltraWide Monitor', price: '$799.99', status: 'COMPLETED' },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <StoreIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>retails</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/retail' && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#bef264' : 'transparent',
                                color: item.active ? 'black' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#bef264' : '#f1f5f9' },
                                py: 1.5
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'black' : '#94a3b8' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 700 : 500, fontSize: '0.95rem' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto' }}>
                    <Stack onClick={() => { localStorage.removeItem('isAdminLoggedIn'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 5, overflow: 'auto', bgcolor: 'white' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Retail Management</Typography>
                        <Typography variant="body1" sx={{ color: '#64748b' }}>Track and manage your retail ecosystem</Typography>
                    </Box>
                    <TextField
                        placeholder="Search orders..."
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>
                        }}
                        sx={{
                            width: 300,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: '#f8fafc',
                                '& fieldset': { borderColor: '#e2e8f0' }
                            }
                        }}
                    />
                </Stack>

                {/* Pending Orders */}
                <Box sx={{ mb: 5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Order List</Typography>
                            <Chip label="3 Pending" size="small" sx={{ bgcolor: '#e2e8f0', color: '#64748b', fontWeight: 600, borderRadius: 1.5 }} />
                        </Stack>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>View all</Typography>
                    </Stack>

                    <Stack spacing={2}>
                        {pendingOrders.map((order) => (
                            <Paper
                                key={order.id}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={3}>
                                    <Box sx={{ width: 48, height: 48, bgcolor: '#f1f5f9', borderRadius: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.name}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Order {order.id}</Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.price}</Typography>
                                    <Chip
                                        label={order.status}
                                        size="small"
                                        sx={{
                                            bgcolor: '#bef264',
                                            color: 'black',
                                            fontWeight: 800,
                                            fontSize: '0.65rem',
                                            height: 24,
                                            borderRadius: 1.5
                                        }}
                                    />
                                    <IconButton size="small"><MoreVertIcon sx={{ color: '#94a3b8' }} /></IconButton>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Box>

                {/* Completed Orders */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Completed Orders</Typography>
                        <Chip label="24 Total" size="small" sx={{ bgcolor: '#e2e8f0', color: '#64748b', fontWeight: 600, borderRadius: 1.5 }} />
                    </Stack>

                    <Stack spacing={2}>
                        {completedOrders.map((order) => (
                            <Paper
                                key={order.id}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={3}>
                                    <Box sx={{ width: 48, height: 48, bgcolor: '#f1f5f9', borderRadius: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.name}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Order {order.id}</Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.price}</Typography>
                                    <Chip
                                        label={order.status}
                                        size="small"
                                        sx={{
                                            bgcolor: 'transparent',
                                            color: '#94a3b8',
                                            fontWeight: 700,
                                            fontSize: '0.65rem',
                                            border: '1px solid #e2e8f0',
                                            height: 24,
                                            borderRadius: 1.5
                                        }}
                                    />
                                    <IconButton size="small"><MoreVertIcon sx={{ color: '#94a3b8' }} /></IconButton>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default RetailManagement;
