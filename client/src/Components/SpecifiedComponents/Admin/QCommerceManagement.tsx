import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    CircularProgress,
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
import { toast } from 'react-toastify';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Refresh as RefreshIcon,
    ElectricBolt as ElectricBoltIcon,
    AccessTime as AccessTimeIcon,
    DeliveryDining as DeliveryDiningIcon,
    Brightness4 as ThemeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { QProductService } from '../../../services/api';

const QCommerceManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
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

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick', active: true },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];

    const stats = [
        { title: 'Total Orders Today', value: '1,284', icon: <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2 }}><ElectricBoltIcon sx={{ color: '#3b82f6' }} /></Box> },
        { title: 'Avg Delivery Time', value: '14.5m', icon: <Box sx={{ p: 1, bgcolor: '#f0fdf4', borderRadius: 2 }}><AccessTimeIcon sx={{ color: '#22c55e' }} /></Box> },
        { title: 'Active Riders', value: '82', icon: <Box sx={{ p: 1, bgcolor: '#fff7ed', borderRadius: 2 }}><DeliveryDiningIcon sx={{ color: '#f97316' }} /></Box> }
    ];

    const inventoryItems = [
        {
            title: 'Energy Spark XL',
            category: 'BEVERAGES • 500ML',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
            tag: 'FAST MOVING',
            tagColor: '#22c55e',
            storeA: 12,
            storeB: 142
        },
        {
            title: 'Kettle Cooked Chili',
            category: 'SNACKS • 150G',
            image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400',
            tag: 'NEW ARRIVAL',
            tagColor: '#3b82f6',
            storeA: 56,
            storeB: 89
        },
        {
            title: 'Single Origin Roast',
            category: 'PANTRY • 250G',
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400',
            tag: 'LOW STOCK',
            tagColor: '#f97316',
            storeA: 8,
            storeB: 3
        },
        {
            title: 'Organic Whole Milk',
            category: 'DAIRY • 1L',
            image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?auto=format&fit=crop&q=80&w=400',
            tag: 'IN STOCK',
            tagColor: '#94a3b8',
            storeA: 214,
            storeB: 198
        }
    ];

    const liveOrders = [
        { id: '#ORD-5521', product: 'Energy Spark XL x2', category: 'Beverages', destination: '42nd St, Suite 4B', eta: '04:12 min', status: 'PICKED UP', statusColor: '#f8fafc', textColor: '#1e293b' },
        { id: '#ORD-5522', product: 'Artisan Sourdough', category: 'Bakery', destination: 'Broadway 1202', eta: '08:45 min', status: 'PREPARING', statusColor: '#f1f5f9', textColor: '#64748b' },
        { id: '#ORD-5523', product: 'Salted Caramel Pint', category: 'Frozen', destination: 'E 14th Ave, 12', eta: '02:30 min', status: 'DELIVERING', statusColor: '#eff6ff', textColor: '#3b82f6' }
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
                    {stats.map((stat, i) => (
                        <Grid key={i} size={{ xs: 12, md: 4 }}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
                                {stat.icon}
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>{stat.title}</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>{stat.value}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Instant Inventory */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Instant Inventory</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Dark Stores: 08</Typography>
                        </Stack>
                        <Button startIcon={<RefreshIcon />} sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 700 }}>Refresh Feed</Button>
                    </Stack>

                    <Grid container spacing={3}>
                        {inventoryItems.map((item, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Paper elevation={0} sx={{ borderRadius: 5, overflow: 'hidden', bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                    <Box sx={{ position: 'relative', height: 180 }}>
                                        <Box component="img" src={item.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: item.tagColor, px: 1, py: 0.5, borderRadius: 1.5 }}>
                                            <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 900 }}>{item.tag}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ p: 2.5 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>{item.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 2 }}>{item.category}</Typography>

                                        <Stack spacing={2} sx={{ mb: 3 }}>
                                            <Box>
                                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Dark Store A</Typography>
                                                    <Typography variant="caption" sx={{ color: item.storeA < 10 ? '#ef4444' : '#1e293b', fontWeight: 800 }}>{item.storeA} left</Typography>
                                                </Stack>
                                                <LinearProgress variant="determinate" value={item.storeA} sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: item.storeA < 10 ? '#ef4444' : '#22c55e', borderRadius: 3 } }} />
                                            </Box>
                                            <Box>
                                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Dark Store B</Typography>
                                                    <Typography variant="caption" sx={{ color: '#1e293b', fontWeight: 800 }}>{item.storeB} left</Typography>
                                                </Stack>
                                                <LinearProgress variant="determinate" value={Math.min(100, item.storeB / 2)} sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#CFE8EC', borderRadius: 3 } }} />
                                            </Box>
                                        </Stack>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<RefreshIcon sx={{ fontSize: 16 }} />}
                                            sx={{
                                                bgcolor: '#CFE8EC',
                                                color: '#1e293b',
                                                boxShadow: 'none',
                                                borderRadius: 2.5,
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' }
                                            }}
                                        >
                                            Restock
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Live Order Feed */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Live Order Feed</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#22c55e', borderRadius: '50%' }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Tracking 42 active orders</Typography>
                        </Stack>
                    </Stack>

                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 5, border: '1px solid #f1f5f9' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#fcfdfe' }}>
                                <TableRow>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', py: 2.5 }}>Order ID</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Product</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Destination</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>ETA</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {liveOrders.map((order, i) => (
                                    <TableRow key={i} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.85rem' }}>{order.id}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Box sx={{ width: 32, height: 32, bgcolor: '#f1f5f9', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <StoreIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{order.product}</Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>{order.destination}</TableCell>
                                        <TableCell sx={{ color: '#1e293b', fontWeight: 800, fontSize: '0.85rem' }}>{order.eta}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            <Box sx={{ display: 'inline-block', bgcolor: order.statusColor, px: 1.5, py: 0.5, borderRadius: 2 }}>
                                                <Typography sx={{ color: order.textColor, fontWeight: 900, fontSize: '0.65rem' }}>{order.status}</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default QCommerceManagement;
