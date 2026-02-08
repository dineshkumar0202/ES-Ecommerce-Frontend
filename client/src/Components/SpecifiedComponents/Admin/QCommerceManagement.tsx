import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Chip } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    MoreVert as MoreVertIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QCommerceManagement = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick', active: true },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    const orderList = [
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
                        <FlashOnIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>q-commerce</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/quick' && navigate(item.path)}
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
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: 'white' }}>

                {/* Order List Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem' }}>Order List</Typography>
                        <Chip label="3 Pending" size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 700, borderRadius: 1.5 }} />
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>View all</Typography>
                </Stack>

                {/* Pending Orders */}
                <Box sx={{ mb: 5 }}>
                    {orderList.map((order) => (
                        <Paper
                            key={order.id}
                            elevation={0}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 3,
                                border: '1px solid #f1f5f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s',
                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderColor: '#e2e8f0' }
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ width: 48, height: 48, bgcolor: '#f1f5f9', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box sx={{ width: 24, height: 24, bgcolor: '#cbd5e1', borderRadius: 0.5 }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{order.name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500 }}>Order {order.id}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{order.price}</Typography>
                                <Chip
                                    label={order.status}
                                    size="small"
                                    sx={{
                                        bgcolor: '#bef264',
                                        color: 'black',
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        height: 24,
                                        borderRadius: 1.5,
                                        minWidth: 70
                                    }}
                                />
                                <IconButton size="small"><MoreVertIcon sx={{ color: '#94a3b8', fontSize: 20 }} /></IconButton>
                            </Stack>
                        </Paper>
                    ))}
                </Box>

                {/* Completed Orders Header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem' }}>Completed Orders</Typography>
                    <Chip label="24 Total" size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 700, borderRadius: 1.5 }} />
                </Stack>

                {/* Completed Orders */}
                <Box>
                    {completedOrders.map((order) => (
                        <Paper
                            key={order.id}
                            elevation={0}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 3,
                                border: '1px solid #f1f5f9', // subtle border
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s',
                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderColor: '#e2e8f0' }
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ width: 48, height: 48, bgcolor: '#f8fafc', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box sx={{ width: 24, height: 24, bgcolor: '#94a3b8', borderRadius: 0.5, opacity: 0.5 }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{order.name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500 }}>Order {order.id}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{order.price}</Typography>
                                <Chip
                                    label={order.status}
                                    size="small"
                                    sx={{
                                        bgcolor: '#f1f5f9',
                                        color: '#64748b',
                                        fontWeight: 700,
                                        fontSize: '0.65rem',
                                        height: 24,
                                        borderRadius: 1.5,
                                        minWidth: 80 // slightly wider for "COMPLETED"
                                    }}
                                />
                                <IconButton size="small"><MoreVertIcon sx={{ color: '#94a3b8', fontSize: 20 }} /></IconButton>
                            </Stack>
                        </Paper>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default QCommerceManagement;
