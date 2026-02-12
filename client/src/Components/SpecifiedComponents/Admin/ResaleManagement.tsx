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
    CircularProgress,
    InputAdornment,
    Grid,
    Chip,
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
import ThemeIcon from '@mui/icons-material/Brightness4';
import { useNavigate } from 'react-router-dom';
import { ResaleService } from '../../../services/api';

const ResaleManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await ResaleService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch resale products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale', active: true },
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
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>Resale Management</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Track and manage your community resale marketplace.</Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            size="small"
                            placeholder="Search items..."
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
                            Add Listing
                        </Button>
                    </Stack>
                </Stack>

                {/* Recently Listed Items */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Recently Listed Items</Typography>
                            <Chip label={`${products.length} Items`} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 800, color: '#64748b' }} />
                        </Stack>
                        <Button onClick={fetchProducts} variant="text" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer', textTransform: 'none' }}>Refresh</Button>
                    </Stack>

                    <Grid container spacing={3}>
                        {products.map((item, i) => (
                            <Grid key={item._id || i} size={{ xs: 12, md: 4 }}>
                                <Paper elevation={0} sx={{ p: 2, borderRadius: 5, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ width: 100, height: 100, borderRadius: 4, overflow: 'hidden', bgcolor: '#f8fafc' }}>
                                            <Box component="img" src={item.images?.[0] || 'https://via.placeholder.com/150'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{item.title}</Typography>
                                                <Chip label={item.condition || 'Used'} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 900, bgcolor: '#f1f5f9' }} />
                                            </Stack>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 1 }}>{item.description ? item.description.substring(0, 30) + '...' : 'No description'}</Typography>
                                            <Stack direction="row" alignItems="baseline" spacing={1}>
                                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>₹{item.price}</Typography>
                                                {item.originalPrice && (
                                                    <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 600, textDecoration: 'line-through' }}>₹{item.originalPrice}</Typography>
                                                )}
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                        {products.length === 0 && !isLoading && <Typography sx={{ p: 2, color: '#94a3b8' }}>No resale items found.</Typography>}
                    </Grid>
                </Box>

                {/* Loading Indicator */}
                {isLoading && products.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#CFE8EC' }} /></Box>
                )}
            </Box>
        </Box>
    );
};

export default ResaleManagement;
