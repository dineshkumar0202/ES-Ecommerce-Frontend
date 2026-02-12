import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    TextField,
    InputAdornment,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ThemeIcon from '@mui/icons-material/Brightness4';
import { useNavigate } from 'react-router-dom';
import { QProductService, OrderService } from '../../../services/api';

const QCommerceManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await QProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch Q-commerce products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const { data } = await OrderService.getAll();
            // Filter or just use all orders for now
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick', active: true },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];



    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #f1f5f9', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 1 }}>
                    <Box sx={{ bgcolor: 'black', p: 0.8, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box component="span" sx={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', lineHeight: 1 }}>R</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e293b' }}>retails</Typography>
                </Stack>

                <List disablePadding sx={{ flexGrow: 1 }}>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => !item.active && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#CFE8EC' : 'transparent',
                                color: item.active ? '#1e293b' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#CFE8EC' : '#f8fafc' },
                                py: 1.2,
                                px: 2
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 35, color: item.active ? '#1e293b' : '#64748b' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 700 : 500, fontSize: '0.95rem' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2, mb: 3, cursor: 'pointer', color: '#64748b' }}>
                        <ThemeIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Theme</Typography>
                    </Stack>
                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f8fafc', overflow: 'auto' }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>Q-Commerce Inventory</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Real-time rapid delivery management</Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            size="small"
                            placeholder="Search dark store..."
                            sx={{
                                width: 280,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    borderRadius: 3,
                                    '& fieldset': { border: 'none' },
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                bgcolor: '#CFE8EC',
                                color: '#1e293b',
                                borderRadius: 3,
                                px: 3,
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' }
                            }}
                        >
                            Create Entry
                        </Button>
                    </Stack>
                </Stack>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2 }}><StoreIcon sx={{ color: '#3b82f6' }} /></Box>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>Total Products</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>{products.length}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ p: 1, bgcolor: '#f0fdf4', borderRadius: 2 }}><ElectricBoltIcon sx={{ color: '#22c55e' }} /></Box>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>Total Orders</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>{orders.length}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Instant Inventory */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Instant Inventory</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{products.length} Items</Typography>
                        </Stack>
                        <Button onClick={fetchProducts} startIcon={<RefreshIcon />} sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 700 }}>Refresh Feed</Button>
                    </Stack>

                    <Grid container spacing={3}>
                        {(products.length > 0 ? products : []).map((item, i) => (
                            <Grid key={item._id || i} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Paper elevation={0} sx={{ borderRadius: 5, overflow: 'hidden', bgcolor: 'white', border: '1px solid #f1f5f9', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ position: 'relative', height: 180 }}>
                                        <Box component="img" src={item.image || 'https://via.placeholder.com/300'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: '#22c55e', px: 1, py: 0.5, borderRadius: 1.5 }}>
                                            <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 900 }}>INSTOCK</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>{item.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 2 }}>{item.category}</Typography>

                                        <Stack spacing={2} sx={{ mb: 3, mt: 'auto' }}>
                                            <Box>
                                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Stock Level</Typography>
                                                    <Typography variant="caption" sx={{ color: '#1e293b', fontWeight: 800 }}>{item.stock || 'N/A'}</Typography>
                                                </Stack>
                                                <LinearProgress variant="determinate" value={item.stock ? Math.min(100, item.stock) : 50} sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#22c55e', borderRadius: 3 } }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Price: ₹{item.price}</Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                        {products.length === 0 && <Typography sx={{ p: 2, color: '#94a3b8' }}>No inventory items found.</Typography>}
                    </Grid>
                </Box>

                {/* Live Order Feed */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Live Order Feed</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#22c55e', borderRadius: '50%' }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Tracking {orders.length} active orders</Typography>
                        </Stack>
                    </Stack>

                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 5, border: '1px solid #f1f5f9' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#fcfdfe' }}>
                                <TableRow>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', py: 2.5 }}>Order ID</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Items</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Total Amount</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, i) => (
                                    <TableRow key={i} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.85rem' }}>{order._id}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                                {order.items?.length || 0} Items
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>₹{order.totalAmount}</TableCell>
                                        <TableCell sx={{ color: '#1e293b', fontWeight: 800, fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            <Box sx={{ display: 'inline-block', bgcolor: '#f8fafc', px: 1.5, py: 0.5, borderRadius: 2 }}>
                                                <Typography sx={{ color: '#1e293b', fontWeight: 900, fontSize: '0.65rem' }}>{order.status}</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {orders.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#94a3b8', py: 3 }}>No recent orders found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default QCommerceManagement;
